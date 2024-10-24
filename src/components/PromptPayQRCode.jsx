import React from "react";
import QRCode from "react-qr-code";

const generatePromptPayPayload = (phoneNumber, amount) => {
    const formattedPhoneNumber = phoneNumber.replace(/^0/, "66"); // แปลง 0 เป็น 66 (รหัสประเทศไทย)
  
    // สร้าง Payload
    const payload = [
      "000201", // Payload format indicator
      "010212", // Point of initiation method
      "29370016A00000067701011101130066" + formattedPhoneNumber, // PromptPay ID + หมายเลขโทรศัพท์
      "5802TH", // ประเทศไทย (THB)
      "5303764", // Country code (ไทย)
      amount ? `540${(amount * 100).toString().padStart(10, "0")}` : "", // จำนวนเงิน (ในหน่วยสตางค์)
      "6304", // Checksum (จะคำนวณในขั้นสุดท้าย)
    ].join("");
  
    // คำนวณ CRC
    const crc = calculateCRC16(payload);
    return payload.slice(0, -4) + crc; // คืนค่า Payload โดยไม่รวม Checksum ก่อนคำนวณ
  };
  
  // ฟังก์ชันสำหรับคำนวณ CRC
  const calculateCRC16 = (payload) => {
    const polynomial = 0x1021; // CRC-16-CCITT Polynomial
    let crc = 0xFFFF; // Initial CRC value
  
    for (let i = 0; i < payload.length; i++) {
      let byte = payload.charCodeAt(i); // แปลงตัวอักษรเป็นรหัส ASCII
      crc ^= (byte << 8); // XOR ตัวอักษรกับ CRC
  
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ polynomial; // ถ้า MSB เป็น 1 ทำการ XOR กับ polynomial
        } else {
          crc <<= 1; // ถ้า MSB เป็น 0 shift ซ้าย 1 ตำแหน่ง
        }
      }
    }
  
    crc &= 0xFFFF; // จำกัดขนาด CRC ให้เป็น 16 บิต
    return crc.toString(16).toUpperCase().padStart(4, "0"); // ส่งค่า CRC ในรูปแบบเลขฐาน 16
  };
  
  // Component สำหรับสร้าง QR Code
  const PromptPayQRCode = ({ phoneNumber, amount }) => {
    const qrCodeData = generatePromptPayPayload(phoneNumber, amount);
  
    return (
      <div className="w-[100%] flex justify-center items-center">
        <QRCode value={qrCodeData} size={256} /> {/* แสดง QR Code */}
      </div>
    );
  };
  
  export default PromptPayQRCode;
