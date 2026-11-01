# RAKAI SAFE — Enterprise Women Safety & Emergency Dispatch System

🏆 **Next-Generation Women Safety, Rapid Emergency Dispatch & Route Lighting Intel**  
Engineered with a **FastAPI + SQLAlchemy** backend supporting both **SQLite and PostgreSQL**, **Alembic database migrations**, and a **React 18 + TypeScript + Vite + Tailwind CSS** frontend with **3 role-restricted operational portals**.

---

## 🌟 Key Architecture & Portals

### 1. 👩 Citizen Safety Portal (`/app`)
- **Prominent SOS with Instant Disable**: Large tactile SOS panic button with a 5-second countdown, loud audio alarm, and a persistent sticky top bar with a `TERMINATE & STOP SOS` button to immediately stop the distress alert anytime.
- **Silent SOS (Stealth Mode)**: Discreetly notifies police dispatch and emergency contacts without sounding the loud siren.
- **Full-Screen Interactive Safety Map**: Built with React Leaflet / Google Maps Platform with high-contrast dark tiles. Displays 24/7 verified police stations, hospitals, safe haven shelters, and streetlight corridor safety ratings.
- **Safe Walk Route Light Analyzer**: Analyzes route segments and calculates a **Lighting Safety Score (0–100%)**, walk time, and nearby safe havens.
- **Emergency Contacts CRUD**: Create, edit, and prioritize contacts with SMS & WhatsApp alert triggers and direct dial actions.
- **Evidence Studio**: High-security in-browser webcam photo snapshot and video recorder embedding GPS coordinates and timestamp watermarks.
- **Fake Call Escort**: Realistic incoming phone call simulation with customizable caller identities (Mom, Dad, Inspector Kumar), ringtone synthesizer, and excuse conversation audio.
- **20 Bilingual Playbooks**: Comprehensive step-by-step guidance for 20 real-world threat scenarios in both **English and தமிழ்**.

---

### 2. 👮 Police Authority Command & Dispatch Console (`/police`)
- **Jurisdiction-Restricted Triage Queue**: Real-time queue filtered by authority zone (e.g., *Central Zone*, *North Zone*).
- **Incident Status Workflow**:
  `ACTIVE` ➔ `ACKNOWLEDGED` ➔ `DISPATCHED` ➔ `ON_SCENE` ➔ `RESOLVED`
- **Patrol Unit Logging**: Police officers record tactical patrol notes and view caller GPS coordinates with one-click navigation links.
- **Badge & Officer Verification**: Displays badge ID and officer credentials with tamper-resistant audit trail.

---

### 3. 🛡️ Admin & Infrastructure Verification Console (`/admin`)
- **Operational Metrics & Recharts Visualizations**: Interactive bar charts for incident triage breakdown and pie charts for streetlight corridor illumination ratios.
- **Authority Provisioning**: Provision police officers with assigned badge numbers and jurisdictions.
- **Infrastructure Verification**: Verify and register police stations, hospitals, safe shelters, and streetlights with coordinates.
- **Multi-Channel Delivery Receipts**: Inspect SMS and WhatsApp delivery status, provider status codes, and timestamps.
- **Security Audit Trail**: Real-time audit logs of all privileged administrative and dispatch operations.

---

## 🔑 Pre-Seeded Test Credentials

For fast, 1-click evaluation, the database is pre-seeded with three accounts:

| Portal | Email | Password | Role / Jurisdiction |
| :--- | :--- | :--- | :--- |
| **👩 Citizen** | `user@rakai.safe` | `Password123!` | Protected Citizen (2 Contacts) |
| **👮 Police** | `police@rakai.safe` | `Police123!` | Central Zone • Badge `TN-POL-7821` |
| **🛡️ Admin** | `admin@rakai.safe` | `Admin123!` | System Root Administrator |

> You can also click the **"⚡ Instant 1-Click Test Accounts"** buttons right on the Login Page!

---

## 🗄️ Database Architecture & PostgreSQL Migration

RAKAI SAFE supports a **dual-engine database architecture**:
1. **SQLite (Default for instant local dev)**: Zero-setup execution via `sqlite:///./rakai_safe.db`.
2. **PostgreSQL (Production & Cloud)**: High-performance connection pooling, transactional reliability, and multi-worker scalability.

### Option A: Local PostgreSQL on Windows (Native PostgreSQL Service or pgAdmin)
Run native PostgreSQL installed on Windows:
```sql
-- In psql or pgAdmin Query Tool:
CREATE DATABASE rakai_safe;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE rakai_safe TO postgres;
```
Configure your connection URL in `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rakai_safe"
```

