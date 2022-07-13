/*  storage 存储
------------------------------------------------ */
import DataCrypto from './crypto';
import {
  storageKey,
  getLocalStorage,
  localStorageValue,
  sessionStorageValue
} from '@/types/storage';
const cryptoData = new DataCrypto();

export default class StorageUtils {
  private jointStorageKey(key: typeof storageKey[number]) {
    return `${process.env.VUE_APP_TITLE}__${key}`;
  }

  /*  储存数据
  ------------------------------------------------ */
  public setSession(key: typeof storageKey[number], value: any) {
    const storageValue = {
      value
    };
    sessionStorage.setItem(
      this.jointStorageKey(key),
      cryptoData.Encrypt(storageValue, true)
    );
  }

  public setLocal(key: typeof storageKey[number], value: any, expire: number) {
    const storageValue = {
      value,
      expirationT: Date.now() + Math.floor(expire) * 60000
    };
    localStorage.setItem(
      this.jointStorageKey(key),
      cryptoData.Encrypt(storageValue, true)
    );
  }

  /*  获取数据
  ------------------------------------------------ */
  public getSession(key: typeof storageKey[number]) {
    const value = sessionStorage.getItem(this.jointStorageKey(key));
    return cryptoData.Decrypt<sessionStorageValue>(value, true);
  }

  public getLocal(key: typeof storageKey[number]): getLocalStorage {
    if (localStorage.getItem(this.jointStorageKey(key))) {
      const value = localStorage.getItem(this.jointStorageKey(key));
      const decryptVal = cryptoData.Decrypt<localStorageValue>(value, true);
      if (decryptVal.expirationT > Date.now()) {
        return {
          value: decryptVal.value,
          status: 1,
          msg: '获取成功！'
        };
      } else {
        localStorage.removeItem(this.jointStorageKey(key));
        return {
          value: '',
          status: 0,
          msg: '数据过期，已删除！'
        };
      }
    } else {
      return {
        value: '',
        status: 0,
        msg: '未找到指定 session 数据！'
      };
    }
  }

  /*  清除指定数据
  ------------------------------------------------ */
  public removeLocal(key: typeof storageKey[number]) {
    localStorage.removeItem(key);
  }

  public removeSession(key: typeof storageKey[number]) {
    sessionStorage.removeItem(key);
  }
}
