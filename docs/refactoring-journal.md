# Refactoring Journal — Lab 7

## Code Smell

**Smell:** Poor Naming

**Location:** `services/stats-service/app.py`

**Function:** `root()`

### Why is it a smell?

ชื่อ `root` เป็นชื่อที่กว้างและไม่ได้บอกหน้าที่ของ Function อย่างชัดเจน

จาก Code พบว่า Function นี้ตอบข้อมูลสถานะของ Stats Service ดังนั้นชื่อ `get_service_status` จะสื่อความหมายได้ชัดเจนกว่า

การเปลี่ยนชื่อครั้งนี้เป็น Local Refactoring และไม่เปลี่ยน API behavior หรือ URL ของระบบ

---

## AI Usage

### Prompt 1 — Identify Smell

> อ่าน codebase ของโปรเจกต์นี้และระบุ Code Smell ที่พบ พร้อมระบุ file, function และเหตุผล โดยเน้น Local Refactoring ที่สามารถแก้ได้ภายใน 30 นาที

### Prompt 2 — Explain

> อธิบายว่าฟังก์ชันชื่อ root ใน FastAPI นี้มีปัญหาเรื่อง Poor Naming หรือไม่ และถ้า refactor ควรเปลี่ยนชื่อเป็นอะไร โดยต้องไม่เปลี่ยน behavior ของ API

### Prompt 3 — Propose

> เสนอวิธี refactor ชื่อ function root ให้สื่อความหมายมากขึ้น พร้อมบอกว่าต้องแก้ Test อย่างไรเพื่อยืนยันว่า behavior เดิมยังเหมือนเดิม

### AI Output Used

AI แนะนำให้ใช้ชื่อที่สื่อความหมายตามหน้าที่ของ Function แทนชื่อ `root`

ทีมเลือกใช้:

`get_service_status`

เพราะ Function นี้คืนข้อมูลสถานะของ Stats Service

### Team Contribution

ทีมเป็นผู้ตรวจสอบและตัดสินใจเลือกชื่อสุดท้าย รวมถึงเป็นผู้แก้ไข Code และ Test

AI ใช้สำหรับช่วยวิเคราะห์ Code Smell และเสนอแนวทางเท่านั้น

---

## Before

```python
@app.get("/")
def root():
    return {
        "service": "stats-service",
        "status": "ok"
    }
```

## After

```python
@app.get("/")
def get_service_status():
    return {
        "service": "stats-service",
        "status": "ok"
    }
```