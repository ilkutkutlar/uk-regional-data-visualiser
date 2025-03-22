/// <reference types="cypress" />

import { createPinia, setActivePinia } from "pinia";
import DataSelectionBar from "../../src/components/DataSelectionBar.vue";

describe("<DataSelectionBar />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders", () => {
    cy.mount(DataSelectionBar);
  });

  it("correctly displays selected dataset and year", () => {
    cy.mount(DataSelectionBar);
    cy.get("#bottom-card").contains("Median earnings | 2021");
  });
});
