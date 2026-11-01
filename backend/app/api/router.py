from fastapi import APIRouter
from app.api.auth import router as auth_router
from app.api.contacts import router as contacts_router
from app.api.emergency import router as emergency_router
from app.api.incidents import router as incidents_router
from app.api.infrastructure import router as infra_router
from app.api.admin import router as admin_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(contacts_router)
api_router.include_router(emergency_router)
api_router.include_router(incidents_router)
api_router.include_router(infra_router)
api_router.include_router(admin_router)
