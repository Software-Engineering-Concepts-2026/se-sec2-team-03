# Stage 1: ใช้ Base Image เป็น Python 3.12-slim เพื่อลดขนาดของ Image
FROM python:3.12-slim

# กำหนด Working Directory ภายใน Container
WORKDIR /app

# คัดลอกไฟล์ requirements.txt และติดตั้ง Dependencies
COPY services/stats-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอก Source Code ของ FastAPI Application, Test File และโฟลเดอร์ Prototypes
COPY services/stats-service/app.py .
COPY services/stats-service/test_app.py .
COPY prototypes/ ./prototypes/

# เปิด Port 8000 สำหรับการเชื่อมต่อ API Server และ Web App
EXPOSE 8000

# รัน Container ด้วยสิทธิ์ผู้ใช้ที่ไม่ใช่ root เพื่อความปลอดภัย
USER nobody

# คำสั่งเริ่มต้นในการรัน FastAPI Application ผ่าน Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
