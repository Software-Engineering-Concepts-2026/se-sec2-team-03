# Scoring — sec2-team-03

> โปร่งใส — คะแนนรายแล็บอิง Gradebook และหลักฐาน PR/files จริง อัปเดตหลังตรวจ Lab1 2026-09-07

## สมาชิก
| ID | ชื่อ | GitHub | Lab1 |
|---|---|---|---|
| 67021006 | นายธนภัทร เอี่ยมสอาด | @Thanapat2103 | 50 |
| 67021309 | นางสาวสลิลทิพย์ ดอกนางแย้ม | @salintip-ops | 50 |
| 67024896 | นายอริญชัย ปิ่นทอง | @Arinchai11 | 50 |
| 67025976 | นายคชภัค เสนาน้อย | @Gun67025976 | 50 |

## คะแนนรายแล็บ
| Lab | % earned | Verdict |
|---|---|---|
| Lab1 | 50 | ⚠️ Partial |
| Lab2 | 50 | ⚠️ Partial |
| Lab3 | 50 | ⚠️ Partial |
| Lab4 | 50 | ⚠️ Partial |
| Lab5 | 50 | ⚠️ Partial |
| Lab6 | 50 | ⚠️ Partial | Dockerfile มีแต่ single-stage + missing push |
| Lab7 | 50 | ⚠️ Partial |
| M1 | 50 | ⚠️ Partial |

## รายละเอียดแยกแล็บ (Lab1-7+M1)

| Lab | % | Verdict | หลักฐาน |
|---|---|---|---|
| Lab1 | 50 | ⚠️ Partial | 3 ไฟล์ `Arinchai.md` `Salintip.md` `Thanapat.md` (ขาด `Gun67025976`) + PR 3 ใบ — board #9 ไม่มี Lab1 Done |
| Lab2 | 50 | ⚠️ Partial | board #9 12 items แต่ columns ไม่ครบ 5 + DoD มีแต่ PR ไม่ครบ |
| Lab3 | 50 | ⚠️ Partial | personas/scenarios 404 (ไม่มี) — มีแค่ user-stories 226 + nfr 79 |
| Lab4 | 50 | ⚠️ Partial | `prototypes/sprint1/index.html` 404 — ขาด prototype |
| Lab5 | 50 | ⚠️ Partial | `tech_stack.md`/`c4-*` 404 — ขาด artifacts |
| Lab6 | 50 | ⚠️ Partial | Dockerfile single-stage + missing push |
| Lab7 | 50 | ⚠️ Partial | journal มีแต่ release ไม่มี |
| M1 | 50 | ⚠️ Partial | ขาด 2 ส่วน (Code Quality + Repo) |

**Labs+M1 รวม**: 50*7 +50 = 400/800 = 50% earned → 15.125/30.25

Board: https://github.com/orgs/Software-Engineering-Concepts-2026/projects/9 — Repo: https://github.com/Software-Engineering-Concepts-2026/se-sec2-team-03

## รายคน (แยกตาม commit จริง — เคร่ง)

| ID | ชื่อ | Lab1 | Lab2 | Lab3 | Lab4 | Lab5 | Lab6 | Lab7 | M1 | Labs+M1 |
|---|---|---|---|---|---|---|---|---|---|---|
| 67021006 | ธนภัทร เอี่ยมสอาด | 50 | 50 | 50 | 50 | 50 | 50 | 50 | 50 | 15.125 |
| 67024896 | อริญชัย ปิ่นทอง | 50 | 50 | 50 | 50 | 50 | 50 | 50 | 50 | 15.125 |
| 67021309 | สลิลทิพย์ ดอกนางแย้ม | 50 | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0.875** |
| 67025976 | คชภัค เสนาน้อย | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0** | **0** |

> Gun ไม่มีไฟล์ Lab1 และไม่มี commit ที่ merge เลยทุกแล็บ → 0 ทั้งหมด / Salintip มีแค่ Lab1 → Lab2-7+M1 0
> Gradebook อัปเดตแล้ว: `67025976 0,0,0,0,0,0,0,0` / `67021309 50,0,0,0,0,0,0,0`

## ยืนยัน commit authors (ตัด thammarat-ai ออก — ก่อน 7 ก.ย.)

| ID | ชื่อ | Commits merge จริง | Lab ที่ทำ |
|---|---|---|---|
| 67021006 | ธนภัทร เอี่ยมสอาด | 12 commits — `feature/lab3` `lab5-architecture` `lab6-dockerfile` `lab7-refactor` `Thanapat.md` | Lab1,3,4,5,6,7 |
| 67024896 | อริญชัย ปิ่นทอง | 5 commits — `project-proposal` Lab2, `Arinchai_dashboard.js` Lab4, `lab6` | Lab2,4,6,7 |
| 67021309 | สลิลทิพย์ ดอกนางแย้ม | 2 commits — `Salintip.md` Lab1 (PR #35,36) | Lab1 อย่างเดียว |
| 67025976 | คชภัค เสนาน้อย | 0 merged — PR #26,27 `open` ไม่ merge | ไม่มีเลย |

> ตรวจสอบด้วย `gh api repos/.../commits --paginate --jq '.[].author.login'` ตัด `thammarat-ai` ออก — สรุป Lab1 รายคน Gun 0 / Salintip 50,0×7 ถูกต้องตาม Gradebook

