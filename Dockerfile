# ใช้ Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิดพอร์ต
EXPOSE 3000

# คำสั่งรันโปรแกรม
CMD ["node", "server.js"]
