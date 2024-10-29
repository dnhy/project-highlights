export interface StorageObj {
  [idx: string]: string;
}

export interface LocalStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, val: string) => void;
  getStorage: (namespace: string) => StorageObj;
  removeItem: (key: string) => void;
  clear: () => void;
}
