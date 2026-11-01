import uuid
import re
import httpx
from datetime import datetime, timezone
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.audit import NotificationLog, NotificationChannel, NotificationStatus
from app.models.user import EmergencyContact, User
from app.models.incident import EmergencyIncident

class NotificationService:
    @staticmethod
    def normalize_phone_number(phone: str) -> str:
        """
        Normalizes a phone number to standard E.164 format.
        Handles Indian numbers (+91) and international formats.
        """
        cleaned = re.sub(r'[\s\-\(\)\.]', '', phone.strip())
        if cleaned.startswith('+'):
            return cleaned
        if cleaned.startswith('0'):
            cleaned = cleaned[1:]
        # If 10 digits (standard Indian mobile starting with 6, 7, 8, or 9)
        if len(cleaned) == 10 and cleaned[0] in '6789':
            return f"+91{cleaned}"
        return f"+{cleaned}"

    @staticmethod
    def generate_sms_text(lat: float, lon: float, timestamp: Optional[datetime] = None) -> str:
        """
        Exact SOS message template as requested:
        🚨 SOS EMERGENCY ALERT!

        I need help immediately. Please contact me and take action.

        My current location:
        [Google Maps location link]

        Please call me immediately.
        Time: [Current timestamp]
        """
        maps_link = f"https://www.google.com/maps?q={lat:.6f},{lon:.6f}"
        ts = timestamp or datetime.now(timezone.utc)
        time_str = ts.strftime("%Y-%m-%d %H:%M:%S UTC")

        return (
            f"🚨 SOS EMERGENCY ALERT!\n\n"
            f"I need help immediately. Please contact me and take action.\n\n"
            f"My current location:\n"
            f"{maps_link}\n\n"
            f"Please call me immediately.\n"
            f"Time: {time_str}"
        )

    @classmethod
    def send_twilio_sms(cls, to_phone: str, body: str) -> Tuple[str, str, str]:
        """
        Executes server-side HTTP Basic Auth request to Twilio Messages API:
        https://api.twilio.com/2010-04-01/Accounts/{ACCOUNT_SID}/Messages.json
        Returns (status, provider_reference, provider_status_code)
        """
        account_sid = settings.TWILIO_ACCOUNT_SID.strip()
        auth_token = settings.TWILIO_AUTH_TOKEN.strip()
        messaging_service_sid = settings.TWILIO_MESSAGING_SERVICE_SID.strip()
        from_phone = settings.TWILIO_PHONE_NUMBER.strip()

        if not account_sid or not auth_token:
            return (
                NotificationStatus.FAILED,
                "TWILIO_CONFIG_ERROR",
                "TWILIO_AUTH_ERROR: TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set in backend environment."
            )

        endpoint = f"https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json"
        normalized_to = cls.normalize_phone_number(to_phone)

        data = {
            "To": normalized_to,
            "Body": body
        }

        if messaging_service_sid:
            data["MessagingServiceSid"] = messaging_service_sid
        elif from_phone:
            data["From"] = from_phone
        else:
            return (
                NotificationStatus.FAILED,
                "TWILIO_CONFIG_ERROR",
                "TWILIO_CONFIG_ERROR: Neither TWILIO_MESSAGING_SERVICE_SID nor TWILIO_PHONE_NUMBER is configured."
            )

        try:
            with httpx.Client(timeout=10.0) as client:
                response = client.post(
                    endpoint,
                    data=data,
                    auth=(account_sid, auth_token)
                )

                try:
                    res_json = response.json()
                except Exception:
                    res_json = {}

                sid = res_json.get("sid") or f"TW_{uuid.uuid4().hex[:10].upper()}"

                if response.status_code in (200, 201):
                    twilio_status = res_json.get("status", "sent").lower()
                    if twilio_status in ("sent", "delivered"):
                        status = NotificationStatus.DELIVERED
                    elif twilio_status in ("queued", "sending"):
                        status = NotificationStatus.SENT
                    else:
                        status = NotificationStatus.FAILED

                    status_code = f"TWILIO_{twilio_status.upper()}"
                    return (status, sid, status_code)
                else:
                    err_code = res_json.get("code", response.status_code)
                    err_msg = res_json.get("message", response.text)
                    status_code = f"TWILIO_ERR_{err_code}: {err_msg}"
                    return (NotificationStatus.FAILED, sid, status_code)

        except httpx.RequestError as exc:
            return (
                NotificationStatus.FAILED,
                "NETWORK_ERR",
                f"TWILIO_NETWORK_ERROR: {str(exc)}"
            )
        except Exception as exc:
            return (
                NotificationStatus.FAILED,
                "INTERNAL_ERR",
                f"INTERNAL_DISPATCH_ERROR: {str(exc)}"
            )

    @classmethod
    def dispatch_emergency_notifications(
        cls,
        db: Session,
        incident: EmergencyIncident,
        user: User,
        contacts: List[EmergencyContact]
    ) -> List[NotificationLog]:
        logs = []
        message_body = cls.generate_sms_text(
            lat=incident.current_latitude,
            lon=incident.current_longitude,
            timestamp=incident.created_at
        )

        for contact in contacts:
            if not contact.phone or not contact.notify_sms:
                continue

            # Always perform live Twilio Messages API dispatch - no mock responses
            status, provider_ref, status_code = cls.send_twilio_sms(
                to_phone=contact.phone,
                body=message_body
            )

            log_entry = NotificationLog(
                incident_id=incident.id,
                user_id=user.id,
                recipient_name=contact.name,
                recipient_phone=contact.phone,
                channel=NotificationChannel.SMS,
                status=status,
                message_body=message_body,
                provider_reference=provider_ref,
                provider_status_code=status_code,
                created_at=datetime.now(timezone.utc)
            )
            db.add(log_entry)
            logs.append(log_entry)

        db.commit()
        for log in logs:
            db.refresh(log)

        return logs
