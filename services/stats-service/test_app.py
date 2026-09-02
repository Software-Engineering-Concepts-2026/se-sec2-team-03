from fastapi.testclient import TestClient
from app import app

# สร้าง Test Client สำหรับส่ง Request ทดสอบ FastAPI App
client = TestClient(app)


def test_service_status():
    """ทดสอบ Endpoint GET / ว่าคืนค่าสถานะ ok และชื่อ service ถูกต้อง"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "service": "stats-service",
        "status": "ok"
    }


def test_health():
    """ทดสอบ Health check endpoint GET /health ว่าคืนสถานะ healthy"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "healthy"
    }


def test_expense_stats():
    """ทดสอบ API สรุปสถิติรายจ่าย GET /api/stats"""
    response = client.get("/api/stats")
    assert response.status_code == 200
    data = response.json()
    assert data["currency"] == "THB"
    assert data["total_expense"] == 12500.00
    assert "อาหาร" in data["categories"]


def test_prototype_redirect():
    """ทดสอบ Endpoint GET /expenses ว่า Redirect ไปยังหน้า Prototype ถูกต้อง"""
    response = client.get("/expenses", follow_redirects=False)
    assert response.status_code in [302, 307]
    assert "/prototypes/sprint1/Thanapat_RecordExpenses_prototype.html" in response.headers["location"]


def test_worker_job_trigger():
    """ทดสอบ Endpoint เรียกใช้งาน Background Worker POST /api/worker/process-stats"""
    response = client.post("/api/worker/process-stats")
    assert response.status_code == 200
    assert response.json()["status"] == "queued"