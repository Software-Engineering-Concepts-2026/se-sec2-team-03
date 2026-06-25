# Project: [ชื่อโปรเจกต์ของคุณ]
_A brief, one-sentence description of what your project does._

## Team: [ชื่อทีมของคุณ]
- [ชื่อ-นามสกุล], GitHub: `[github_username]`
- [ชื่อ-นามสกุล], GitHub: `[github_username]`
- [ชื่อ-นามสกุล], GitHub: `[github_username]`

---

## 🚀 Getting Started

This section explains how to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- Git
- Python 3.10+
- Docker & Docker Compose

### Running the Application (with Docker)

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd [your-project-folder]
    ```

2.  **Run the services:**
    *(This section will be updated in later weeks when using Docker Compose)*
    ```bash
    # Example for a single service
    cd services/stats-service
    docker build -t your-team/stats-service .
    docker run -p 5001:5000 your-team/stats-service
    ```

---

## 🏛️ Architecture & Design

Key architectural decisions and diagrams are documented in the `/docs/architecture` directory.

- **[C4 Models & Tech Stack](./docs/architecture/README.md)**
- **[Architectural Decision Records (ADRs)](./docs/architecture/adr/)**

## 👥 Requirements

User personas and key scenarios that drive our development are located in the `/docs/requirements` directory.

- **[User Personas](./docs/requirements/personas/)**
- **[Main User Scenario](./docs/requirements/main_scenario.md)**

# 📑 ข้อตกลงร่วมกันในการทำงาน

---

# Project Charter – แนวทางการทำงานร่วมกัน (Ways of Working)

**ธีมโครงการ:** แดชบอร์ดข้อมูลชีวิต (Life Data Dashboard)

---

# 1. การประชุมประจำ (Meeting Cadence)

## ระยะเวลา Sprint

* ใช้ **Sprint 2 สัปดาห์** ต่อรอบ

## ตารางการประชุม

| การประชุม            | ความถี่            | ระยะเวลา   | วัตถุประสงค์                           |
| -------------------- | ------------------ | ---------- | -------------------------------------- |
| Daily Stand-up       | จันทร์–ศุกร์       | 10–15 นาที | อัปเดตความคืบหน้า แผนงาน และปัญหาที่พบ |
| Sprint Planning      | ทุกต้น Sprint      | 60 นาที    | กำหนดเป้าหมายและงานของ Sprint          |
| Backlog Refinement   | สัปดาห์ละ 1 ครั้ง  | 30 นาที    | ทบทวนและจัดลำดับความสำคัญของงาน        |
| Sprint Review        | ทุกท้าย Sprint     | 30 นาที    | สาธิตและตรวจสอบผลงานที่เสร็จแล้ว       |
| Sprint Retrospective | หลัง Sprint Review | 45 นาที    | สรุปบทเรียนและหาแนวทางปรับปรุง         |

## รูปแบบ Daily Stand-up

สมาชิกแต่ละคนตอบ 3 คำถาม:

1. เมื่อวานทำอะไรเสร็จไปแล้วบ้าง?
2. วันนี้จะทำอะไรต่อ?
3. มีอุปสรรคหรือปัญหาอะไรที่ต้องการความช่วยเหลือหรือไม่?

## กฎการเข้าร่วมประชุม

* หากไม่สามารถเข้าร่วมได้ ต้องแจ้งล่วงหน้า
* ผู้ที่ขาดประชุมต้องอ่านสรุปการประชุมภายใน 24 ชั่วโมง
* ทุกคนควรเข้าประชุมตรงเวลา

---

# 2. กติกาการสื่อสาร (Communication Rules)

## ช่องทางหลักในการสื่อสาร

* ใช้ **Discord / Microsoft Teams / Slack** เป็นช่องทางหลัก
* การพูดคุยเกี่ยวกับโปรเจกต์ควรเกิดขึ้นในช่องทางส่วนกลางของทีม

## ระยะเวลาการตอบกลับ

* วันเรียนหรือวันทำงาน: ตอบกลับภายใน **12 ชั่วโมง**
* กรณีเร่งด่วน (ระบบล่ม, Build Error, Deadline ใกล้): ตอบกลับภายใน **2 ชั่วโมง** หากสะดวก

## การใช้ Channel และ DM

### ใช้ Channel สาธารณะเมื่อ

* พูดคุยเรื่องงาน
* ถามปัญหาทางเทคนิค
* ขอความคิดเห็นจากทีม

### ใช้ DM เมื่อ

* เป็นเรื่องส่วนตัว
* แจ้งลาหรือปัญหาส่วนบุคคล
* ประเด็นที่ไม่เกี่ยวข้องกับทั้งทีม

## การใช้ Thread

* สร้าง Thread สำหรับแต่ละ Feature หรือ Issue
* หลีกเลี่ยงการคุยหลายเรื่องในข้อความเดียวกัน
* สรุปผลการตัดสินใจสำคัญไว้ใน Channel หลัก

## มารยาทในการสื่อสาร

* เคารพความคิดเห็นของผู้อื่น
* วิจารณ์งาน ไม่ใช่ตัวบุคคล
* หากติดปัญหาเกิน 1 วัน ให้ขอความช่วยเหลือ
* ใช้ภาษาที่สุภาพและชัดเจน

---

# 3. กระบวนการใช้งาน Git (Git Workflow)

## โครงสร้าง Branch

### Branch หลัก

* `main`

  * เก็บโค้ดที่พร้อมใช้งานและมีความเสถียร

* `develop`

  * ใช้รวมงานก่อนนำขึ้น `main`

### Branch สำหรับการพัฒนา

สร้างจาก `develop`

```text
feature/<feature-name>
bugfix/<issue-name>
hotfix/<issue-name>
```

ตัวอย่าง

```text
feature/user-dashboard
feature/health-tracking
bugfix/login-error
```

---

## กฎการ Commit

ใช้รูปแบบ

```text
ประเภท: รายละเอียด
```

ประเภทที่ใช้

| Prefix   | ความหมาย                   |
| -------- | -------------------------- |
| feat     | เพิ่มฟีเจอร์ใหม่           |
| fix      | แก้ไข Bug                  |
| docs     | แก้ไขเอกสาร                |
| refactor | ปรับปรุงโค้ด               |
| test     | เพิ่มหรือแก้ไข Test        |
| style    | ปรับแต่ง UI หรือรูปแบบโค้ด |
| chore    | งานบำรุงรักษาระบบ          |

ตัวอย่าง

```text
feat: เพิ่มหน้าสรุปข้อมูลสุขภาพ
fix: แก้ปัญหาการแสดงผลกราฟ
docs: อัปเดตเอกสาร API
```

---

## กระบวนการ Pull Request (PR)

1. สร้าง Branch ใหม่จาก `develop`
2. พัฒนาและ Commit งาน
3. Push ขึ้น Repository
4. สร้าง Pull Request ไปยัง `develop`
5. แนบลิงก์ Task หรือ User Story ที่เกี่ยวข้อง
6. ตรวจสอบว่า Build และ Test ผ่าน
7. ขอ Review จากสมาชิกทีม

---

## กฎการ Review Code

ก่อน Merge ต้องมีเงื่อนไขดังนี้

* มีสมาชิกอย่างน้อย **1 คนอนุมัติ (Approve)**
* ผู้สร้าง PR ไม่สามารถ Approve งานตัวเองได้
* ไม่มี Comment ที่ยังไม่ได้แก้ไข
* Build และ Test ต้องผ่านทั้งหมด

---

## การ Merge

* ใช้ **Squash and Merge**
* ลบ Branch หลังจาก Merge เรียบร้อย

---

# 4. การตัดสินใจร่วมกัน (Decision Making)

## หลักการพื้นฐาน

ทีมจะพยายามหาข้อสรุปร่วมกัน (Consensus) ก่อนเสมอ

ขั้นตอน

1. ทุกคนเสนอแนวทางและเหตุผล
2. พิจารณาข้อดีข้อเสีย
3. เปรียบเทียบผลกระทบต่อผู้ใช้งานและการพัฒนา

---

## หากยังหาข้อสรุปไม่ได้

### ขั้นที่ 1: จำกัดเวลาการถกเถียง

* ใช้เวลาไม่เกิน 15 นาที
* เปิดโอกาสให้ทุกคนแสดงความคิดเห็น

### ขั้นที่ 2: ทดลองหรือทำ Prototype

* สร้างตัวอย่างขนาดเล็ก
* เปรียบเทียบผลลัพธ์จริง

### ขั้นที่ 3: ลงคะแนนเสียง

* ใช้เสียงข้างมาก (Majority Vote)
* สมาชิกทุกคนมี 1 เสียงเท่ากัน

### ขั้นที่ 4: ให้ผู้รับผิดชอบตัดสินใจ

กรณีเร่งด่วน

* เรื่องเทคนิค → Tech Lead
* เรื่อง UI/UX → UX Lead
* เรื่องการจัดการงาน → Project Manager / Scrum Master

---

## การบันทึกการตัดสินใจ

การตัดสินใจสำคัญทุกครั้งต้องบันทึกใน Decision Log โดยระบุ

* วันที่
* หัวข้อ
* ทางเลือกที่พิจารณา
* ผลการตัดสินใจ
* เหตุผลประกอบ

---

# ข้อตกลงร่วมกันของทีม

พวกเราตกลงที่จะ

* รับผิดชอบงานที่ได้รับมอบหมาย
* แจ้งปัญหาหรือความเสี่ยงโดยเร็วที่สุด
* ช่วยเหลือกันเมื่อสมาชิกติดปัญหา
* อัปเดตสถานะงานอย่างสม่ำเสมอ
* Review งานของเพื่อนร่วมทีมอย่างสร้างสรรค์
* เรียนรู้และปรับปรุงกระบวนการทำงานอยู่เสมอ
* รักษาบรรยากาศการทำงานที่เป็นมิตรและให้เกียรติกัน

