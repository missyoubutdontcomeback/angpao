# Deploy ไปยัง Vercel

## ขั้นตอนการ Deploy

### 1. ติดตั้ง Vercel CLI (ถ้ายังไม่มี)

```bash
npm install -g vercel
```

### 2. Login เข้า Vercel

```bash
vercel login
```

ระบบจะเปิดเบราว์เซอร์ให้ล็อกอิน (ใช้ GitHub, GitLab, หรือ Email)

### 3. Deploy โปรเจค

อยู่ในโฟลเดอร์โปรเจค แล้วรันคำสั่ง:

```bash
vercel
```

ตอบคำถาม:
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → เลือก account ของคุณ
- **Link to existing project?** → `N` (No)
- **What's your project's name?** → ตั้งชื่อโปรเจค เช่น `tmn-voucher-api`
- **In which directory is your code located?** → `./` (กด Enter)

รอสักครู่ ระบบจะ deploy ให้อัตโนมัติ!

### 4. ได้ URL แล้ว!

หลัง deploy เสร็จ จะได้ URL ประมาณนี้:
```
https://tmn-voucher-api.vercel.app
```

### 5. ทดสอบ API

```bash
curl -X POST https://tmn-voucher-api.vercel.app/api/redeem \
  -H "Content-Type: application/json" \
  -d "{\"phone\":\"0812345678\",\"voucher\":\"ABCDEFG123\"}"
```

## Update โปรเจค

เมื่อแก้ไขโค้ดเสร็จ ให้รัน:

```bash
vercel --prod
```

จะ deploy เวอร์ชันใหม่ทับของเดิม

## Deploy ผ่าน GitHub (แนะนำ)

### 1. Push โค้ดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### 2. เชื่อม GitHub กับ Vercel

1. เข้า [vercel.com](https://vercel.com)
2. คลิก **"Add New Project"**
3. เลือก **Import Git Repository**
4. เลือก repository ของคุณ
5. คลิก **Deploy**

**ข้อดี:** ทุกครั้งที่ push โค้ดขึ้น GitHub จะ auto deploy ให้อัตโนมัติ! 🚀

## ตั้งค่า Environment Variables (ถ้ามี)

ถ้าต้องการเก็บค่า secret:

1. เข้า Vercel Dashboard
2. เลือกโปรเจค
3. ไปที่ **Settings** → **Environment Variables**
4. เพิ่มตัวแปรที่ต้องการ

## จัดการ Domain

อยากใช้ domain ของตัวเอง:

1. เข้า Vercel Dashboard
2. เลือกโปรเจค → **Settings** → **Domains**
3. เพิ่ม domain ที่ต้องการ
4. ตั้งค่า DNS ตามที่ Vercel บอก

## Logs และ Monitoring

ดู logs:
```bash
vercel logs
```

หรือดูใน Vercel Dashboard:
- **Deployments** → เลือก deployment → **View Function Logs**

## ลบโปรเจค

```bash
vercel remove PROJECT-NAME
```

หรือลบใน Vercel Dashboard → **Settings** → **Delete**

## ปัญหาที่พบบ่อย

### API ไม่ทำงาน
- ตรวจสอบ logs: `vercel logs`
- ดูว่า dependencies ครบไหมใน package.json

### Timeout
- Vercel free plan มี timeout 10 วินาที
- ถ้าเกินต้องอัพเกรด plan

### Cold Start
- Request แรกอาจช้า (serverless function ต้อง start)
- Request ถัดไปจะเร็วขึ้น

## ตัวอย่าง URL หลัง Deploy

**Production URL:**
```
https://tmn-voucher-api.vercel.app/api/redeem
```

**Preview URL (แต่ละ commit):**
```
https://tmn-voucher-api-git-branch-name-username.vercel.app/api/redeem
```

---

**เสร็จแล้ว!** API ของคุณพร้อมใช้งาน 24/7 บน Vercel ฟรี 🎉
