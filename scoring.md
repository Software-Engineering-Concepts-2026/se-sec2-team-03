# Scoring — sec2-team-03

> โปร่งใส — คะแนนรายแล็บอิง Gradebook และหลักฐาน PR/files จริง อัปเดตตรวจซ้ำ Lab1-M1 2026-09-10 (อนุโลม Lab 1,3,4)

## สมาชิก
| ID | ชื่อ | GitHub |
|---|---|---|
| 67021006 | นายธนภัทร เอี่ยมสอาด | @Thanapat2103 |
| 67021309 | นางสาวสลิลทิพย์ ดอกนางแย้ม | @salintip-ops |
| 67024896 | นายอริญชัย ปิ่นทอง | @Arinchai11 |
| 67025976 | นายคชภัค เสนาน้อย | @Gun67025976 |

## คะแนนรายแล็บ (ระดับทีม)
| Lab | % earned | Verdict |
|---|---|---|
| Lab1 | 100 | ✅ Full (อนุโลม) |
| Lab2 | 50 | ⚠️ Partial |
| Lab3 | 100 | ✅ Full (ผ่อนผัน scenarios) |
| Lab4 | 100 | ✅ Full (ผ่อนผันชื่อ prototype) |
| Lab5 | 50 | ⚠️ Partial |
| Lab6 | 50 | ⚠️ Partial | Dockerfile single-stage + missing push |
| Lab7 | 50 | ⚠️ Partial |
| M1 | 50 | ⚠️ Partial |

## รายละเอียดแยกแล็บ (Lab1-7+M1)

| Lab | % | Verdict | หลักฐาน |
|---|---|---|---|
| Lab1 | 100 | ✅ Full (อนุโลม) | 3 ไฟล์ `Arinchai.md` `Salintip.md` `Thanapat.md` (ขาด `Gun67025976`) + PR #35-#39 มีตำหนิ placeholder/body ว่าง/ผิด branch — board #9 ไม่มี Lab1 Done — อนุโลมให้ |
| Lab2 | 50 | ⚠️ Partial | board #9 12 items มี labels/milestones ครบ แต่ proposal 5/6 sections ขาด DoD + ไม่มี `docs/definition-of-done.md` |
| Lab3 | 100 | ✅ Full (ผ่อนผัน) | `scenario.md` เอกพจน์ 1 เรื่อง นับแทน `scenarios.md` 3+ เรื่อง + personas 3 ไฟล์ + user-stories 12 เรื่องมี AC + nfr 8 ข้อ measurable + Issues #14-#25 link board |
| Lab4 | 100 | ✅ Full (ผ่อนผัน) | ไฟล์รายคน `Arinchai_dashboard`/`Salintip_AddTask`/`Thanapat_RecordExpenses` (+JS 4987B/10515B) นับแทน `index.html` + README ระบุ Tracer vs Prototype + ขอบเขต + Next Sprint 2 |
| Lab5 | 50 | ⚠️ Partial | ขาด `c4-context.md`/`c4-container.md`/`tech_stack.md` (มีแค่ README+png+adr 2 ไฟล์) + README อ้าง `mermaid-diagram-C1.png` ไม่มีจริง |
| Lab6 | 50 | ⚠️ Partial | Dockerfile single-stage (Full สั่ง multi-stage) + ไม่มีหลักฐาน push (ไม่มี log/screenshot/link Hub/size) |
| Lab7 | 50 | ⚠️ Partial | journal มี Smell+AI 3 prompts+Before/After แต่ขาด Lesson + refactor แค่ rename + ไม่มี log `pytest` + มี tag `v0.1.0` แต่ไม่มี GitHub Release/Notes |
| M1 | 50 | ⚠️ Partial | ขาด 2 ส่วน: Code Quality (test pass+DRY) + Repo/Docker (push proof) + Board Done 6 ใบไม่ถึง 8+ + ไม่มี DoD |

**Labs+M1 รวม**: 100+50+100+100+50+50+50+50 = 550/800 = 68.75% → 20.797/30.25 (เดิม 400/800 = 15.125)

Board: https://github.com/orgs/Software-Engineering-Concepts-2026/projects/9 — Repo: https://github.com/Software-Engineering-Concepts-2026/se-sec2-team-03

