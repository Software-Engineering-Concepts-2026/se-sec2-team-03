import time
from pathlib import Path
from typing import Any

from fastapi import BackgroundTasks, FastAPI
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles

# สร้าง FastAPI Application หลักของระบบ
app = FastAPI(
    title="DaybyDay - Stats Service & Expense Tracker",
    description="ระบบ Stats Service, Web App Prototype และ Background Worker ของโครงการ DaybyDay",
    version="0.1.0"
)

# ค้นหา Path สำหรับโฟลเดอร์ prototypes (รองรับทั้งการรันแบบ Local และการรันใน Docker Container)
BASE_DIR = Path(__file__).resolve().parent

PROTOTYPES_DIR = BASE_DIR / "prototypes"
if not PROTOTYPES_DIR.exists():
    PROTOTYPES_DIR = BASE_DIR.parent.parent / "prototypes"

# Mount Static Files เพื่อให้บริการไฟล์ Prototype (HTML, CSS, JS)
if PROTOTYPES_DIR.exists():
    app.mount(
        "/prototypes",
        StaticFiles(directory=str(PROTOTYPES_DIR), html=True),
        name="prototypes"
    )


# ==========================================
# 1. API Server (Stateless REST API Endpoints)
# ==========================================

@app.get("/")
def get_service_status():
    """ตรวจสอบสถานะการทำงานของ Stats Service"""
    return {
        "service": "stats-service",
        "status": "ok"
    }


@app.get("/health")
def health():
    """Endpoint สำหรับการตรวจเช็คสถานะความพร้อมของระบบ (Health Check)"""
    return {
        "status": "healthy"
    }


@app.get("/api/stats")
def get_expense_stats() -> dict[str, Any]:
    """ดึงข้อมูลสถิติสรุปรายจ่าย ยอดรวม และแยกตามหมวดหมู่"""
    return {
        "currency": "THB",
        "month": "July 2026",
        "total_expense": 12500.00,
        "categories": {
            "อาหาร": 4500.00,
            "เดินทาง": 2200.00,
            "ช้อปปิ้ง": 3100.00,
            "บ้าน": 1500.00,
            "บันเทิง": 2000.00,
            "อื่นๆ": 800.00
        },
        "transaction_count": 3
    }


def calculate_discount(amount: float, percentage: float) -> float:
    """Calculate the final amount after deducting the discount percentage.
    
    Args:
        amount: Initial amount before discount (must be >= 0)
        percentage: Discount percentage (must be 0 <= percentage <= 100)
        
    Returns:
        float: Amount after discount rounded to 2 decimal places.
        
    Raises:
        ValueError: If amount is negative or percentage is outside [0, 100].
    """
    if amount < 0:
        raise ValueError("Amount must be non-negative")
    if percentage < 0 or percentage > 100:
        raise ValueError("Percentage must be between 0 and 100")
    
    discount_value = amount * (percentage / 100.0)
    return round(amount - discount_value, 2)


def apply_discount(amount: float, percentage: float) -> float:
    """Convenience alias for calculate_discount used across services and property tests."""
    return calculate_discount(amount, percentage)



# ==========================================
# 2. Web App (การเชื่อมต่อไปยัง Frontend Prototype)
# ==========================================

@app.get("/prototype")
@app.get("/expenses")
def redirect_to_expenses_prototype():
    """ทำ Redirect ไปยังหน้า Web App Prototype บันทึกรายจ่ายของธนภัทร"""
    return RedirectResponse(
        url="/prototypes/sprint1/Thanapat_RecordExpenses_prototype.html"
    )


@app.get("/dashboard")
def redirect_to_dashboard():
    """ทำ Redirect ไปยังหน้า Web App Prototype แดชบอร์ดภาพรวมของอริญชัย"""
    return RedirectResponse(
        url="/prototypes/sprint1/Arinchai_dashboard_prototype.html"
    )


@app.get("/tasks")
def redirect_to_tasks():
    """ทำ Redirect ไปยังหน้า Web App Prototype เพิ่มงานของสลิลทิพย์"""
    return RedirectResponse(
        url="/prototypes/sprint1/Salintip_AddTask_prototype.html"
    )


# ==========================================
# 3. Worker (การประมวลผล Background Jobs)
# ==========================================

def calculate_monthly_summary_job():
    """ฟังก์ชันจำลองงานประมวลผลสรุปสถิติแบบ Background Worker"""
    print("[Worker] กำลังเริ่มประมวลผลสรุปสถิติรายจ่ายประจำเดือน...")
    time.sleep(0.5)
    print("[Worker] การประมวลผลสรุปสถิติเสร็จสมบูรณ์เรียบร้อยแล้ว")


@app.post("/api/worker/process-stats")
def trigger_worker_job(background_tasks: BackgroundTasks):
    """เรียกใช้งาน Background Worker Job แบบ Asynchronous ผ่าน API"""
    background_tasks.add_task(calculate_monthly_summary_job)
    return {
        "job_id": "job-stats-summary-01",
        "status": "queued",
        "message": "เริ่มการทำงานของ Background Worker สำเร็จ"
    }


def run_worker_task():
    """ฟังก์ชัน Entrypoint เมื่อรัน Container ในโหมด Standalone Worker"""
    print("[Worker Mode] กำลังรันงาน Background Worker แบบ Standalone...")
    calculate_monthly_summary_job()
    print("[Worker Mode] งาน Background Worker เสร็จสิ้นแล้ว")


if __name__ == "__main__":
    # กรณีรันไฟล์นี้โดยตรงเพื่อทำงานเป็น Worker Script
    run_worker_task()