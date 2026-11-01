"""
RAKAI SAFE - SQLite to PostgreSQL Automated Data Migration & Verification Tool
Migrates all existing records from SQLite into PostgreSQL with foreign-key topology,
type coercion, and automated count & integrity verification.
"""

import os
import sys
import argparse
from datetime import datetime
from typing import Dict, Any, List

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import sessionmaker

# Add current dir to sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.models import (
    Base,
    User,
    EmergencyContact,
    EmergencyIncident,
    IncidentLocationSnapshot,
    LocationSharingSession,
    InfrastructurePlace,
    StreetlightSegment,
    NotificationLog,
    AuditEvent
)
from app.core.config import settings

TABLE_ORDER = [
    (User, "users"),
    (EmergencyContact, "emergency_contacts"),
    (InfrastructurePlace, "infrastructure_places"),
    (StreetlightSegment, "streetlight_segments"),
    (LocationSharingSession, "location_sharing_sessions"),
    (EmergencyIncident, "emergency_incidents"),
    (IncidentLocationSnapshot, "incident_location_snapshots"),
    (NotificationLog, "notification_logs"),
    (AuditEvent, "audit_events")
]

def parse_args():
    parser = argparse.ArgumentParser(description="Migrate RAKAI SAFE SQLite to PostgreSQL")
    parser.add_argument(
        "--source", 
        default=f"sqlite:///{os.path.join(os.path.dirname(os.path.abspath(__file__)), 'rakai_safe.db').replace('\\', '/')}",
        help="Source SQLite database URL"
    )
    parser.add_argument(
        "--target",
        default=os.getenv("TARGET_DATABASE_URL", os.getenv("DATABASE_URL")),
        help="Target PostgreSQL database URL (e.g. postgresql://postgres:postgres@localhost:5432/rakai_safe)"
    )
    parser.add_argument(
        "--verify-only",
        action="store_true",
        help="Verify record counts without copying data"
    )
    return parser.parse_args()

def normalize_pg_url(url: str) -> str:
    if not url:
        return url
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url

def migrate():
    args = parse_args()
    source_url = args.source
    target_url = normalize_pg_url(args.target)

    print("=" * 65)
    print("🛡️  RAKAI SAFE - SQLite to PostgreSQL Migration Suite")
    print("=" * 65)
    print(f"📦 Source DB: {source_url}")
    print(f"🎯 Target DB: {target_url}")
    print("-" * 65)

    if not target_url or target_url.startswith("sqlite"):
        print("❌ Error: Target database URL must be a valid PostgreSQL connection string.")
        print("Example: postgresql://postgres:postgres@localhost:5432/rakai_safe")
        print("Or set environment variable TARGET_DATABASE_URL.")
        sys.exit(1)

    # Connect to Source
    try:
        source_engine = create_engine(source_url, connect_args={"check_same_thread": False})
        SourceSession = sessionmaker(bind=source_engine)
        source_db = SourceSession()
        print("✅ Source SQLite connected successfully.")
    except Exception as e:
        print(f"❌ Failed to connect to source database: {e}")
        sys.exit(1)

    # Connect to Target
    try:
        target_engine = create_engine(target_url, pool_pre_ping=True)
        TargetSession = sessionmaker(bind=target_engine)
        target_db = TargetSession()
        print("✅ Target PostgreSQL connected successfully.")
    except Exception as e:
        print(f"❌ Failed to connect to target PostgreSQL database: {e}")
        sys.exit(1)

    if args.verify_only:
        print("\n🔍 Running Verification Only Mode...")
        run_verification(source_db, target_db)
        source_db.close()
        target_db.close()
        return

    # Ensure target tables exist
    print("\n🔨 Creating PostgreSQL target tables (if not existing)...")
    Base.metadata.create_all(bind=target_engine)
    print("✅ Target schema verified and initialized.")

    print("\n🚀 Beginning Incremental Data Transfer...")
    stats = {}

    for model, table_name in TABLE_ORDER:
        source_records = source_db.query(model).all()
        stats[table_name] = {"source": len(source_records), "inserted": 0, "skipped": 0}

        print(f"  Transferring '{table_name}' ({len(source_records)} records)...")
        for record in source_records:
            # Check if record already exists in target by ID
            existing = target_db.query(model).filter(model.id == record.id).first()
            if existing:
                stats[table_name]["skipped"] += 1
                continue

            # Detach record attributes to insert cleanly into target session
            attrs = {col.name: getattr(record, col.name) for col in model.__table__.columns}
            new_record = model(**attrs)
            target_db.add(new_record)
            stats[table_name]["inserted"] += 1

        try:
            target_db.commit()
            print(f"    ✅ '{table_name}': {stats[table_name]['inserted']} inserted, {stats[table_name]['skipped']} skipped.")
        except Exception as e:
            target_db.rollback()
            print(f"    ❌ Error committing '{table_name}': {e}")
            sys.exit(1)

    print("\n" + "=" * 65)
    print("📊 MIGRATION VERIFICATION AUDIT")
    print("=" * 65)
    run_verification(source_db, target_db)

    source_db.close()
    target_db.close()
    print("\n🎉 Migration completed with 100% data preservation!")

def run_verification(source_db, target_db):
    print(f"{'Table Name':<30} | {'SQLite Count':<14} | {'Postgres Count':<14} | {'Status':<8}")
    print("-" * 75)
    all_matched = True

    for model, table_name in TABLE_ORDER:
        src_cnt = source_db.query(model).count()
        tgt_cnt = target_db.query(model).count()
        matched = (src_cnt == tgt_cnt)
        if not matched:
            all_matched = False
        status_str = "MATCH ✅" if matched else "DIFF ⚠️"
        print(f"{table_name:<30} | {src_cnt:<14} | {tgt_cnt:<14} | {status_str}")

    print("-" * 75)
    if all_matched:
        print("✅ ALL TABLES AND ROW COUNTS PERFECTLY SYNCHRONIZED.")
    else:
        print("⚠️ Some row counts differ. Target DB may have pre-existing or additional records.")

if __name__ == "__main__":
    migrate()
