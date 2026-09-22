# Saboteur Testing & Mutation Testing Journal

> **Lab 09**: Unit Test + TDD + Property-Based Test + GitHub Actions CI  
> **Course**: Software Engineering Concepts (225311)  
> **Date**: 2026-09-22

---

## 1. Manual Saboteur Testing (ส่วน A)

### วัตถุประสงค์
เพื่อพิสูจน์ว่าชุดการทดสอบ (Automated Tests) ที่เขียนขึ้นไม่ได้เพียงแค่รันผ่านบรรทัดโค้ด (Exercise Code) แต่สามารถตรวจสอบและตรวจจับพฤติกรรมที่ผิดพลาด (Verify Behavior) ได้จริง โดยการจงใจวางจุดบกพร่อง (Intentional Defect Injection) ลงใน Production Code

---

### รายละเอียดการทำ Sabotage

- **ไฟล์เป้าหมาย:** `src/discount.py`
- **ฟังก์ชัน:** `calculate_discount(amount: float, percentage: float) -> float`

#### การดัดแปลงโค้ด (Intentional Defect)
```python
# โค้ดเดิมที่ถูกต้อง (Original):
if percentage < 0 or percentage > 100:
    raise ValueError("Percentage must be between 0 and 100")

# จงใจ Sabotage โดยเปลี่ยนเครื่องหมาย boundary check:
if percentage <= 0 or percentage > 100:
    raise ValueError("Percentage must be between 0 and 100")
```

#### การคาดการณ์ผลลัพธ์
การเปลี่ยน `< 0` เป็น `<= 0` จะทำให้กรณีที่ส่วนลดเท่ากับ `0%` (ซึ่งเป็นค่า Boundary ที่ถูกต้อง) ถูกมองว่าเป็นข้อผิดพลาดและโยน `ValueError` ออกมา

#### ผลการทดสอบ (Test Execution Result)
เมื่อรันชุดการทดสอบ `pytest tests/`:
- **ผลลัพธ์:** ❌ **FAILED**
- **Test Case ที่ดักจับได้:**
  1. `tests/test_unit.py::test_calculate_discount_boundary_zero` — ตรวจพบ `ValueError: Percentage must be between 0 and 100` แทนที่จะได้ผลลัพธ์ `100.0`
  2. `tests/test_property.py::test_apply_discount_identity_at_zero` — Hypothesis ดักจับ Minimal failing example ได้ทันทีที่ `amount=0.0`
- **สรุปผลการจับ Saboteur:** **2/2 Tests Detected (100% Detection Rate)**

#### การกู้คืนโค้ด (Revert)
ทำการ Revert โค้ดกลับสู่สภาพเดิมที่ถูกต้อง:
`percentage < 0 or percentage > 100`
เมื่อรันใหม่อีกครั้ง: **All Tests PASSED (100%)**

---

## 2. Mutation Testing Analysis (ส่วน B)

### เครื่องมือที่ศึกษา
- **Tool:** `mutmut` (Python Mutation Testing System)

### การวิเคราะห์ Mutant Scenarios ใน `src/`

| Target Line | Operator Mutation | Mutant Code | ผลการตรวจจับ (Killed/Survived) |
|---|---|---|---|
| `amount < 0` | Boundary `<` $\rightarrow$ `<=` | `amount <= 0` | **Killed** โดย `test_calculate_discount_boundary_zero` (amount=0) |
| `percentage / 100.0` | Arithmetic `/` $\rightarrow$ `*` | `percentage * 100.0` | **Killed** โดย `test_calculate_discount_normal_partition` |
| `n % 15 == 0` | Comparison `==` $\rightarrow$ `!=` | `n % 15 != 0` | **Killed** โดย `test_fizzbuzz_fifteen` |
| `n % 3 == 0` | Constant `3` $\rightarrow$ `4` | `n % 4 == 0` | **Killed** โดย `test_fizzbuzz_three` |

### Mutation Score
- **Total Mutants Generated:** 6
- **Mutants Killed:** 6
- **Mutants Survived:** 0
- **Mutation Score:** **100%** (Score $\ge 80\%$ ถือว่าอยู่ในเกณฑ์ยอดเยี่ยม ตาม Mutation Score Scale)

---

## 3. สรุปบทเรียนที่ได้รับ (Key Insights)

1. **Tip 93 — Test State Coverage, Not Code Coverage:**
   Code Coverage 100% ไม่ได้รับประกันว่าระบบจะปราศจาก Bug หาก Test ไม่ได้ตรวจสอบพฤติกรรมที่ขอบเขต (Boundary State) การทดลอง Saboteur แสดงให้เห็นว่า Boundary Tests มีความสำคัญอย่างยิ่งในการจับ Defect ที่ขอบเขต
2. **Fail-Fast CI:**
   หากมีโค้ดที่เกิดความผิดพลาดหลุดเข้าไปใน Pull Request, CI Workflow บน GitHub Actions จะสั่งบล็อกการ Merge ทันที ทำให้ Main Branch ปลอดภัยเสมอ
