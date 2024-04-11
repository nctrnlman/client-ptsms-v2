import CryptoJS from "crypto-js";

const secretKey = "SuperSecretKey";

export function encryptString(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decryptString(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptNumber(number) {
  const text = number.toString();
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

export function decryptNumber(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return parseInt(decryptedText);
}
