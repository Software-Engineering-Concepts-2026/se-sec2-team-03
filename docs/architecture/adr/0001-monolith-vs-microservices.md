# ADR 0001: เริ่มต้นด้วย Monolith แล้วแยกทีหลัง

## Status

Accepted — 2026-08-19

## Context

- ทีมพัฒนา 4 คน
- ระยะเวลาพัฒนา 8 สัปดาห์
- รองรับผู้ใช้งานประมาณ 100 users/day
- ต้องสามารถ Demo ระบบแบบ End-to-End ได้ตั้งแต่ Sprint 2
- ทีมไม่มี Ops Engineer โดยเฉพาะ
- Requirements ของระบบยังมีการเปลี่ยนแปลงและยังไม่ชัดเจนทั้งหมด
- ต้องการลดความซับซ้อนในการพัฒนาและการ Deploy ในช่วงแรก

## Decision

เริ่มต้นพัฒนาระบบด้วยสถาปัตยกรรมแบบ **Monolith**

โดยใช้:

- Node.js
- Express.js
- แบ่งระบบภายในออกเป็น Modules ตามหน้าที่
- ใช้ REST API สำหรับการติดต่อระหว่างส่วนต่าง ๆ ภายในระบบ
- ใช้ Database ร่วมกันในช่วงเริ่มต้น

เมื่อระบบมีจำนวนผู้ใช้งานเพิ่มขึ้นมากกว่า **1,000 users/day** หรือพบว่า Module ใดมีภาระงานสูงกว่าส่วนอื่นอย่างชัดเจน จะพิจารณาแยก Module นั้นออกเป็น Service แยกต่างหาก

ตัวอย่าง Service ที่อาจแยกในอนาคตคือ **Matching Service**

## Consequences

### Positive

- ✅ Deploy ง่าย เพราะมี Application หลักเพียงชุดเดียว
- ✅ ทีมพัฒนาและทำความเข้าใจระบบได้ง่าย
- ✅ Debug และ Test ระบบได้สะดวก
- ✅ เหมาะกับทีมขนาดเล็กและระยะเวลาพัฒนาที่จำกัด
- ✅ Performance เพียงพอสำหรับประมาณ 100 users/day
- ✅ สามารถ Demo ระบบ End-to-End ได้เร็ว

### Negative

- ❌ การ Scale แต่ละ Module แยกกันยังทำไม่ได้ทันที
- ❌ หากระบบเติบโตมากขึ้น อาจต้อง Refactor เพื่อแยก Service
- ❌ หาก Module ใดมีปัญหา อาจส่งผลกระทบต่อ Application หลัก
- ❌ ใช้ Technology Stack หลักร่วมกัน
- ❌ หากในอนาคตต้องใช้ Python สำหรับงาน ML อาจต้องเชื่อมต่อผ่าน API

## Alternatives Considered

### Microservices (3 Services)

**Rejected**

มีความซับซ้อนในการพัฒนาและ Deploy สูงกว่า Monolith รวมถึงต้องจัดการเรื่อง Service Communication, Monitoring และ Deployment หลายส่วน ซึ่งไม่เหมาะกับทีม 4 คนที่ไม่มี Ops Engineer และมีเวลาพัฒนาเพียง 8 สัปดาห์

### Serverless (Lambda)

**Rejected**

ไม่เหมาะกับขอบเขตของระบบในช่วงเริ่มต้น เนื่องจากมีความซับซ้อนเพิ่มเติมในการออกแบบระบบ และอาจเกิด Cold Start รวมถึงต้นทุนและการจัดการ Infrastructure ที่ไม่จำเป็นสำหรับระบบที่มี Traffic ต่ำ

### Separate Frontend + Backend (BFF)

**Considered**

สามารถแยก Frontend และ Backend ได้ในอนาคต แต่ในช่วงเริ่มต้นจะเน้นให้ระบบสามารถพัฒนาและ Demo ได้รวดเร็ว จึงเลือกใช้ Monolith ก่อน และจะพิจารณาการแยกส่วนเมื่อ Requirements และขนาดระบบมีความชัดเจนมากขึ้น

## Review Trigger

จะทบทวนการตัดสินใจนี้เมื่อเกิดเงื่อนไขใดเงื่อนไขหนึ่งต่อไปนี้:

- จำนวนผู้ใช้งานมากกว่า 1,000 users/day
- มี Module ที่มี Load สูงกว่าส่วนอื่นอย่างชัดเจน
- มีความต้องการ Scale เฉพาะบาง Module
- ต้องใช้ Technology Stack ที่แตกต่างกันอย่างมีเหตุผล
- Performance ของ Monolith ไม่เพียงพอต่อ Requirements
