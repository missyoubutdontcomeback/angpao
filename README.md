# TrueMoney Voucher API

API สำหรับรับซองอั่งเปา TrueMoney โดยระบบอื่นสามารถเรียกใช้งานผ่าน HTTP API

## การติดตั้ง

```bash
npm install
```

## การรัน API Server

```bash
npm start
```

Server จะรันที่ `http://localhost:3000`

## API Endpoint

### POST /api/redeem
รับซองอั่งเปา TrueMoney

**Request Body:**
```json
{
  "phone": "0812345678",
  "voucher": "ABCDEFG123"
}
```

หรือส่งลิงก์เต็มก็ได้:
```json
{
  "phone": "0812345678",
  "voucher": "https://gift.truemoney.com/campaign/?v=ABCDEFG123"
}
```

**Response (สำเร็จ):**
```json
{
  "success": true,
  "code": "SUCCESS",
  "message": "ได้รับเงิน 10 บาท",
  "amount": 10
}
```

**Response (ผิดพลาด):**
```json
{
  "success": false,
  "code": "INVALID_INPUT",
  "message": "ข้อมูลไม่ถูกต้อง"
}
```

## ตัวอย่างการเรียกใช้งาน

### cURL
```bash
curl -X POST http://localhost:3000/api/redeem \
  -H "Content-Type: application/json" \
  -d "{\"phone\":\"0812345678\",\"voucher\":\"ABCDEFG123\"}"
```

### JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/redeem', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: '0812345678',
    voucher: 'ABCDEFG123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

### PHP
```php
$data = [
    'phone' => '0812345678',
    'voucher' => 'ABCDEFG123'
];

$ch = curl_init('http://localhost:3000/api/redeem');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
print_r($result);
```

## สำหรับทีมพัฒนาระบบอื่น

ระบบของคุณสามารถ:
1. **จัดเก็บเบอร์โทรในฐานข้อมูลของคุณเอง**
2. **เรียก API นี้เมื่อต้องการรับซอง** โดยส่ง `phone` และ `voucher` มาใน request body
3. **รับผลลัพธ์กลับไป** เพื่อบันทึกในระบบของคุณ

API นี้ไม่ได้เก็บข้อมูลเบอร์โทรใดๆ ทั้งสิ้น คุณต้องจัดการเบอร์ในระบบของคุณเอง

## การตั้งค่า Port

ถ้าต้องการเปลี่ยน port สามารถตั้งค่าผ่าน environment variable:

```bash
PORT=8080 npm start
```

## Error Codes

- `MISSING_PARAMS` - ไม่ได้ส่ง phone หรือ voucher
- `INVALID_INPUT` - ข้อมูลไม่ถูกต้อง (เบอร์หรือ voucher code)
- `ERROR` - เกิดข้อผิดพลาดในการรับซอง
- `SERVER_ERROR` - เกิดข้อผิดพลาดในระบบ
