import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";

const emitter = mitt();
const app = createApp(App);

for (const m of Object.values(
  import.meta.glob("./modules/*.js", { eager: true })
)) {
  m.install?.(app);
}
app.config.globalProperties.emitter = emitter;
app.mount("#app");
