from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_service_status():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "service": "stats-service",
        "status": "ok"
    }


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy"
    }