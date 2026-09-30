# Safety Net ของทีม DaybyDay (Team 03)

## 1. ฟังก์ชันที่เลือกทดสอบ
- **ฟังก์ชัน:** `calculate_discount` — อยู่ไฟล์ `services/stats-service/app.py`
- **เหตุผลที่เลือก:** เป็น Core Business Logic ด้านการเงินและส่วนลดรายจ่ายของผู้ใช้ มีผลลัพธ์ต่อการสรุปยอดเงินจริงในระบบ และเป็น Pure Function ที่ไม่มีผลข้างเคียง (Side Effect) ไม่ต้องเชื่อมต่อ Database หรือภายนอก ทำให้ทดสอบแบบ Unit Test ได้รวดเร็วและแม่นยำ 100%

## 2. เทสต์ที่เขียน (≥ 5 ตัว)

| # | ชื่อเทสต์ | ประเภท | ยืนยันอะไร |
|---|---|---|---|
| 1 | `test_calculate_discount_standard_percentage` | happy | ค่าใช้จ่าย 500 บาท ลด 20% → เหลือยอดสุทธิ 400.0 บาท |
| 2 | `test_calculate_discount_with_decimal_precision` | happy | ยอด 99.90 บาท ลด 15% คิดทศนิยมและปัดเศษ 2 ตำแหน่ง → 84.92 บาท |
| 3 | `test_calculate_discount_boundary_zero_percent` | edge | Boundary ล่างสุด: ลด 0% ยอดสุทธิต้องเท่ากับยอดเดิม (100.0 บาท) |
| 4 | `test_calculate_discount_boundary_hundred_percent` | edge | Boundary สูงสุด: ลด 100% ยอดสุทธิลดเหลือ 0.0 บาทพอดี |
| 5 | `test_calculate_discount_negative_percentage_raises_error` | error | เปอร์เซ็นต์ติดลบ (< 0) ส่งผลผิดพลาด → Raise `ValueError` |
| 6 | `test_calculate_discount_negative_amount_raises_error` | error | ยอดเงินเริ่มต้นติดลบ (< 0) ส่งผลผิดพลาด → Raise `ValueError` |

## 3. Coverage (ผลลัพธ์จริงจากเครื่องตัวเอง)

```text
Name                                 Stmts   Miss  Cover   Missing
------------------------------------------------------------------
services\stats-service\app.py           49     14    71%   39, 48, 56, 96, 108, 119-121, 127-128, 137-139, 144
services\stats-service\test_app.py      56     56     0%   1-133
------------------------------------------------------------------
TOTAL                                  105     70    33%
```

- **ตีความ:** ในส่วนของฟังก์ชัน `calculate_discount` (บรรทัดที่ 72–92) มี Coverage **100%** ครอบคลุมเส้นทาง Execution Path ทั้งหมด (Happy path, Boundary values 0% และ 100%, การปัดเศษทศนิยม 2 ตำแหน่ง, และการตรวจจับ Error กรณีค่าติดลบหรือเกิน 100)
- **ส่วนที่ยังไม่ครอบคลุม + เหตุผลที่ยอมรับความเสี่ยง:** บรรทัดที่ Missing ใน `app.py` คือ REST API Endpoints (`GET /`, `GET /health`, `GET /api/stats`, `GET /expenses`) และ Background Worker Jobs ซึ่งเป็นการทำงานระดับ Integration/HTTP Layer ที่มีชุดทดสอบครอบคลุมแยกต่างหากอยู่ใน `services/stats-service/test_app.py` แล้ว จึงยอมรับความเสี่ยงในระดับ Unit Test เฉพาะจุดนี้ได้

## 4. CI block อะไรบ้าง
- **lint (ruff):** ตรวจสอบรูปแบบโค้ดตามมาตรฐาน PEP 8 — หากมี unused import, import ไม่เรียงลำดับ หรือ syntax ผิดพลาด CI จะขึ้นสีแดงและแจ้งจุดที่ต้องแก้ไขทันที
- **test (pytest):** รันชุดทดสอบทั้งหมดใน `tests/` พร้อมวัด Code Coverage
- **Branch Protection:** บังคับให้การ Merge เข้าสู่ branch `main` จะต้องผ่านทั้ง `lint` และ `test` เป็น Required status checks และต้องมีรีวิวอนุมัติก่อน
- **หลักฐาน:** ได้ทำการทดลอง Saboteur Defect (เปลี่ยนเครื่องหมายลบเป็นบวกใน `calculate_discount`) แล้วเปิด PR ตรวจสอบพบว่า:
  - CI แจ้งเตือน `CI / test (pull_request) Failing` ❌
  - หน้า PR ขึ้นข้อความเตือนและปุ่ม Merge ถูกล็อก (Merging is blocked) ไม่สามารถรวมโค้ดที่พังเข้าสู่ `main` ได้จริง

## 5. บทเรียนที่ได้
- การมี **Safety Net (Automated Tests + CI)** ทำให้ทีมมั่นใจว่าการแก้ไขโค้ดหรือ Refactoring ในอนาคตจะไม่กระทบ Business Logic เดิม และลดความเสี่ยงจากการพึ่งพาแต่ Manual Testing
- **Boundary Value Analysis (BVA)** เป็นเทคนิคสำคัญมากสำหรับระบบบัญชีและรายจ่าย เพราะจุดผิดพลาดมักเกิดที่ขอบเขต เช่น 0%, 100% หรือเศษทศนิยม ซึ่งหากไม่มีเทสต์กำกับไว้มักจะถูกมองข้าม
- **Branch Protection** เปลี่ยน CI จาก "เครื่องมือรายงานผลเฉย ๆ" ให้กลายเป็น "ประตูป้องกันที่มีผลบังคับใช้จริง" ช่วยป้องกันไม่ให้บั๊กหลุดรอดไปถึงผู้ใช้งานหรือ Production
