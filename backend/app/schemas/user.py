from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    role: Optional[str] = "USER"
    jurisdiction: Optional[str] = None

class UserRegister(UserBase):
    password: str = Field(..., min_length=6)
    badge_number: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    jurisdiction: Optional[str] = None

class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    role: str
    jurisdiction: Optional[str] = None
    badge_number: Optional[str] = None
    is_active: bool
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Emergency Contacts
class ContactBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    name: str
    phone: str
    relation_type: str = Field(default="Family", alias="relationship")
    priority: int = 1
    notify_sms: bool = True
    notify_whatsapp: bool = True

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    name: Optional[str] = None
    phone: Optional[str] = None
    relation_type: Optional[str] = Field(None, alias="relationship")
    priority: Optional[int] = None
    notify_sms: Optional[bool] = None
    notify_whatsapp: Optional[bool] = None

class ContactResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    id: str
    user_id: str
    name: str
    phone: str
    relationship: str = Field(default="Family", alias="relation_type")
    priority: int = 1
    notify_sms: bool = True
    notify_whatsapp: bool = True
    created_at: datetime
