/// <reference types="cypress" />

import { createPinia, setActivePinia } from "pinia";
import InfoPanel from "../../src/components/InfoPanel.vue";

describe("<InfoPanel />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders", () => {
    cy.mount(InfoPanel);
  });

  it("", () => {});
});
