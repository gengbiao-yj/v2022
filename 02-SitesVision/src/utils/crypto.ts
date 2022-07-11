/*  数据加密
------------------------------------------------ */
import CryptoJS from 'crypto-js';

class DataCrypto {
  private key = CryptoJS.enc.Utf8.parse('123456789asdfghj'); // 十六位十六进制数作为密钥
  private iv = CryptoJS.enc.Utf8.parse('asdfghj123456789'); // 十六位十六进制数作为密钥偏移量
  // 加密
  public Encrypt(value: any, isObj = true) {
    const srcs = CryptoJS.enc.Utf8.parse(isObj ? JSON.stringify(value) : value);
    const encrypted = CryptoJS.AES.encrypt(srcs, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString().toUpperCase();
  }

  // 解密
  public Decrypt<T>(cryptValue: any, isObj = true): T {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(cryptValue);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, this.key, {
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    const value = decryptedStr.toString();
    return isObj ? JSON.parse(value) : value;
  }
}

export default DataCrypto;
