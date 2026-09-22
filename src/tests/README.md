# 🧪 Automated Testing (src/tests)

โฟลเดอร์หลักสำหรับจัดเก็บชุดการทดสอบอัตโนมัติ (Automated Test Suites) เพื่อยืนยันความถูกต้อง ความปลอดภัย และเสถียรภาพของระบบซอฟต์แวร์ตามมาตรฐานทางวิศวกรรมซอฟต์แวร์ (Software Engineering Standards)

---

## 👤 ข้อมูลผู้รับผิดชอบและโมดูลที่พัฒนา

- **ผู้รับผิดชอบ:** ธนภัทร เอี่ยมสอาด (Thanapat Aiamsaart) — รหัสนิสิต 67021006
- **ระบบ/โมดูลเป้าหมาย:** ระบบคำนวณส่วนลดและสรุปยอดสถิติรายจ่าย (`services/stats-service/app.py` และ `src/fizzbuzz.py`)
- **กรอบการทดสอบ (Test Framework):** `pytest`, `hypothesis` (Property-Based Testing), `pytest-cov`

---

## 📂 รายการชุดการทดสอบในโฟลเดอร์นี้

| ไฟล์ทดสอบ | ประเภทการทดสอบ | รายละเอียดและขอบเขต |
|---|---|---|
| [`test_unit.py`](test_unit.py) | **Unit Test** | ทดสอบฟังก์ชัน `calculate_discount()` ครอบคลุม **7 Equivalence Partitions** และ **Boundary Values** ด้วยโครงสร้าง **Arrange-Act-Assert (AAA)** |
| [`test_fizzbuzz.py`](test_fizzbuzz.py) | **TDD Kata** | ชุดการทดสอบที่พัฒนาผ่านแนวคิด **Test-Driven Development (Red $\rightarrow$ Green $\rightarrow$ Refactor)** สำหรับฟังก์ชัน `fizzbuzz()` และ helper `is_multiple()` |
| [`test_property.py`](test_property.py) | **Property-Based Test** | ทดสอบสัจพจน์ (Invariants) 4 คุณสมบัติด้วย `hypothesis` สำหรับฟังก์ชัน `apply_discount()` สุ่มทดสอบชุดข้อมูลเพื่อยืนยันว่าผลลัพธ์อยู่ในขอบเขตเสมอ |

---

## 📋 รายละเอียดของแต่ละชุดการทดสอบ

### 1. Unit Test (`test_unit.py`)
ทดสอบพฤติกรรมของฟังก์ชันคำนวณส่วนลดตามหลัก Equivalence Partitioning:
- **EP1 (Lower Boundary):** ส่วนลด 0% ต้องได้ยอดเต็มจำนวนเดิม (`100.0 -> 100.0`)
- **EP2 (Normal Partition):** ส่วนลดอัตราปกติ เช่น 20% ของ 500 (`500.0 -> 400.0`)
- **EP3 (Upper Boundary):** ส่วนลด 100% ต้องได้ยอดสุทธิเป็น `0.0`
- **EP4 (Precision Partition):** ส่วนลดที่มีเศษสตางค์ ปัดเศษทศนิยม 2 ตำแหน่ง (`99.90` หัก 15% `-> 84.92`)
- **EP5 (Invalid Below Min):** ส่วนลดติดลบ (< 0%) ต้องแจ้งเตือน `ValueError`
- **EP6 (Invalid Above Max):** ส่วนลดเกิน 100% ต้องแจ้งเตือน `ValueError`
- **EP7 (Invalid Negative Amount):** ยอดเงินติดลบ (< 0) ต้องแจ้งเตือน `ValueError`

### 2. TDD Kata (`test_fizzbuzz.py`)
พัฒนาตามวงจร TDD ทีละขั้นตอน:
1. **Red:** เขียนเทสแรก `assert fizzbuzz(3) == "Fizz"` $\rightarrow$ รันแล้วล้มเหลว
2. **Green:** เขียน Production code ให้น้อยที่สุดเพื่อให้เทสผ่าน
3. **Refactor:** สกัด Helper `is_multiple()` เพื่อจัดโครงสร้างโค้ดให้สะอาด
4. **Incremental Cases:** ขยายกรณีทดสอบเพิ่มเติมจนครบถ้วน (`1`, `5`, `15`, `7`)

### 3. Property-Based Test (`test_property.py`)
ทดสอบคุณสมบัติที่ไม่แปรเปลี่ยน (Invariants) ด้วย `hypothesis`:
- **Bounded:** ยอดหลังหักส่วนลดต้องอยู่ระหว่าง $[0, \text{amount}]$ เสมอ
- **Identity:** ส่วนลด 0% ต้องให้ผลลัพธ์เท่ากับยอดเดิมเสมอ
- **Zero Result:** ส่วนลด 100% ต้องได้ผลลัพธ์เท่ากับ 0.0 เสมอ
- **Monotonicity:** เปอร์เซ็นต์ส่วนลดที่สูงกว่า ต้องได้ยอดสุทธิที่น้อยกว่าหรือเท่าเดิมเสมอ

---

## 🚀 วิธีการรันชุดการทดสอบ (How to Run)

### 1. ติดตั้ง Dependencies
```bash
pip install -r services/stats-service/requirements.txt
```

### 2. รันการทดสอบทั้งหมดในโฟลเดอร์นี้
```bash
pytest src/tests/
```

### 3. รันการทดสอบพร้อมวัด Code Coverage
```bash
pytest --cov=src --cov=services/stats-service --cov-report=term-missing src/tests/
```

---

## ⚙️ การเชื่อมต่อกับ Continuous Integration (CI)

ชุดการทดสอบในโฟลเดอร์นี้ถูกตั้งค่าให้รันโดยอัตโนมัติใน **GitHub Actions CI** ผ่านไฟล์ [`.github/workflows/test.yml`](../../.github/workflows/test.yml) ทุกครั้งที่มีการ:
- `push` ขึ้นสู่ Branch `main` หรือ `feature/**`
- เปิด `pull_request` เข้าสู่ `main`

หากมี Test ล้มเหลวแม้แต่ตัวเดียว GitHub Actions จะสั่ง **Block Merge** ทันที เพื่อรับประกันความปลอดภัยของโค้ดในระบบส่วนรวม
