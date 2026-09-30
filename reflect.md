# Reflection — Post-Quiz 4

## 1. สิ่งที่ได้เรียนรู้

จาก Lab 4 ได้เรียนรู้การใช้ AI ช่วยในการพัฒนา Software โดยเฉพาะการสร้าง Prototype และการปรับปรุง Requirements ให้ชัดเจนมากขึ้น

นอกจากนี้ยังได้เรียนรู้ว่าการใช้ AI ควรมีการตรวจสอบและทบทวนผลลัพธ์ก่อนนำไปใช้งานจริง ไม่ควรนำคำตอบจาก AI มาใช้โดยไม่ตรวจสอบ

## 2. สิ่งที่ทำได้ดี

สามารถนำ User Stories และ Requirements ที่กำหนดไว้มาใช้เป็นแนวทางในการสร้าง Prototype ได้ และสามารถใช้ AI ช่วยร่างเอกสาร เช่น User Stories, Acceptance Criteria และ NFRs ได้รวดเร็วขึ้น

อีกส่วนที่ทำได้ดีคือการแยกสิ่งที่ Prototype ทำได้และสิ่งที่ยังไม่ได้ทำ เพื่อให้ขอบเขตของ Prototype ชัดเจน

## 3. สิ่งที่พบว่ายังมีปัญหา

บางครั้งผลลัพธ์จาก AI ไม่ตรงกับ Requirements ของโปรเจกต์ทั้งหมด จึงต้องตรวจสอบและแก้ไขให้ตรงกับสิ่งที่ระบบต้องการ

นอกจากนี้ยังต้องระวังเรื่อง Feature Creep เพราะสามารถเพิ่มฟีเจอร์ที่ไม่ได้อยู่ในขอบเขตเดิมได้ง่ายเมื่อใช้ AI ช่วยคิด

## 4. สิ่งที่จะปรับปรุง

ใน Lab ต่อไปจะกำหนด Requirements และขอบเขตของงานให้ชัดเจนก่อนใช้ AI และจะตรวจสอบผลลัพธ์ทุกครั้งก่อนนำไปใช้

จะพยายามเขียน Prompt ให้มีรายละเอียดและข้อจำกัดที่ชัดเจนมากขึ้น เพื่อให้ผลลัพธ์จาก AI ตรงกับความต้องการของโปรเจกต์มากที่สุด

## 5. สิ่งที่นำไปใช้ต่อใน Lab 5

จะนำ User Stories, NFRs และ Prototype ที่สร้างไว้ไปใช้เป็นพื้นฐานในการออกแบบ Architecture ของระบบ

โดยจะพิจารณาการแบ่ง Frontend, Backend, Database และ API ให้เหมาะสมกับ Requirements ของระบบ

## 6. Key Takeaway

AI สามารถช่วยลดเวลาในการทำงานและช่วยสร้างแนวทางในการพัฒนาได้ แต่ผู้พัฒนายังคงต้องตรวจสอบความถูกต้องและตัดสินใจด้วยตนเอง

การมี Requirements ที่ชัดเจนและการกำหนดขอบเขตของระบบช่วยให้สามารถใช้ AI ได้อย่างมีประสิทธิภาพมากขึ้น

# Reflection — Post-Quiz 5

## 1. สิ่งที่ได้เรียนรู้

จาก Lab 5 ได้เรียนรู้เกี่ยวกับการออกแบบ Software Architecture และการบันทึกเหตุผลของการตัดสินใจด้าน Architecture ผ่าน Architecture Decision Record (ADR)

ได้เรียนรู้ว่า Architecture ไม่ได้เลือกจาก Technology ที่ทันสมัยที่สุดเสมอไป แต่ควรเลือกให้เหมาะสมกับ Requirements, ขนาดทีม, ระยะเวลาพัฒนา และจำนวนผู้ใช้งานของระบบ

นอกจากนี้ยังได้เรียนรู้ความแตกต่างระหว่าง Monolith และ Microservices และข้อดีข้อเสียของแต่ละแนวทาง