## คำตอบข้อสงสัยนิสิต (ตรวจซ้ำ 10 ก.ย.)

1. **scenarios มีไฟล์แต่บอกว่าไม่มี** — มี `docs/requirements/scenario.md` (เอกพจน์) จริง เพิ่ง rename จาก `main_scenario.md` 9 ก.ย. หลังตรวจ 7 ก.ย. Rubric สั่ง `scenarios.md` (พหูพจน์) 3+ เรื่อง narrative ไฟล์ปัจจุบันมี 1 Main Scenario อาจารย์ผ่อนผันให้นับ Lab 3 ขึ้น Full
2. **`prototypes/sprint1/index.html` 404 ทั้งที่มีไฟล์ชื่อสมาชิก** — ใน `sprint1/` มี 3 prototype รายคนจริง Rubric ข้อ 10 สั่ง path `index.html` ตัวเดียว อาจารย์ผ่อนผันให้นับไฟล์รายคนแทน Lab 4 ขึ้น Full
3. **ขาด artifacts คืออะไร** — ไฟล์สถาปัตยกรรม Lab 5 ข้อ 4.1 ที่ยังไม่มี 3 ไฟล์: `docs/architecture/c4-context.md` / `c4-container.md` / `tech_stack.md` (มีแค่ README+png+adr) + README อ้าง `mermaid-diagram-C1.png` ไม่มีจริง Lab 5 คง Partial
4. **missing push บอกว่า push แล้ว** — Dockerfile มีจริงแต่เป็น single-stage (Full สั่ง multi-stage) และไม่มีหลักฐาน push: ไม่มี log `docker push` / link Hub / screenshot / image size มีแค่ชื่อ image ใน README Lab 6 คง Partial ส่งหลักฐาน 4 อย่างนี้มาเพื่อตรวจใหม่

## รายคน (อนุโลม Lab 1,3,4 ระดับทีม — รายคนอิง merged commit)

| ID | ชื่อ | Lab1 | Lab2 | Lab3 | Lab4 | Lab5 | Lab6 | Lab7 | M1 | รวม/800 | /30.25 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 67021006 | ธนภัทร เอี่ยมสอาด | 100 | 50 | 100 | 100 | 50 | 50 | 50 | 50 | 550 | 20.797 |
| 67024896 | อริญชัย ปิ่นทอง | 100 | 50 | 100 | 100 | 50 | 50 | 50 | 50 | 550 | 20.797 |
| 67021309 | สลิลทิพย์ ดอกนางแย้ม | 100 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100 | 3.781 |
| 67025976 | คชภัค เสนาน้อย | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.000 |

> Salintip มี merged commit แค่ Lab 1 (PR #35/#36) → Lab2-7+M1 0 / Gun ไม่มีไฟล์ Lab 1 + ไม่มี merged commit ทุกแล็บ → 0 ทั้งหมด
> Gradebook: `67021006 100,50,100,100,50,50,50,50` / `67024896 100,50,100,100,50,50,50,50` / `67021309 100,0,0,0,0,0,0,0` / `67025976 0,0,0,0,0,0,0,0`

## ยืนยัน commit authors (ตัด thammarat-ai ออก — ถึง 10 ก.ย.)

| ID | ชื่อ | Commits merge จริง | Lab ที่ทำ |
|---|---|---|---|
| 67021006 | ธนภัทร เอี่ยมสอาด | 12+ commits — `feature/lab3` `lab5-architecture` `lab6-dockerfile` `lab7-refactor` `Thanapat.md` + rename `scenario.md` 9 ก.ย. | Lab1,3,4,5,6,7 |
| 67024896 | อริญชัย ปิ่นทอง | 5+ commits — `project-proposal` Lab2, `Arinchai_dashboard.js` Lab4, `lab6` | Lab2,4,6,7 |
| 67021309 | สลิลทิพย์ ดอกนางแย้ม | 2 commits — `Salintip.md` Lab1 (PR #35,36) | Lab1 อย่างเดียว |
| 67025976 | คชภัค เสนาน้อย | 0 merged — PR #26,27 `open` ไม่ merge | ไม่มีเลย |
