import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { earnings } from "./datasets/earnings";
import { hpi } from "./datasets/hpi";
import { lifeExpectancyFemale } from "./datasets/life_expectancy_female";
import { lifeExpectancyMale } from "./datasets/life_expectancy_male";
import { netInternalMigration } from "./datasets/net_internal_migration";
import { population } from "./datasets/population";
import { pubsAndBars } from "./datasets/pubs_and_bars";

// Vuetify
// TODO: https://next.vuetifyjs.com/en/features/icon-fonts/#material-design-icons-js-svg
// TODO: https://next.vuetifyjs.com/en/styles/colors/#sass-color-pack
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { createVuetify } from "vuetify";

const customLightTheme = {
  dark: false,
  colors: {
    primary: "#00796B",
    "primary-darken-1": "#004D40",
    secondary: "#FFFFFF",
    surface: "#F5F5F5",
    background: "#EEEEEE",
  },
};
const customDarkTheme = {
  dark: true,
  colors: {
    primary: "#00796B",
    "primary-darken-1": "#004D40",
    secondary: "#292929",
    background: "#404045",
  },
};

const app = createApp(App);
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: customLightTheme,
      dark: customDarkTheme,
    },
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
  population,
  netInternalMigration,
  pubsAndBars,
  lifeExpectancyFemale,
  lifeExpectancyMale,
]);

app.use(pinia);
app.use(vuetify);
app.mount("#app");