## 2. สิ่งที่ทำได้ดี

สามารถวิเคราะห์ข้อจำกัดของโปรเจกต์และนำมาใช้ประกอบการตัดสินใจเลือก Monolith เป็น Architecture เริ่มต้นได้

สามารถเขียน ADR ตามรูปแบบที่กำหนด โดยระบุ Context, Decision, Consequences และ Alternatives Considered อย่างชัดเจน

นอกจากนี้ยังสามารถกำหนดเงื่อนไขสำหรับทบทวน Architecture ในอนาคต เช่น เมื่อจำนวนผู้ใช้งานเพิ่มขึ้นหรือมี Module ที่มี Load สูงกว่าส่วนอื่น

## 3. สิ่งที่พบว่ายังมีปัญหา

ในช่วงแรกยังมีความสับสนเกี่ยวกับการเลือก Monolith หรือ Microservices เพราะทั้งสองแนวทางมีข้อดีและข้อเสียแตกต่างกัน

การตัดสินใจด้าน Architecture ต้องพิจารณาหลายปัจจัย ไม่สามารถเลือกจากความนิยมของ Technology เพียงอย่างเดียวได้

## 4. สิ่งที่จะปรับปรุง

ใน Lab ต่อไปจะพยายามวิเคราะห์ Requirements และข้อจำกัดของระบบก่อนเลือก Technology หรือ Architecture

จะเขียนเหตุผลของการตัดสินใจแต่ละอย่างให้ชัดเจนมากขึ้น และบันทึกการเปลี่ยนแปลงผ่าน ADR เพื่อให้ทีมสามารถย้อนกลับมาทบทวนเหตุผลได้

## 5. สิ่งที่นำไปใช้ต่อใน Lab 6

จะนำ Architecture ที่เลือกไว้ใน ADR ไปใช้เป็นพื้นฐานในการพัฒนาระบบจริง

โดยจะเริ่มจาก Monolith ที่แบ่งออกเป็น Modules ภายใน และพิจารณาการแบ่งส่วนของ Frontend, Backend, API และ Database ให้สอดคล้องกับ Architecture ที่ออกแบบไว้

## 6. Key Takeaway

Architecture ที่ดีไม่จำเป็นต้องซับซ้อนที่สุด แต่ควรเหมาะสมกับบริบทของระบบและทีมพัฒนา

สำหรับโปรเจกต์นี้ การเริ่มต้นด้วย Monolith ช่วยลดความซับซ้อนในการพัฒนาและ Deployment และยังสามารถแยก Service ในอนาคตได้เมื่อระบบมีความต้องการด้าน Scale เพิ่มขึ้น


# Reflection — Post-Quiz 6

## 1. สิ่งที่ได้เรียนรู้

จาก Lab 6 ได้เรียนรู้การนำ Application มาใช้งานผ่าน Docker Container ตั้งแต่การสร้าง Dockerfile, Build Image, Run Container และ Push Image ขึ้น Docker Hub

ได้เรียนรู้ว่า Container ช่วยให้ Application และ Dependencies สามารถทำงานใน Environment ที่เหมือนกันมากขึ้น และช่วยให้การ Deploy ทำได้ง่ายขึ้น

## 2. สิ่งที่ทำได้ดี

สามารถสร้าง Dockerfile สำหรับ Python FastAPI โดยใช้ `python:3.12-slim` และกำหนด Port สำหรับ Application ได้

สามารถ Build Docker Image และ Run Container ได้สำเร็จ รวมถึงทดสอบ API ผ่าน Browser และ FastAPI `/docs`

นอกจากนี้ยังสามารถ Push Image `thanapat2103/stats-service-api:v0.1.0` ขึ้น Docker Hub ได้

## 3. ปัญหาที่พบ

พบปัญหาในการตั้งค่า Docker และการ Run Container เนื่องจากช่วงแรกยังไม่มี Docker Engine ที่พร้อมใช้งาน

