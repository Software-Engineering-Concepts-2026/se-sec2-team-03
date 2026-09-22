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

# AI Usage Disclosure

## AI Tool Used

- **Tool:** ChatGPT
- **Purpose:** ใช้ช่วยในการออกแบบ Architecture, เขียน ADR และตรวจสอบแนวทางการเลือกสถาปัตยกรรมของระบบ
- **Human Responsibility:** ทีมเป็นผู้ตรวจสอบความถูกต้องและตัดสินใจเลือก Architecture ที่เหมาะสมกับ Requirements ของโปรเจกต์

---

## Prompts Used

### Prompt 1: สร้าง ADR

> ช่วยเขียน Architecture Decision Record (ADR) ตาม Michael Nygard format สำหรับโปรเจกต์ที่มีทีม 4 คน ระยะเวลา 8 สัปดาห์ รองรับประมาณ 100 users/day และต้อง Demo End-to-End ใน Sprint 2 โดยเปรียบเทียบ Monolith กับ Microservices และอธิบาย Context, Decision, Consequences และ Alternatives Considered

**นำไปใช้กับ:**  
`docs/architecture/adr/0001-monolith-vs-microservices.md`

---

### Prompt 2: Challenge ADR

> ช่วย Challenge การตัดสินใจของทีมที่เลือก Monolith แทน Microservices โดยพิจารณาข้อดี ข้อเสีย ความเสี่ยง Scalability, Deployment, Team Size และ Requirements ที่ยังไม่แน่นอน พร้อมเสนอเงื่อนไขที่ควรใช้เป็น Trigger ในการแยก Service ในอนาคต

**นำไปใช้กับ:**  
การตรวจสอบและปรับปรุง ADR 0001

---

### Prompt 3: สร้าง Architecture Diagram

> ช่วยออกแบบ Architecture Diagram สำหรับระบบจัดการข้อมูลชีวิตประจำวันที่ใช้ Monolith Architecture โดยแสดง User, Frontend, Node.js + Express Backend, Modules และ Database พร้อมเขียนเป็น Mermaid syntax

**นำไปใช้กับ:**  
Architecture Diagram ของระบบ

---

## Direct AI Output

ส่วนต่อไปนี้เป็นเนื้อหาที่รับจาก AI โดยตรงและไม่ได้แก้ไข:

1. โครงสร้างและเนื้อหาส่วน **Context** ของ ADR
2. เนื้อหาส่วน **Decision** ที่เลือกเริ่มต้นด้วย Monolith
3. รายการ **Consequences** ทั้งข้อดีและข้อเสีย
4. รายการ **Alternatives Considered**
5. เงื่อนไข **Review Trigger** สำหรับพิจารณาแยก Service ในอนาคต

---

## Human Review

ทีมได้ตรวจสอบผลลัพธ์จาก AI และนำมาพิจารณาให้เหมาะสมกับ Requirements ของโปรเจกต์

การตัดสินใจเลือก Monolith เป็น Architecture หลักเป็นการตัดสินใจของทีม โดยพิจารณาจากจำนวนสมาชิกในทีม ระยะเวลาพัฒนา จำนวนผู้ใช้งาน และความไม่แน่นอนของ Requirements

AI ถูกใช้เป็นเครื่องมือช่วยในการร่างเอกสารและตั้งคำถามเพื่อท้าทายการตัดสินใจของทีม ไม่ได้เป็นผู้ตัดสินใจแทนทีม

# AI Usage Disclosure

## AI Tool Used

- Tool: ChatGPT
- Purpose: ใช้ช่วยตรวจสอบและจัดทำ Dockerfile, Docker configuration, Docker README และช่วยแก้ปัญหาในการ Build และ Run Container
- Human Responsibility: ทีมเป็นผู้ตรวจสอบผลลัพธ์และตัดสินใจเลือก Configuration ที่เหมาะสมกับโปรเจกต์

---

## Prompts Used

### Prompt 1: สร้าง Dockerfile สำหรับ FastAPI

> ช่วยเขียน Dockerfile สำหรับ Python FastAPI โดยใช้ python:3.12-slim, ติดตั้ง dependencies จาก requirements.txt, เปิด port 8000, ใช้ USER ที่ไม่ใช่ root และรันด้วย uvicorn

### Prompt 2: ตรวจสอบ Docker Error

> ช่วยแก้ปัญหา Docker Container ที่ขึ้น Error "Error loading ASGI app. Attribute app not found in module app" และอธิบายว่าต้องตรวจสอบ app.py และคำสั่ง uvicorn อย่างไร

### Prompt 3: เขียน Docker README

