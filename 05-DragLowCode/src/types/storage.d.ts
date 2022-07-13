let storageKey = ['userInfo', 'currentPosition'] as const;
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
  storageKey,
  sessionStorageValue,
  localStorageValue,
  getLocalStorage
};
