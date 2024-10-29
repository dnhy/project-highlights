import {
  type ComponentInternalInstance,
  type ComponentPublicInstance,
  getCurrentInstance,
} from "vue";
import type { LocalStorage } from "@/utils/types";

interface MyComponentPublicInstance extends ComponentPublicInstance {
  $localstorage?: LocalStorage;
}

interface MyComponentInternalInstance extends ComponentInternalInstance {
  proxy: MyComponentPublicInstance;
}
export function useInstance() {
  return getCurrentInstance() as MyComponentInternalInstance;
}

// export function useInstance(): { proxy: ProxyType } {
//   return getCurrentInstance() as ComponentInternalInstance;
// }
