const storageKey = ['userInfo', 'currentPosition'] as const;
type storageKeyType = typeof storageKey[number];
interface sessionStorageValue {
  value: any;
}

interface localStorageValue {
  value: any;
  expirationT: number;
}

interface getLocalStorage<T = any> {
  value: T;
  msg: string;
  status: 0 | 1;
}

export type {
  storageKeyType,
  sessionStorageValue,
  localStorageValue,
  getLocalStorage
};
