import pytest
from fastapi.testclient import TestClient
from app.main import app
from seed_data import seed_database

# Ensure database is seeded for tests
seed_database()

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_login_user():
    response = client.post("/api/v1/auth/login", json={
        "email": "user@rakai.safe",
        "password": "Password123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "USER"
    assert data["user"]["email"] == "user@rakai.safe"

def test_login_police():
    response = client.post("/api/v1/auth/login", json={
        "email": "police@rakai.safe",
        "password": "Police123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["user"]["role"] == "POLICE"
    assert data["user"]["jurisdiction"] == "Central Zone"

def test_login_admin():
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@rakai.safe",
        "password": "Admin123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["user"]["role"] == "ADMIN"

def test_user_emergency_contacts():
    # Login user
    login_res = client.post("/api/v1/auth/login", json={
        "email": "user@rakai.safe",
        "password": "Password123!"
    })
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Get contacts
    get_res = client.get("/api/v1/contacts", headers=headers)
    assert get_res.status_code == 200
    contacts = get_res.json()
    assert len(contacts) >= 2

def test_sos_workflow_and_police_triage():
    # 1. User triggers SOS
    user_token = client.post("/api/v1/auth/login", json={
        "email": "user@rakai.safe",
        "password": "Password123!"
    }).json()["access_token"]
    user_headers = {"Authorization": f"Bearer {user_token}"}

    # Ensure clean slate: terminate any prior test emergency
    client.post("/api/v1/emergency/end", headers=user_headers)

    sos_res = client.post("/api/v1/emergency/trigger", json={
        "mode": "SIREN",
        "latitude": 13.0827,
        "longitude": 80.2707,
        "accuracy_meters": 5.0,
        "jurisdiction": "Central Zone"
    }, headers=user_headers)
    assert sos_res.status_code == 201
    incident = sos_res.json()
    incident_id = incident["id"]
    assert incident["status"] == "ACTIVE"

    # 2. Police Officer checks queue
    police_token = client.post("/api/v1/auth/login", json={
        "email": "police@rakai.safe",
        "password": "Police123!"
    }).json()["access_token"]
    police_headers = {"Authorization": f"Bearer {police_token}"}

    queue_res = client.get("/api/v1/incidents?status=ACTIVE", headers=police_headers)
    assert queue_res.status_code == 200
    incidents = queue_res.json()
    assert any(i["id"] == incident_id for i in incidents)

    # 3. Police acknowledges incident
    ack_res = client.put(f"/api/v1/incidents/{incident_id}/status", json={
        "status": "ACKNOWLEDGED",
        "responder_notes": "Unit 4 dispatched to Park Town square."
    }, headers=police_headers)
    assert ack_res.status_code == 200
    assert ack_res.json()["status"] == "ACKNOWLEDGED"

    # 4. User ends emergency
    end_res = client.post("/api/v1/emergency/end", headers=user_headers)
    assert end_res.status_code == 200
    assert end_res.json()["status"] == "RESOLVED"

def test_infrastructure_and_route_analysis():
    places_res = client.get("/api/v1/infrastructure/places?latitude=13.0827&longitude=80.2707&radius_meters=5000")
    assert places_res.status_code == 200
    places = places_res.json()
    assert len(places) > 0

    route_res = client.post("/api/v1/infrastructure/route/analyze", json={
        "start_latitude": 13.0820,
        "start_longitude": 80.2700,
        "destination_latitude": 13.0780,
        "destination_longitude": 80.2760
    })
    assert route_res.status_code == 200
    route_data = route_res.json()
    assert "lighting_safety_score" in route_data
    assert "waypoints" in route_data
    assert len(route_data["waypoints"]) >= 2
