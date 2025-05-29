const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32); // ต้องเก็บ key ใน .env
const iv = Buffer.alloc(16, 0); // Initialization vector แบบคงที่ (ควรทำให้เปลี่ยนได้)

function encryptPhone(phone) {
  if (!phone) return null;
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(phone, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptPhone(encryptedPhone) {
  if (!encryptedPhone) return null;
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPhone, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptPhone, decryptPhone };
