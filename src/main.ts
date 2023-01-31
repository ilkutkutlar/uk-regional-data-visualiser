import { createApp } from "vue";
import { createPinia } from "pinia";
import { earnings } from "./datasets/earnings";
import { hpi } from "./datasets/hpi";
import { gdhi } from "./datasets/gdhi";
import { population } from "./datasets/population";
import { netInternalMigration } from "./datasets/net_internal_migration";
import { pubsAndBars } from "./datasets/pubs_and_bars";
import App from "./App.vue";

import "./assets/main.css";
import "./assets/bootstrap.min.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
// TODO: https://next.vuetifyjs.com/en/features/icon-fonts/#material-design-icons-js-svg
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

app.provide("allDatasets", [
  earnings,
  hpi,
  gdhi,
  population,
  netInternalMigration,
  pubsAndBars,
]);

app.use(pinia);
app.use(vuetify);
app.mount("#app");
