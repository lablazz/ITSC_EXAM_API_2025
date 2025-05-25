# ITSC_EXAM_API_2024
จงพัฒนา Web API ตาม Requirement ดังต่อไปนี้
<br>
## Technical Requirement <br>
1 พัฒนา Web API ตาม Stack ในปัจจุบันใดก็ได้ที่ตัวเองถนัดที่สุด และใช้ ฐานข้อมูลชนิดใด ก็ได้ไม่ว่าจะเป็น SQL หรือ NoSQL <br>
2 Web API ต้องพัฒนาให้อยู่ในรูปแบบของ REST API ตาม Spec OpenAPI Specification ในปัจจุบัน<br>
3 จงกำหนดค่าตัวแปร ของ Application ด้วย file ENV  และ gitignore  (10 คะแนน) <br>
4 จงเขียน Dockerfile และ เลือกใช้ Base Image ที่เหมาะสมและ กิน resource น้อย (10 คะแนน)<br>
5 จงเขียน Docker-compose เพื่อ Run ระบบ โดย กำหนดให้ Web API  Run ที่Port  8080  (10 คะแนน)<br>
6 เมื่อ Login แล้ว ให้สร้าง JWT token สำหรับ User  ในการทำ api Authentication and Authorization ของ API ที่ Required การauthentication and authorization <br>
<br>

## Optional Technical Requirement คะแนนพิเศษเพิ่มจากคะแนนเต็มซึ่งไม่ทำก็ได้<br>
1 Web API มีโครงสร้าง Code รองรับการ Run Automate Test   บน CI/CD และ Database เป็น Inmemmory เมื่อ กำหนด ตัวแปร ENV RunMode = test<br>
2 ใช้ Code First ในการพัฒนา และ มีการทำ Database Migration<br>
<br>

## Business Requirement <br>
1 มหาวิทยาลัยเชียงใหม่มีความต้องการที่จะพัฒนาระบบ ลงทะเบียนสมัครเป็นพนักงานมหาวิทยาลัย จงพัฒนา Web API ตามความต้องการดังต่อไปนี้<br>
2 มีFunction ลงทะเบียน Create User Account (API Create User)   (10 คะแนน) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.1 Function Create User Account  มี Data ที่ต้องกรอกคือ<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Email(คือ User account ไม่สามารถซ้ำได้ แต่ไม่ใช่ Primary Key)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ชื่อ<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- นาม สกุล <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เลขบัตรประชาชน (Optional เข้ารหัสด้วย Symmetric Encryption ได้คะแนนพิเศษ)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เบอร์โทร(Optional เข้ารหัสด้วย Symmetric Encryption ได้คะแนนพิเศษ)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Password (Optional เข้ารหัสด้วย Hashing Encryption ได้คะแนนพิเศษ)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ConfirmPassword (Optional เข้ารหัสด้วย Hashing Encryption ได้คะแนนพิเศษ)<br>
3 มีFunction User Login (API User Login)  (10 คะแนน)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.1 User สามารถ login ด้วย User(Email) และ Password<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.2 API return User Basic Info คือ Email,ชื่อ, นาม สกุล, อยู่ใน Payload ของ JWT Token<br>

4 มี Function แสดง ประวัติผู้สมัคร (API Get User All data)( API request JWT สำหรับ Authentication and Authorization )  (10 คะแนน) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4.1 Data ที่ต้อง Return <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Email(คือ User account ไม่สามารถซ้ำได้ แต่ไม่ใช่ Primary Key)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ชื่อ<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- นาม สกุล <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- รูปผู้สมัคร <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เลขบัตรประชาชน <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เบอร์โทร<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Skill (List<String>)   <br>

5 มี Function แก้ไข ประวัติผู้สมัคร (API Update User All data)( API request JWT สำหรับ Authentication and Authorization )  (10 คะแนน) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.1 Data ที่ต้อง แก้ไขได้ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-Email(คือ User account ไม่สามารถซ้ำได้ แต่ไม่ใช่ Primary Key)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ชื่อ<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- นาม สกุล <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- รูปผู้สมัคร <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เลขบัตรประชาชน <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- เบอร์โทร<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Skill (List<String>)   <br>

6 มี Function ดูรายการผู้สมัคร ของ Admin (API Admin Search User List)) (API Authentication ด้วยการ  Basic Authentication  กำหนด ตัวแปร User & password นี้ที่ ENV)  (10 คะแนน) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.1 สามารถค้นหา ได้ทั้ง ชื่อและ นามสกุล <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.2 Data Return Userr List<UserAccount> <br>

7 มี Function delete ผู้สมัคร ของ Admin (API Admin delete User )) (API Authentication ด้วยการ  Basic Authentication กำหนด ตัวแปร User & password นี้ที่ ENV)  (10 คะแนน) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.1 Admin สามารถ select เลือกลบ user account  ได้หลายคนพร้อมกัน<UserAccount> <br>


