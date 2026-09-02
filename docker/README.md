# Stats Service & Prototypes - Docker

## Image

`thanapat2103/stats-service-api:v0.1.0`

## Base Image

`python:3.12-slim`

## Build & Run Context

> [!NOTE]
> `Dockerfile` และ `.dockerignore` อยู่ที่ Root directory ของ Repository (`d:\se-sec2-team-03`)
> ให้รันคำสั่ง Docker จาก Root directory ได้โดยตรง

### Build

```bash
docker build -t thanapat2103/stats-service-api:v0.1.0 .
```

### Check Image

```bash
docker images
```

---

## รูปแบบการทำงาน 3 บทบาท (Modes)

### 1. API Server (Stateless REST API)

รัน Container เพื่อเปิดให้บริการ API:

```bash
docker run --rm -p 8000:8000 thanapat2103/stats-service-api:v0.1.0
```

- **Interactive API Documentation (Swagger UI):** [http://localhost:8000/docs](http://localhost:8000/docs)
- **Service Status:** [http://localhost:8000/](http://localhost:8000/)
- **Health Check:** [http://localhost:8000/health](http://localhost:8000/health)
- **Stats & Expenses API:** [http://localhost:8000/api/stats](http://localhost:8000/api/stats)

---

### 2. Web App (Frontend Prototypes)

Container จะ Mount ไฟล์ UI Prototypes และพร้อมให้บริการหน้าเว็บทันทีเมื่อรัน Container:

- **Thanapat Record Expenses Prototype:**  
  [http://localhost:8000/prototypes/sprint1/Thanapat_RecordExpenses_prototype.html](http://localhost:8000/prototypes/sprint1/Thanapat_RecordExpenses_prototype.html)
- **Short URL:**  
  [http://localhost:8000/expenses](http://localhost:8000/expenses) หรือ [http://localhost:8000/prototype](http://localhost:8000/prototype)

---

### 3. Worker (Background Job Processing)

รองรับการทำงานประมวลผล Background Tasks 2 รูปแบบ:

1. **Trigger ผ่าน API Endpoint (Asynchronous Task):**
   ```bash
   curl -X POST http://localhost:8000/api/worker/process-stats
   ```

2. **Standalone Worker Container (สำหรับรัน Background Batch Job):**
   ```bash
   docker run --rm thanapat2103/stats-service-api:v0.1.0 python app.py
   ```

---

## Environment Variables

ตอนนี้ไม่มี Environment Variable ที่จำเป็น

หากมีการเชื่อมต่อ Database หรือ Secret ในอนาคต สามารถส่งผ่าน Docker ได้ เช่น:

```bash
docker run --rm -p 8000:8000 -e DATABASE_URL="postgresql://user:pass@localhost:5432/daybyday" thanapat2103/stats-service-api:v0.1.0
```

---

## Why Container?

เลือกใช้ Container เพราะช่วยให้ Application และ Dependencies สามารถทำงานใน Environment เดียวกัน ทำให้ Build, Test และ Deploy ได้ง่ายขึ้น และสามารถนำ Image เดียวกันไปใช้งานในเครื่องอื่นได้อย่างสม่ำเสมอ

## Why Not VM?

ไม่ใช้ VM เพราะต้องใช้ Operating System เต็มรูปแบบและใช้ Resource มากกว่า Container ในขณะที่ Container มีขนาดเล็กกว่าและ Start ได้เร็วกว่า

## Security

- Container ทำงานด้วย User ที่ไม่ใช่ root (`USER nobody`) เพื่อเพิ่มความปลอดภัย
- ใช้ `.dockerignore` ที่ Root เพื่อไม่ให้ไฟล์ที่ไม่จำเป็น เช่น `.env`, `.git`, `docs/`, `tests/` และไฟล์ Log ถูกนำเข้า Docker Image Context

## Registry

- **Docker Hub:** `thanapat2103/stats-service-api`
- **Tag:** `v0.1.0`