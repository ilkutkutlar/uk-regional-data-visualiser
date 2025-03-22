/// <reference types="cypress" />

import { createPinia, setActivePinia } from "pinia";
import KeyWindow from "../../src/components/InfoPanel.vue";

describe("<InfoPanel />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders", () => {
    cy.mount(KeyWindow);
  });
});