> ช่วยเขียน docker/README.md แบบสั้น ๆ โดยมี Image Name และ Tag, Base Image, Image Size, วิธี Build, วิธี Run, Environment Variables, เหตุผลที่เลือก Container และเหตุผลที่ไม่เลือก VM

---

## Direct AI Output

ส่วนที่รับจาก AI โดยตรงและไม่ได้แก้ไข:

1. โครงสร้าง Dockerfile สำหรับ FastAPI
2. คำสั่ง Docker Build และ Docker Run
3. โครงสร้างของ `docker/README.md`
4. แนวทางการใช้ `USER nobody` เพื่อไม่ให้ Container ทำงานด้วย root
5. แนวทางการใช้ `.dockerignore` เพื่อไม่ให้ไฟล์ที่ไม่จำเป็นถูกนำเข้า Docker Build Context

---

## Human Review

ทีมตรวจสอบ Dockerfile, Docker Image และ Container ก่อนนำไปใช้งานจริง

ทีมเป็นผู้ตรวจสอบและแก้ไข Configuration ให้ตรงกับโครงสร้างของโปรเจกต์ โดยใช้ Python FastAPI และ Port 8000

AI ถูกใช้เป็นเครื่องมือช่วยในการเขียน Configuration และแก้ไขปัญหาเท่านั้น ไม่ได้เป็นผู้ตัดสินใจแทนทีม


# AI Usage Disclosure

## Lab 7 — Refactoring

### AI Tool

- Tool: ChatGPT
- Purpose: ใช้ช่วยวิเคราะห์ Code Smell, อธิบายปัญหา, เสนอแนวทาง Refactoring และช่วยออกแบบ Test
- Final decision: ทีมเป็นผู้ตรวจสอบและตัดสินใจเลือกแนวทาง Refactoring

---

## Prompts Used

### Prompt 1 — Identify Code Smell

> อ่าน codebase ของโปรเจกต์นี้และระบุ Code Smell ที่พบ พร้อมระบุ file, function และเหตุผล โดยเน้น Local Refactoring ที่สามารถแก้ได้ภายใน 30 นาที

### Prompt 2 — Explain

> อธิบายว่าฟังก์ชันชื่อ root ใน FastAPI นี้มีปัญหาเรื่อง Poor Naming หรือไม่ และถ้า refactor ควรเปลี่ยนชื่อเป็นอะไร โดยต้องไม่เปลี่ยน behavior ของ API

### Prompt 3 — Propose

> เสนอวิธี refactor ชื่อ function root ให้สื่อความหมายมากขึ้น พร้อมบอกว่าต้องแก้ Test อย่างไรเพื่อยืนยันว่า behavior เดิมยังเหมือนเดิม

---

## AI Output Used Directly

ส่วนที่รับจาก AI โดยตรง:

- แนวคิดในการระบุ `root()` ว่าเป็นปัญหาเรื่อง Poor Naming
- คำแนะนำให้เปลี่ยนชื่อ Function ให้สื่อความหมายมากขึ้น
- แนวทางใช้ชื่อ `get_service_status`
- แนวทางการเขียน Test เพื่อยืนยันว่า Behavior เดิมไม่เปลี่ยน

---

## Team-Written Code

ทีมเป็นผู้เขียนและแก้ไข Code หลักเอง ได้แก่:

- เปลี่ยนชื่อ Function จาก `root()` เป็น `get_service_status()`
- เขียน Test สำหรับ `GET /`
- เขียน Test สำหรับ `GET /health`
- ตรวจสอบว่า API response และ status code ยังคงเหมือนเดิม
- รัน Docker Container และทำ Manual Smoke Test

---

## AI Workflow

ทีมใช้ Workflow ตามขั้นตอน:

**Explain → Propose → Apply → Test**

1. **Explain:** ให้ AI อธิบาย Code Smell
2. **Propose:** ให้ AI เสนอแนวทาง Refactoring
3. **Apply:** ทีมตรวจสอบและแก้ไข Code เอง
4. **Test:** ทีมรัน Test และ Manual Smoke Test

---

## Human Review

ทีมตรวจสอบ Code ที่ AI แนะนำก่อนนำไปใช้จริง

การ Refactoring ไม่เปลี่ยน API URL, Response หรือ Architecture ของระบบ

AI ถูกใช้เป็นเครื่องมือช่วยในการวิเคราะห์และเสนอแนวทางเท่านั้น การตัดสินใจและการแก้ไข Code เป็นความรับผิดชอบของทีม

---

# AI Usage Disclosure — Lab 09: Testing & CI

## AI Tool Used