### Option B: Cloud PostgreSQL Deployment (Neon / Supabase / AWS RDS / Render)
1. Create a free PostgreSQL instance on [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Render](https://render.com).
2. Configure your connection URI with SSL in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://username:password@ep-sample.us-east-1.aws.neon.tech/rakai_safe?sslmode=require"
   ```

---

## 🔄 Running Alembic Migrations & Data Transfer

### 1. Run Alembic Migrations
Apply all schema changes and foreign keys to your active database:
```bash
cd backend
.\venv\Scripts\activate

# Upgrade database schema to latest head
alembic upgrade head
```

To create a new migration after editing SQLAlchemy models:
```bash
alembic revision --autogenerate -m "Add new column or table"
```

### 2. Migrate Data from SQLite to PostgreSQL
RAKAI SAFE includes an automated migration and count verification CLI tool:
```bash
cd backend

# Migrate all records from SQLite to PostgreSQL
python migrate_to_postgres.py --source sqlite:///./rakai_safe.db --target postgresql://postgres:postgres@localhost:5432/rakai_safe

# Verify record count parity between both databases without modifying data
python migrate_to_postgres.py --verify-only --target postgresql://postgres:postgres@localhost:5432/rakai_safe
```

### 3. Database Backups
Automated snapshots are preserved in `backend/backups/`:
- Binary snapshot: `backend/backups/rakai_safe_backup_*.db`
- Structured JSON export: `backend/backups/sqlite_data_export.json`
- Full SQL dump: `backend/backups/sqlite_dump.sql`

---

## 🚀 Running the Application

### 1. Start the Backend API (FastAPI)
```bash
cd backend
# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies (if not already installed)
pip install -r requirements.txt

# Start Uvicorn server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- Interactive Swagger API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- API Health Status: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

### 2. Start the Frontend (React + Vite)
```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite dev server
npm run dev
```
- Frontend Application: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

---

## 🧪 Automated Testing

Run the full pytest suite for the backend:
```bash
cd backend
.\venv\Scripts\pytest
```
*Result: 10/10 automated tests passing covering Health, Authentication, Contacts CRUD, SOS Workflow, Twilio SMS Dispatch, Police Triage, and Safe Route Analysis.*

To test frontend production bundling:
```bash
cd frontend
npm run build
```

---

## 📁 Modular Project Architecture

```
RAGUL WEB/
├── assets/                    # Shared multimedia assets (mounted by FastAPI at /assets)
│   ├── audio/siren.mp3        # Emergency acoustic sirens
│   └── images/aran_logo.png   # Brand identity & emblems
├── backend/                   # FastAPI Enterprise Backend
│   ├── alembic/               # Alembic database migrations
│   │   ├── versions/
│   │   │   └── d4b8a1da7073_initial_schema_migration.py
│   │   └── env.py
│   ├── app/                   # Modular Application Core
│   │   ├── api/               # API Routers & RBAC Dependencies
│   │   │   ├── deps.py        # Token authentication & Role-Based Access Control
│   │   │   ├── router.py      # Aggregated API router
│   │   │   └── v1/            # Endpoints: auth, users, incidents, infrastructure, dispatch, admin
│   │   ├── core/              # Security, settings & environment variables
│   │   ├── db/                # SessionLocal, connection pooling & dual-engine setup
│   │   ├── models/            # SQLAlchemy unified data models (UUID primary keys)
│   │   ├── schemas/           # Pydantic v2 validation schemas
│   │   └── services/          # Business logic: Twilio SMS, Geo-fencing, Dispatch
│   ├── backups/               # Verified database backups (.db, .sql, .json)
│   ├── tests/                 # Automated test suite (test_api.py, test_twilio_sms.py)
│   ├── .env                   # Active backend environment variables
│   ├── .env.example           # Backend environment template
│   ├── alembic.ini            # Alembic configuration
│   ├── migrate_to_postgres.py # SQLite-to-PostgreSQL automated migration CLI
│   ├── pytest.ini             # Pytest configuration
│   ├── rakai_safe.db          # Active SQLite database
│   ├── requirements.txt       # Production dependencies
│   └── seed_data.py           # Pre-seeded users & infrastructure
├── frontend/                  # React 18 + Vite + TypeScript Frontend
│   ├── public/assets/         # Static assets (audio & logos)
│   ├── src/
│   │   ├── components/        # Reusable UI & EmergencyDisableBar
│   │   ├── contexts/          # AuthContext, GeolocationContext
│   │   ├── layouts/           # UserLayout, PoliceLayout, AdminLayout
│   │   ├── pages/             # Citizen (/app), Police (/police), Admin (/admin)
│   │   ├── services/          # Axios API clients & Twilio/Map integrations
│   │   ├── types/             # Domain TypeScript interfaces
│   │   ├── App.tsx            # Main application router with RBAC guards
│   │   ├── index.css          # Tailwind CSS design system
│   │   └── main.tsx           # React DOM root entry
│   ├── .env                   # Active frontend environment variables
│   ├── .env.example           # Frontend environment template
│   ├── index.html             # Vite single-page application entry
│   ├── package.json           # Frontend dependencies & scripts
│   ├── tailwind.config.js     # Tailwind theme design tokens
│   └── vite.config.ts         # Vite bundler & reverse proxy configuration
├── .env.example               # Root comprehensive environment template
└── README.md                  # Comprehensive setup, migration & deployment guide
```

---

## 🔒 Security & Environment Variables

Key security practices implemented:
- **JWT Authentication**: `HS256` signed tokens with configurable expiration.
- **Password Hashing**: `bcrypt` encryption for all stored credentials.
- **CORS Protection**: Explicit origin whitelisting (`http://localhost:5173`, `http://127.0.0.1:5173`).
- **Database Safety**: Pre-ping connection health checks, pool sizing limits (`pool_size=10`, `max_overflow=20`), and SSL support for cloud endpoints.

© 2026 RAKAI SAFE. Enterprise Women Safety, Rapid Dispatch & Infrastructure Protection.