นอกจากนี้พบ Error จาก FastAPI เนื่องจาก `app.py` ยังไม่มีตัวแปร `app` สำหรับให้ Uvicorn เรียกใช้งาน

หลังจากตรวจสอบและแก้ไขแล้ว Container สามารถ Start และทำงานได้ตามปกติ

## 4. สิ่งที่จะปรับปรุง

ในครั้งต่อไปจะตรวจสอบโครงสร้างโปรเจกต์และ Dependencies ก่อนสร้าง Dockerfile

จะตรวจสอบ Port, Environment Variables และ Entry Point ของ Application ให้ตรงกับ Configuration ก่อน Build Image

นอกจากนี้จะให้ความสำคัญกับการลดขนาด Image และ Security มากขึ้น เช่น การใช้ Slim/Alpine Image, `.dockerignore` และการไม่รัน Container ด้วย root

## 5. สิ่งที่นำไปใช้ต่อ

จะนำ Docker Container ไปใช้เป็นพื้นฐานสำหรับการพัฒนาและ Deployment ใน Lab ต่อไป

สามารถนำ Docker Image เดียวกันไปใช้ใน Environment อื่นได้โดยไม่ต้องติดตั้ง Python และ Dependencies ใหม่ทั้งหมด

## 6. Key Takeaway

Docker Container ช่วยให้การ Build, Test และ Deploy Application มีความสม่ำเสมอมากขึ้น

สิ่งสำคัญคือ Docker ไม่ได้แก้ปัญหา Application Code ให้เอง ดังนั้นต้องตรวจสอบ Application, Dependencies, Port และ Configuration ให้ถูกต้องก่อนนำไป Containerize


# Reflection — Post-Quiz 7

## 1. สิ่งที่ได้เรียนรู้

จาก Lab 7 ได้เรียนรู้เกี่ยวกับ Code Smell และการ Refactoring โดยเข้าใจว่าการ Refactoring คือการปรับปรุงโครงสร้างของ Code โดยไม่เปลี่ยน behavior เดิมของระบบ

ใน Lab นี้ได้เลือกแก้ปัญหาเรื่อง **Poor Naming** โดยเปลี่ยนชื่อ Function จาก `root()` เป็น `get_service_status()` เพื่อให้ชื่อ Function สื่อความหมายและหน้าที่ของ Code ได้ชัดเจนมากขึ้น

---

## 2. สิ่งที่ทำได้ดี

ทีมสามารถวิเคราะห์ Code และเลือก Code Smell ที่สามารถแก้ไขได้ด้วย Local Refactoring โดยไม่ต้องเปลี่ยน Architecture ของระบบ

ก่อนและหลังการ Refactoring ได้ตรวจสอบว่า API ยังคงทำงานเหมือนเดิม โดย Endpoint `GET /` ยังคงคืนข้อมูลสถานะของ Stats Service และ Endpoint `/health` ยังคงทำงานตามปกติ

นอกจากนี้ยังได้ใช้ AI เป็นเครื่องมือช่วยในการอธิบาย Code Smell และเสนอแนวทาง Refactoring

---

## 3. ปัญหาที่พบ

ในช่วงแรกพบว่า Source Code ของโปรเจกต์มีขนาดไม่ใหญ่มาก ทำให้มี Code Smell ที่ชัดเจนให้เลือกไม่มาก

นอกจากนี้ยังพบปัญหาในการรัน Test บนเครื่องโดยตรง เนื่องจากคำสั่ง `pip` ไม่สามารถใช้งานได้

อย่างไรก็ตาม สามารถใช้ Docker Container เป็นส่วนหนึ่งในการตรวจสอบการทำงานของ Application และทำ Manual Smoke Test เพื่อยืนยันว่า API ยังทำงานได้

---

## 4. สิ่งที่จะปรับปรุง

ในอนาคตควรเขียน Automated Tests ตั้งแต่ช่วงแรกของการพัฒนา เพื่อให้สามารถ Refactor Code ได้อย่างมั่นใจมากขึ้น

