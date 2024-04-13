import CryptoJS from "crypto-js";

const secretKey = "SuperSecretKey";

export function encryptString(text) {
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encodeURIComponent(encryptedText);
}

export function decryptString(encryptedText) {
  const decryptedText = decodeURIComponent(encryptedText);
  const bytes = CryptoJS.AES.decrypt(decryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function encryptNumber(number) {
  const text = number.toString();
  const encryptedText = CryptoJS.AES.encrypt(text, secretKey).toString();
  return encodeURIComponent(encryptedText);
}

export function decryptNumber(encryptedText) {
  const decryptedText = decodeURIComponent(encryptedText);
  const bytes = CryptoJS.AES.decrypt(decryptedText, secretKey);
  return parseInt(bytes.toString(CryptoJS.enc.Utf8));
}
