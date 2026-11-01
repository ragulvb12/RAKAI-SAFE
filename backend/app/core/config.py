import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "RAKAI SAFE Backend API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "rakai-super-secret-jwt-key-2026-production-ready")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database (Defaults to SQLite for local development, switches to PostgreSQL when configured)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./rakai_safe.db"
    )
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # Supported Authority Jurisdictions
    JURISDICTIONS: List[str] = [
        "Central Zone",
        "North Zone",
        "South Zone",
        "East Zone",
        "West Zone",
        "Transit Division",
        "Cyber & Helpline Division"
    ]
    
    # SMS / Emergency Dispatcher Service
    SMS_PROVIDER: str = os.getenv("SMS_PROVIDER", "TWILIO")  # MOCK_GATEWAY / TWILIO / FAST2SMS
    SMS_API_KEY: str = os.getenv("SMS_API_KEY", "")
    
    # Twilio API Configuration
    TWILIO_ACCOUNT_SID: str = os.getenv("TWILIO_ACCOUNT_SID", "")
    TWILIO_AUTH_TOKEN: str = os.getenv("TWILIO_AUTH_TOKEN", "")
    TWILIO_MESSAGING_SERVICE_SID: str = os.getenv("TWILIO_MESSAGING_SERVICE_SID", "")
    TWILIO_PHONE_NUMBER: str = os.getenv("TWILIO_PHONE_NUMBER", "")

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="ignore")

settings = Settings()
