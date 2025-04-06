/* eslint-disable @typescript-eslint/no-namespace */
import "./commands";
import { mount } from "cypress/vue";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

// import { h } from "vue";
// import { VApp } from "vuetify/components";
// // import Vuetify from "vuetify";
// import { createVuetify } from 'vuetify'

// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// // We recommend that you pull this out
// // into a constants file that you share with
// // your main.js file.
// const vuetifyOptions = {};

// Cypress.Commands.add("mount", (component, ...args) => {
//   args.global = args.global || {};
//   args.global.plugins = args.global.plugins || [];

//   const vuetify = createVuetify({
//     components,
//     directives,
//   })
//   args.global.plugins.push(vuetify);

//   return mount(
//     () => {
//       return h(VApp, {}, component);
//     },
//     ...args,
//   );
// });
Cypress.Commands.add("mount", mount);
