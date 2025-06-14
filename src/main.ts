import App from "@/App.vue";
import { createApp } from "vue";
import RegionsMap from "vue-geojson-regions-map";

import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiArrowDownThin,
  mdiArrowUpThin,
  mdiCardTextOutline,
  mdiChevronRight,
  mdiClose,
  mdiLandFields,
  mdiLicense,
  mdiLinkVariant,
  mdiMagnify,
  mdiMinus,
  mdiTune,
  mdiWeatherNight,
  mdiWeatherSunny,
} from "@mdi/js";
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
    aliases: {
      ...aliases,
      cardText: mdiCardTextOutline,
      linkVariant: mdiLinkVariant,
      landFields: mdiLandFields,
      magnify: mdiMagnify,
      tune: mdiTune,
      close: mdiClose,
      chevronRight: mdiChevronRight,
      minus: mdiMinus,
      arrowUpThin: mdiArrowUpThin,
      arrowDownThin: mdiArrowDownThin,
      license: mdiLicense,
      weatherNight: mdiWeatherNight,
      weatherSunny: mdiWeatherSunny,
    },
    sets: {
      mdi,
    },
  },
});

app.use(vuetify);
app.use(RegionsMap);
app.mount("#app");
