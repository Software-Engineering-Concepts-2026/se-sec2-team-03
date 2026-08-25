# Stats Service - Docker

## Image

thanapat2103/stats-service-api:v0.1.0

## Base Image

python:3.12-slim

## Image Size

ตรวจสอบด้วยคำสั่ง:

docker images

## Build

```bash
docker build -t thanapat2103/stats-service-api:v0.1.0 .
```

## Run

```bash
docker run --rm -p 8000:8000 thanapat2103/stats-service-api:v0.1.0

เปิดดู API ได้ที่:

http://localhost:8000/docs

## Environment Variables

## Note

ตอนสร้าง Docker Image ให้ไปอยู่ที่ directory: "d:\se-sec2-team-03\services\stats-service" นะครับ

ตอนนี้ไม่มี Environment Variable ที่จำเป็น

หากมี Database ในอนาคต สามารถส่ง Environment Variable ผ่าน Docker ได้ เช่น:

docker run --rm -p 8000:8000 -e DATABASE_URL="..." thanapat2103/stats-service-api:v0.1.0
    
## Why Container?

เลือกใช้ Container เพราะช่วยให้ Application และ Dependencies สามารถทำงานใน Environment เดียวกัน ทำให้ Build, Test และ Deploy ได้ง่ายขึ้น และสามารถนำ Image เดียวกันไปใช้งานในเครื่องอื่นได้

Why Not VM?

ไม่ใช้ VM เพราะต้องใช้ Operating System เต็มรูปแบบและใช้ Resource มากกว่า Container ในขณะที่ Container มีขนาดเล็กกว่าและ Start ได้เร็วกว่า

Security

Container ทำงานด้วย User ที่ไม่ใช่ root เพื่อเพิ่มความปลอดภัย

ใช้ .dockerignore เพื่อไม่ให้ไฟล์ที่ไม่จำเป็น เช่น .env, .git และไฟล์ Log ถูกนำเข้า Docker Image

Registry

Docker Hub:

thanapat2103/stats-service-api

Tag:

v0.1.0