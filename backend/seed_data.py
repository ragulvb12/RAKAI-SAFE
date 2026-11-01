import sys
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, Base, engine
from app.core.security import hash_password
from app.models.user import User, UserRole, EmergencyContact
from app.models.infrastructure import InfrastructurePlace, PlaceCategory, StreetlightSegment, LightingStatus
from app.models.incident import EmergencyIncident, IncidentStatus, IncidentMode

def seed_database():
    print("🌱 Initializing and seeding RAKAI SAFE Database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Seed Admin User
        admin = db.query(User).filter(User.email == "admin@rakai.safe").first()
        if not admin:
            admin = User(
                name="Chief Administrator",
                email="admin@rakai.safe",
                hashed_password=hash_password("Admin123!"),
                phone="+91 90000 00001",
                role=UserRole.ADMIN,
                jurisdiction="All Zones",
                is_active=True
            )
            db.add(admin)
            db.commit()
            db.refresh(admin)
            print("✅ Admin seeded: admin@rakai.safe / Admin123!")

        # 2. Seed Police Officer
        police = db.query(User).filter(User.email == "police@rakai.safe").first()
        if not police:
            police = User(
                name="Inspector Rajan",
                email="police@rakai.safe",
                hashed_password=hash_password("Police123!"),
                phone="+91 94440 10001",
                role=UserRole.POLICE,
                jurisdiction="Central Zone",
                badge_number="TN-POL-7821",
                is_active=True
            )
            db.add(police)
            db.commit()
            db.refresh(police)
            print("✅ Police Officer seeded: police@rakai.safe / Police123! (Central Zone)")

        # 3. Seed Normal Protected User
        user = db.query(User).filter(User.email == "user@rakai.safe").first()
        if not user:
            user = User(
                name="Priya Sharma",
                email="user@rakai.safe",
                hashed_password=hash_password("Password123!"),
                phone="+916380173079",
                role=UserRole.USER,
                jurisdiction="Central Zone",
                is_active=True
            )
            db.add(user)
            db.commit()
            db.refresh(user)

            # Add sample trusted emergency contacts for user
            c1 = EmergencyContact(
                user_id=user.id,
                name="Mother (அம்மா)",
                phone="+91 6380173079",
                relation_type="Mother",
                priority=1
            )
            c2 = EmergencyContact(
                user_id=user.id,
                name="Ananya (Sister)",
                phone="+91 6380173079",
                relation_type="Sister",
                priority=2
            )
            c3 = EmergencyContact(
                user_id=user.id,
                name="Priya (Friend)",
                phone="+91 6380173079",
                relation_type="Friend",
                priority=3
            )
            db.add_all([c1, c2, c3])
            db.commit()
            print("✅ User seeded: user@rakai.safe / Password123! with 3 trusted emergency contacts")

        # 4. Seed Verified Infrastructure Places (Police Stations, Hospitals, Safe Havens)
        places_count = db.query(InfrastructurePlace).count()
        if places_count == 0:
            places = [
                InfrastructurePlace(
                    category=PlaceCategory.POLICE_STATION,
                    name="All-Women Police Station - Central",
                    name_tamil="அனைத்து மகளிர் காவல் நிலையம் (மத்திய மண்டலம்)",
                    address="EVR Periyar Salai, Park Town, Chennai",
                    phone="+91 6380173079",
                    latitude=13.0838,
                    longitude=80.2705,
                    jurisdiction="Central Zone",
                    is_verified=True,
                    operating_hours="24/7 Active Police Desk"
                ),
                InfrastructurePlace(
                    category=PlaceCategory.POLICE_STATION,
                    name="Flower Bazaar Police Station",
                    name_tamil="பூக்கடை காவல் நிலையம்",
                    address="NSC Bose Road, George Town, Chennai",
                    phone="+91 6380173079",
                    latitude=13.0910,
                    longitude=80.2830,
                    jurisdiction="Central Zone",
                    is_verified=True,
                    operating_hours="24/7 Police Assistance"
                ),
                InfrastructurePlace(
                    category=PlaceCategory.HOSPITAL,
                    name="Rajiv Gandhi Government General Hospital (Trauma 24/7)",
                    name_tamil="ராஜீவ் காந்தி அரசு பொது மருத்துவமனை (அவசர பிரிவு)",
                    address="EVR Periyar High Road, Park Town, Chennai",
                    phone="+91 6380173079",
                    latitude=13.0792,
                    longitude=80.2785,
                    jurisdiction="Central Zone",
                    is_verified=True,
                    operating_hours="24/7 Emergency & ICU"
                ),
                InfrastructurePlace(
                    category=PlaceCategory.HOSPITAL,
                    name="Apollo Children's & Women's Hospital",
                    name_tamil="அப்பல்லோ குழந்தைகள் & பெண்கள் மருத்துவமனை",
                    address="Shafee Mohammed Road, Thousand Lights, Chennai",
                    phone="+91 6380173079",
                    latitude=13.0610,
                    longitude=80.2520,
                    jurisdiction="South Zone",
                    is_verified=True,
                    operating_hours="24/7 Emergency Services"
                ),
                InfrastructurePlace(
                    category=PlaceCategory.SAFE_HAVEN,
                    name="Central Metro Station - CCTV Monitored Safe Haven",
                    name_tamil="சென்ட்ரல் மெட்ரோ நிலையம் (பாதுகாப்பு மையம்)",
                    address="Underground Concourse, Central Railway Square",
                    phone="044-25381122",
                    latitude=13.0815,
                    longitude=80.2730,
                    jurisdiction="Central Zone",
                    is_verified=True,
                    operating_hours="05:00 AM - 11:30 PM (Security Staff On Duty)"
                ),
                InfrastructurePlace(
                    category=PlaceCategory.SAFE_HAVEN,
                    name="Ripon Building Transit Helpdesk & Kiosk",
                    name_tamil="ரிப்பன் மாளிகை மக்கள் பாதுகாப்பு மையம்",
                    address="Sydenhams Road, Periyamet, Chennai",
                    phone="044-25619200",
                    latitude=13.0827,
                    longitude=80.2715,
                    jurisdiction="Central Zone",
                    is_verified=True,
                    operating_hours="24/7 Municipal Guard Post"
                )
            ]
            db.add_all(places)
            db.commit()
            print("✅ Verified safe places seeded (Police, Hospitals, Safe Havens)")

        # 5. Seed Streetlight Segments
        lights_count = db.query(StreetlightSegment).count()
        if lights_count == 0:
            segments = [
                StreetlightSegment(
                    street_name="EVR Periyar High Road Corridor",
                    jurisdiction="Central Zone",
                    start_latitude=13.0820,
                    start_longitude=80.2700,
                    end_latitude=13.0780,
                    end_longitude=80.2760,
                    lighting_status=LightingStatus.WELL_LIT,
                    total_lights=24,
                    functional_lights=24,
                    is_verified=True,
                    source="Authority Smart Metering"
                ),
                StreetlightSegment(
                    street_name="Central Metro Transit Walkway",
                    jurisdiction="Central Zone",
                    start_latitude=13.0810,
                    start_longitude=80.2725,
                    end_latitude=13.0840,
                    end_longitude=80.2745,
                    lighting_status=LightingStatus.WELL_LIT,
                    total_lights=16,
                    functional_lights=16,
                    is_verified=True,
                    source="Authority Inspection"
                ),
                StreetlightSegment(
                    street_name="Sydenhams Commercial Crossway",
                    jurisdiction="Central Zone",
                    start_latitude=13.0835,
                    start_longitude=80.2690,
                    end_latitude=13.0860,
                    end_longitude=80.2670,
                    lighting_status=LightingStatus.MODERATELY_LIT,
                    total_lights=12,
                    functional_lights=9,
                    is_verified=True,
                    source="Municipal Census"
                ),
                StreetlightSegment(
                    street_name="Park Town Southern Lane",
                    jurisdiction="Central Zone",
                    start_latitude=13.0770,
                    start_longitude=80.2750,
                    end_latitude=13.0750,
                    end_longitude=80.2790,
                    lighting_status=LightingStatus.POORLY_LIT,
                    total_lights=10,
                    functional_lights=4,
                    is_verified=False,
                    source="Community Report"
                )
            ]
            db.add_all(segments)
            db.commit()
            print("✅ Streetlight segments seeded (Well-lit, Moderately-lit, Poorly-lit)")

        print("🎉 Database seeding complete!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