ควรตรวจสอบ Development Environment เช่น Python และ pip ให้พร้อมก่อนเริ่มทำงาน เพื่อให้สามารถรัน Test ได้สะดวก

นอกจากนี้ควรตั้งชื่อ Function, Variable และ Component ให้สื่อความหมายตั้งแต่เริ่มต้น เพื่อลด Code Smell ที่เกิดจาก Poor Naming

---

## 5. AI Workflow ที่ใช้

Lab นี้ใช้ Workflow:

**Explain → Propose → Apply → Test**

เริ่มจากให้ AI ช่วยอธิบาย Code Smell และผลกระทบ จากนั้นให้ AI เสนอแนวทาง Refactoring

ทีมตรวจสอบข้อเสนอและเป็นผู้ตัดสินใจเลือกแนวทางที่เหมาะสม ก่อนนำไปแก้ไข Code และทดสอบว่า behavior เดิมยังคงทำงาน

---

## 6. สิ่งที่ได้เรียนรู้เกี่ยวกับ AI

AI สามารถช่วยวิเคราะห์ Code และเสนอแนวทาง Refactoring ได้รวดเร็ว แต่ไม่ควรนำคำตอบจาก AI มาใช้ทันทีโดยไม่ตรวจสอบ

ทีมต้องเข้าใจ Code และสามารถอธิบายได้ว่าทำไมจึงเลือก Refactor ด้วยวิธีนั้น

AI ควรเป็นเครื่องมือช่วยในการคิด วิเคราะห์ และตรวจสอบ ไม่ใช่ผู้ตัดสินใจแทนทีม

---

## 7. Key Takeaway

การ Refactoring ที่ดีไม่จำเป็นต้องเป็นการเปลี่ยนแปลงครั้งใหญ่

การปรับปรุงเล็ก ๆ เช่นการตั้งชื่อ Function ให้สื่อความหมาย สามารถช่วยให้ Code อ่านง่าย ดูแลรักษาง่าย และลดความสับสนของผู้พัฒนาในอนาคตได้

สิ่งสำคัญที่สุดคือ หลังจาก Refactor แล้ว **behavior เดิมของระบบต้องยังคงเหมือนเดิม**

---

# Reflection — Post-Quiz 9

## B1. Unit Test Plan (Equivalence Partitioning + Boundary Value Analysis)

### 1. ฟังก์ชันที่เลือกทดสอบ
เลือกฟังก์ชัน `calculate_discount(amount: float, percentage: float) -> float` ใน `services/stats-service/app.py` ซึ่งเป็น Core Business Logic สำหรับคำนวณส่วนลดและสรุปยอดค่าใช้จ่ายของระบบ

### 2. การวิเคราะห์ Equivalence Partitions (EP) และ Boundary Values (BV)
ระบุทั้งหมด 7 Partitions ครอบคลุมทั้ง Valid Input และ Error Handling:

1. **EP1 (Boundary - Lower Bound):** Percentage = 0% $\rightarrow$ คืนค่ายอดเดิมเต็มจำนวน (`amount`)
2. **EP2 (Valid Normal Partition):** Percentage อยู่ในช่วงปกติ (เช่น 15%, 20%) $\rightarrow$ คำนวณหักส่วนลดได้ถูกต้อง
3. **EP3 (Boundary - Upper Bound):** Percentage = 100% $\rightarrow$ คืนค่ายอดสุทธิเป็น `0.0`
4. **EP4 (Valid Precision Partition):** ทศนิยมและเศษสตางค์ $\rightarrow$ ตรวจสอบการปัดเศษทศนิยม 2 ตำแหน่ง
5. **EP5 (Invalid Partition - Below Min):** Percentage < 0% (เช่น -5%) $\rightarrow$ ตรวจจับและ Raise `ValueError`
6. **EP6 (Invalid Partition - Above Max):** Percentage > 100% (เช่น 100.1%) $\rightarrow$ ตรวจจับและ Raise `ValueError`
7. **EP7 (Invalid Partition - Negative Amount):** Amount < 0 $\rightarrow$ ตรวจจับและ Raise `ValueError`

