import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import localstorage, { mountStorageToGloabal } from "./utils/localstorage";

const app = createApp(App);

mountStorageToGloabal(app, localstorage);

app.use(store).use(router).use(ElementPlus).mount("#app");
