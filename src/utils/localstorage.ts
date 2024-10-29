import config from "@/config";
import type { LocalStorage } from "./types";
import type { App } from "vue";

const { namespace } = config;

const MylocalStorage: LocalStorage = {
  getItem(key: string) {
    const storage = this.getStorage(namespace);
    return storage[key];
  },
  setItem(key: string, val: string) {
    const storage = this.getStorage(namespace);
    storage[key] = val;
    window.localStorage.setItem(namespace, JSON.stringify(storage));
  },

  getStorage(namespace: string) {
    return JSON.parse(window.localStorage.getItem(namespace) || "{}");
  },

  removeItem(key: string) {
    const storage = this.getStorage(namespace);
    delete storage[key];
    window.localStorage.setItem(namespace, JSON.stringify(storage));
  },

  clear() {
    window.localStorage.removeItem(namespace);
  },
};

export default MylocalStorage;

export function mountStorageToGloabal(
  app: App<Element>,
  localstorage: LocalStorage,
) {
  app.config.globalProperties.$localstorage = localstorage;
}