### 3. โครงสร้างการเขียนแบบ Arrange-Act-Assert (AAA)
แยกขั้นตอนการเตรียมข้อมูล (Arrange), การเรียกฟังก์ชัน (Act), และการตรวจสอบผลลัพธ์ (Assert) ออกจากกันอย่างชัดเจน ทำให้ Test อ่านง่ายและระบุสาเหตุข้อผิดพลาดได้รวดเร็ว

---

## B2. TDD Plan (Red-Green-Refactor with FizzBuzz Kata)

### 1. วงจร Red-Green-Refactor ที่นำมาใช้
- **Red:** เขียน Test สำหรับพฤติกรรมใหม่ก่อนเสมอ แล้วรันให้ล้มเหลว (เช่น `assert fizzbuzz(3) == "Fizz"`) ยืนยันว่า Test สามารถดักจับพฤติกรรมที่ยังไม่มีได้จริง
- **Green:** เขียนโค้ดใน Production Code ให้เรียบง่ายและน้อยที่สุดเพื่อให้ Test ผ่าน
- **Refactor:** ปรับปรุงโครงสร้างของโค้ด เช่น การสกัดฟังก์ชัน `is_multiple(n, divisor)` เพื่อลดโค้ดซ้ำซ้อนและเพิ่มความสะอาด โดยที่ Test ทั้งหมดยังคง Pass อยู่เสมอ

### 2. ลำดับการเพิ่มพฤติกรรมแบบ Incremental
เริ่มจาก `3 ("Fizz")` $\rightarrow$ `1 ("1")` $\rightarrow$ `5 ("Buzz")` $\rightarrow$ `15 ("FizzBuzz")` $\rightarrow$ `7 ("7")`
การทำ TDD ช่วยป้องกันการเขียนโค้ดเกินความจำเป็น (Over-engineering) และทำให้มั่นใจในความถูกต้องของโค้ดทุกก้าว

---

## B3. Property-Based Testing Plan (Hypothesis)

### 1. การกำหนด Invariants และ Properties
แตกต่างจาก Example-based Testing ที่ทดสอบเฉพาะค่าคงที่ โดย Property-Based Testing กำหนดคุณสมบัติสัจพจน์ (Invariants) ที่ต้องเป็นจริงเสมอสำหรับชุดข้อมูลสุ่มจำนวนมาก:
- **Property 1 (Bounded Result):** ยอดหลังหักส่วนลดต้องไม่ติดลบและไม่เกินยอดเดิมเสมอ ($0 \le \text{result} \le \text{amount}$)
- **Property 2 (Identity Invariant):** ส่วนลด 0% ต้องให้ผลลัพธ์เท่ากับยอดตั้งต้นเสมอ
- **Property 3 (Upper Limit Invariant):** ส่วนลด 100% ต้องให้ผลลัพธ์เป็น 0.0 เสมอ
- **Property 4 (Monotonicity):** หากเปอร์เซ็นต์ส่วนลดเพิ่มขึ้น ยอดสุทธิหลังหักส่วนลดต้องน้อยลงหรือไม่เกินยอดเดิมเสมอ

### 2. ประโยชน์ของการ Shrinking
เมื่อ Hypothesis พบค่าที่ทำให้ Property ล้มเหลว ระบบจะทำการ "Shrink" หรือลดทอนชุดข้อมูลนำเข้าจนเหลือกรณีที่เล็กและเรียบง่ายที่สุด (Minimal Failing Example) ทำให้ผู้พัฒนาวิเคราะห์หาสาเหตุของ Bug ได้ทันที

---

## B4. สิ่งที่ได้เรียนรู้จาก Saboteur Testing และ CI

