from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.deps import get_current_user
from app.models.user import User, EmergencyContact
from app.schemas.user import ContactCreate, ContactUpdate, ContactResponse

import re
from app.services.notification_service import NotificationService

router = APIRouter(prefix="/contacts", tags=["Emergency Contacts"])

@router.get("", response_model=List[ContactResponse])
def get_contacts(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contacts = db.query(EmergencyContact).filter(
        EmergencyContact.user_id == current_user.id
    ).order_by(EmergencyContact.priority.asc()).all()
    return [ContactResponse.model_validate(c) for c in contacts]

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def add_contact(
    contact_in: ContactCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    count = db.query(EmergencyContact).filter(EmergencyContact.user_id == current_user.id).count()
    if count >= 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum limit of 5 personal emergency contacts reached."
        )

    normalized_phone = NotificationService.normalize_phone_number(contact_in.phone)
    if len(re.sub(r'\D', '', normalized_phone)) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid phone number. Please provide a valid 10-digit number or international E.164 format (e.g. +91 98401 23456)."
        )

    contact = EmergencyContact(
        user_id=current_user.id,
        name=contact_in.name.strip(),
        phone=normalized_phone,
        relation_type=contact_in.relation_type,
        priority=contact_in.priority or (count + 1),
        notify_sms=contact_in.notify_sms,
        notify_whatsapp=contact_in.notify_whatsapp
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return ContactResponse.model_validate(contact)

@router.put("/{contact_id}", response_model=ContactResponse)
def update_contact(
    contact_id: str,
    contact_in: ContactUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contact = db.query(EmergencyContact).filter(
        EmergencyContact.id == contact_id,
        EmergencyContact.user_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found")

    update_data = contact_in.dict(exclude_unset=True)
    if "phone" in update_data and update_data["phone"]:
        normalized = NotificationService.normalize_phone_number(update_data["phone"])
        if len(re.sub(r'\D', '', normalized)) < 10:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid phone number. Please provide a valid 10-digit number or international E.164 format (e.g. +91 98401 23456)."
            )
        update_data["phone"] = normalized

    for field, val in update_data.items():
        setattr(contact, field, val)

    db.commit()
    db.refresh(contact)
    return ContactResponse.model_validate(contact)

@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact(
    contact_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contact = db.query(EmergencyContact).filter(
        EmergencyContact.id == contact_id,
        EmergencyContact.user_id == current_user.id
    ).first()
    if not contact:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contact not found")

    db.delete(contact)
    db.commit()
    return None
