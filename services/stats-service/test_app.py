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


# ==============================================================================
# Lab 09: Unit Tests for calculate_discount (Equivalence Partitioning & AAA)
# ==============================================================================
import pytest
from app import calculate_discount


def test_calculate_discount_boundary_zero():
    """EP1 (Boundary - Lower Bound): 0% discount should return full original amount."""
    # Arrange
    amount, percentage = 100.0, 0.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 100.0


def test_calculate_discount_normal_partition():
    """EP2 (Valid Normal Partition): Standard discount percentage (e.g. 20% of 500)."""
    # Arrange
    amount, percentage = 500.0, 20.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 400.0


def test_calculate_discount_boundary_hundred():
    """EP3 (Boundary - Upper Bound): 100% discount should reduce amount to 0.0."""
    # Arrange
    amount, percentage = 250.0, 100.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 0.0


def test_calculate_discount_fractional_rounding():
    """EP4 (Valid Partition - Precision): Fractional percentage with 2-decimal precision."""
    # Arrange
    amount, percentage = 99.90, 15.0
    
    # Act
    result = calculate_discount(amount, percentage)
    
    # Assert
    assert result == 84.92


def test_calculate_discount_negative_percentage_error():
    """EP5 (Invalid Partition - Below Lower Bound): Negative percentage should raise ValueError."""
    # Arrange
    amount, percentage = 100.0, -5.0
    
    # Act & Assert
    with pytest.raises(ValueError, match="Percentage must be between 0 and 100"):
        calculate_discount(amount, percentage)


def test_calculate_discount_exceed_percentage_error():
    """EP6 (Invalid Partition - Above Upper Bound): Percentage > 100 should raise ValueError."""
    # Arrange
    amount, percentage = 100.0, 100.1
    
    # Act & Assert
    with pytest.raises(ValueError, match="Percentage must be between 0 and 100"):
        calculate_discount(amount, percentage)


def test_calculate_discount_negative_amount_error():
    """EP7 (Invalid Partition - Negative Amount): Negative amount should raise ValueError."""
    # Arrange
    amount, percentage = -50.0, 10.0
    
    # Act & Assert
    with pytest.raises(ValueError, match="Amount must be non-negative"):
        calculate_discount(amount, percentage)