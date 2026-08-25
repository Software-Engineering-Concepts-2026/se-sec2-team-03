# AI Usage Disclosure

## AI Tool Used

- **Tool:** ChatGPT
- **Purpose:** ใช้ช่วยวิเคราะห์ Requirements, เขียน User Stories, Acceptance Criteria, Scenario และ Non-Functional Requirements (NFRs)
- **Human Responsibility:** ทีมเป็นผู้ตรวจสอบ ปรับแก้ และตัดสินใจเลือกเนื้อหาที่นำมาใช้ในโปรเจกต์

---

## Prompts Used

### Prompt 1: สร้าง User Stories

> จาก Main Scenario ของระบบ ช่วยสร้าง User Stories จำนวน 8–15 เรื่อง โดยแต่ละเรื่องต้องมี Persona, Goal, Benefit และ Acceptance Criteria 3–5 ข้อ พร้อมกำหนด Priority เป็น Must / Should / Could และ Estimate เป็น S / M / L

**นำไปใช้กับ:** `docs/requirements/user-stories.md`

---

### Prompt 2: สร้าง Non-Functional Requirements

> ช่วยเขียน Non-Functional Requirements สำหรับระบบ โดยครอบคลุม Performance, Security, Availability, Scalability และ Usability และทุกข้อจะต้องสามารถวัดผลได้ด้วยตัวเลขที่ชัดเจน เช่น response time, uptime, จำนวนผู้ใช้พร้อมกัน และเวลาที่ผู้ใช้ใช้ในการทำงาน

**นำไปใช้กับ:** `docs/requirements/nfr.md`

---

### Prompt 3: สร้าง Prototype README

> ช่วยเขียน README.md สำหรับ Sprint 1 Prototype โดยต้องมีชื่อ Feature, User Story ที่อ้างอิง, Tracer vs Prototype, สิ่งที่ทำได้, สิ่งที่ไม่ได้ทำโดยตั้งใจ และ Next Step สำหรับ Sprint 2

**นำไปใช้กับ:** `prototypes/sprint1/README.md`

---

## Direct AI Output

ส่วนต่อไปนี้เป็นเนื้อหาที่รับจาก AI โดยตรงและไม่ได้แก้ไข:

1. โครงสร้าง User Story และ Acceptance Criteria ใน `docs/requirements/user-stories.md`
2. โครงสร้างและตัวอย่าง Non-Functional Requirements ใน `docs/requirements/nfr.md`
3. โครงสร้าง README สำหรับ Sprint 1 Prototype ใน `prototypes/sprint1/README.md`

---

## Human Review

ทีมได้ตรวจสอบเนื้อหาที่ได้รับจาก AI และเลือกใช้เฉพาะส่วนที่สอดคล้องกับ Requirements และขอบเขตของโปรเจกต์

AI ถูกใช้เป็นเครื่องมือช่วยในการร่างและจัดโครงสร้างเอกสารเท่านั้น การตัดสินใจขั้นสุดท้ายเกี่ยวกับ Requirements, Features และการนำไปใช้งานเป็นความรับผิดชอบของทีม
