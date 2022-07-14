const storageKey = ['userInfo', 'currentPosition'] as const;
type StorageKeyType = typeof storageKey[number];
// session 值类型
interface SessionStorageValue {
  value: any;
}

// local 值类型
interface LocalStorageValue {
  value: any;
  expirationT: number;
}

// local 提取函数，返回值类型
interface GetLocalStorage<T = any> {
  value: T;
  msg: string;
  status: 0 | 1;
}

export type {
  StorageKeyType,
  SessionStorageValue,
  LocalStorageValue,
  GetLocalStorage
};