1. **Test State Coverage vs Code Coverage (Tip 93):**
   การที่ Code Coverage ถึง 100% ไม่ได้แปลว่าระบบปราศจาก Bug หากเราไม่ได้ทดสอบ State และ Boundary ให้ครอบคลุม การทดลอง Saboteur ด้วยการเปลี่ยน `< 0` เป็น `<= 0` แล้ว Test สามารถจับได้ทันที พิสูจน์ให้เห็นว่า Test ของเราตรวจสอบพฤติกรรมจริง ไม่ใช่แค่รันผ่านโค้ด
2. **Automated Quality Gate ผ่าน GitHub Actions:**
   CI ช่วยทำหน้าที่เป็นประตูป้องกัน (Gatekeeper) ตรวจสอบความถูกต้องของโค้ดในทุก Pull Request แบบอัตโนมัติ ช่วยลดความผิดพลาดจาก Human Error และป้องกันไม่ให้โค้ดที่มีข้อบกพร่องถูก Merge เข้าสู่ Main Branch

---

# Reflection — Post-Quiz 12 (Lab 12B: Safety Net Sprint)

## 1. สิ่งที่ได้เรียนรู้
- ได้เรียนรู้และลงมือสร้าง **Safety Net** ที่แท้จริงให้กับโปรเจกต์ของทีม โดยการผสาน Unit Tests (AAA Pattern), Coverage Report, GitHub Actions CI และ Branch Protection Rules เข้าด้วยกัน
- เข้าใจอย่างลึกซึ้งว่า CI ที่ไม่มี Branch Protection ก็เป็นเพียง "ของประดับ" แต่เมื่อเปิดใช้ Required Status Checks ร่วมกับ Branch Protection หุ่นยนต์ CI จะกลายเป็น Gatekeeper ที่คอยปกป้อง Branch `main` ไม่ให้โค้ดที่มีข้อผิดพลาดหลุดรอดเข้าไปได้

## 2. สิ่งที่ทำได้ดี
- สามารถเลือกฟังก์ชัน Core Business Logic (`calculate_discount`) ของทีมและออกแบบ Unit Test ได้ครอบคลุมทั้ง 3 กลุ่ม (Happy Path, Boundary/Edge Cases, และ Error Cases) รวม 6 เคส
- เขียน Test ตาม AAA Pattern ชัดเจน และวัดผล Coverage ได้ 100% สำหรับฟังก์ชันที่เลือก
- สามารถตั้งค่า `.github/workflows/ci.yml` รันคู่ขนาน 2 Jobs (`lint` ด้วย Ruff และ `test` ด้วย Pytest) ได้อย่างราบรื่นโดยไม่มีข้อผิดพลาด

## 3. สิ่งที่พบว่ายังมีปัญหาและวิธีแก้ไข
- ในช่วงแรก โค้ดเดิมมีข้อผิดพลาดเรื่อง Linting (unused imports และ formatting) ทำให้ Job `lint` มีโอกาสล้มเหลว จึงได้ใช้คำสั่ง `ruff check . --fix` ในการจัดระเบียบโค้ดให้สะอาดเรียบร้อยก่อน Push
- ในช่วงทดสอบ Saboteur Defect เพื่อพิสูจน์ว่าระบบบล็อกได้จริง พบว่าปุ่ม Merge ยังสามารถกดได้ เนื่องจากยังไม่ได้ติ๊กเลือกให้ status check `test` เป็น "Required" ใน Branch Protection จึงได้เข้าไปแก้ไขและเปิด "Do not allow bypassing" ทำให้เห็นสถานะ "Merging is blocked" ได้อย่างสมบูรณ์

## 4. สิ่งที่จะนำไปใช้ต่อใน Sprint ถัดไปและ Demo Day
- นำ Safety Net นี้ไปใช้เป็นมาตรฐานในการส่งโค้ดทุกครั้ง (Pull Request Workflow) เพื่อให้สมาชิกในทีมมั่นใจทุกครั้งที่รวมโค้ด
- ขยายการเขียน Unit Test ให้ครอบคลุมฟังก์ชันคำนวณและประมวลผลข้อมูลอื่น ๆ ของระบบ DaybyDay ก่อนถึงวัน Demo Day


