import os
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.db.session import engine, Base
from app.api.router import api_router
from seed_data import seed_database

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting RAKAI SAFE Backend...")
    try:
        seed_database()
    except Exception as e:
        print(f"Seed note: {e}")
    yield

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="RAKAI SAFE - Enterprise-grade Women Safety, Emergency Dispatch and Infrastructure Management API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

# Static files for audio/images
assets_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets")
if not os.path.exists(assets_path):
    # fallback to parent assets directory
    parent_assets = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "assets")
    if os.path.exists(parent_assets):
        assets_path = parent_assets

if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "mode": "production-ready"
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "app": "RAKAI SAFE API",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/api/health"
    }
