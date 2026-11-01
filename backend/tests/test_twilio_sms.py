import pytest
from datetime import datetime, timezone
from app.services.notification_service import NotificationService
from app.models.audit import NotificationStatus

def test_sms_message_template():
    lat = 13.082712
    lon = 80.270734
    ts = datetime(2026, 10, 20, 12, 0, 0, tzinfo=timezone.utc)
    
    text = NotificationService.generate_sms_text(lat, lon, ts)
    
    assert "🚨 SOS EMERGENCY ALERT!" in text
    assert "I need help immediately. Please contact me and take action." in text
    assert "My current location:" in text
    assert "https://www.google.com/maps?q=13.082712,80.270734" in text
    assert "Please call me immediately." in text
    assert "Time: 2026-10-20 12:00:00 UTC" in text

def test_phone_normalization():
    # 10-digit Indian number without country code
    assert NotificationService.normalize_phone_number("9840123456") == "+919840123456"
    
    # Formatted with spaces and hyphens
    assert NotificationService.normalize_phone_number("+91 98401-23456") == "+919840123456"
    assert NotificationService.normalize_phone_number("09840123456") == "+919840123456"
    
    # International number
    assert NotificationService.normalize_phone_number("+1 (415) 555-2671") == "+14155552671"

def test_twilio_unconfigured_error_handling():
    # Calling Twilio without credentials configured must fail gracefully with explicit diagnostic error
    status, ref, code = NotificationService.send_twilio_sms("+919840123456", "Test SOS")
    assert status == NotificationStatus.FAILED
    assert "TWILIO_CONFIG_ERROR" in ref or "TWILIO_AUTH_ERROR" in code