- **Tool:** Gemini / Antigravity AI
- **Purpose:** ใช้ช่วยระบุ Equivalence Partitions, ออกแบบ Boundary Test Cases, แนะนำ Invariants สำหรับ Property-Based Testing (Hypothesis), และตรวจสอบคุณภาพของ Test Suite
- **Human Responsibility:** ทีมเป็นผู้ตรวจสอบความสมบูรณ์ของ Test Logic, นำหลักการ AAA มาปฏิบัติจริง, ดำเนินการ TDD แบบแยก Commit, และทดสอบ Saboteur เพื่อยืนยันพฤติกรรมของระบบ

---

## Prompts Used (>= 3 Prompts)

### Prompt 1: Generate Test Cases (Equivalence Partitioning & Boundary Values)

> จากฟังก์ชัน `calculate_discount(amount, percentage)` ช่วยระบุ Equivalence Partitions และ Boundary Values ทั้งฝั่ง Valid Input และ Invalid Input โดยเขียนเป็น Unit Test ตามโครงสร้าง Arrange-Act-Assert (AAA) ใน pytest ให้ครอบคลุมขอบเขต 0%, 100%, ทศนิยม และการจัดการข้อผิดพลาดเมื่อติดลบหรือเกิน 100%

**นำไปใช้กับ:** `tests/test_unit.py`

---

### Prompt 2: Identify Gaps & Property Invariants (Property-Based Testing)

> สำหรับฟังก์ชันคำนวณส่วนลด `apply_discount(amount, percentage)` ช่วยวิเคราะห์ Invariants หรือคุณสมบัติทางคณิตศาสตร์ที่ต้องเป็นจริงเสมอ ไม่ว่า Input จะสุ่มมาแบบใด (เช่น Bounded range, Identity at 0%, Monotonicity) เพื่อนำไปเขียน Property-Based Test ด้วย Hypothesis พร้อมทั้งระบุ Strategies ที่เหมาะสม

**นำไปใช้กับ:** `tests/test_property.py`

---

### Prompt 3: Review Quality & Saboteur Test Design

> ช่วยตรวจสอบคุณภาพของชุด Unit Test และ Property Test ที่สร้างขึ้นว่ามีจุดบกพร่องเรื่อง "Test State Coverage, Not Code Coverage" ตาม Pragmatic Programmer Tip 93 หรือไม่ และเสนอแนวทางการทำ Saboteur Testing เพื่อจงใจ Break โค้ดใน Production ให้เห็นว่า Test ดักจับได้จริง ไม่ใช่แค่รันผ่านโค้ด

**นำไปใช้กับ:** `docs/saboteur-journal.md` และการปรับปรุง Test Suite

---

## Direct AI Output

ส่วนต่อไปนี้เป็นเนื้อหาที่รับคำแนะนำหรือโครงสร้างจาก AI:

1. แนวคิดและรายการแบ่ง Equivalence Partitions 7 กรณีสำหรับฟังก์ชันคำนวณส่วนลด
2. โครงสร้าง Invariants 4 ข้อสำหรับการทดสอบด้วย Hypothesis (`st.floats`, `@given`)
3. โครงร่างเทมเพลตสำหรับ GitHub Actions workflow (`.github/workflows/test.yml`)
4. ข้อเสนอแนะการทดลอง Saboteur Defect Injection ที่จุดตรวจสอบขอบเขต (`<= 0` แทน `< 0`)

---

## Team-Written Code & Implementation

ทีมเป็นผู้ลงมือปฏิบัติและตรวจสอบด้วยตนเอง:

1. ดำเนินการ TDD Kata (FizzBuzz) ทีละรอบ Red $\rightarrow$ Green $\rightarrow$ Refactor พร้อมบันทึก Commit History แยกกันตามรอบจริง
2. สร้างโมดูล `src/discount.py` และนำ AAA Pattern ไปปรับใช้ใน `tests/test_unit.py`
3. ทำการทดลอง Saboteur Break Code จริง ตรวจสอบว่า Test ตรวจพบความผิดพลาด แล้วจึง Revert กลับ
4. ทดสอบและตั้งค่า GitHub Actions CI Workflow สำหรับ Automated Testing & Code Coverage

---

## Human Review & Quality Assurance

ทีมได้ทบทวนโค้ดและ Assertion ทุกตัวเพื่อให้มั่นใจว่า:
- ไม่มี Test ตัวใดที่เป็น Dummy Assertion (เช่น `assert True`) แต่ทดสอบ State และ Business Logic จริง
- ทุกกรณีทดสอบมี Error message ที่ชัดเจนเมื่อเกิดข้อผิดพลาด
- Workflow ของ CI สั่ง Fail และ Block การทำงานได้อย่างถูกต้องเมื่อมี Test ล้มเหลว