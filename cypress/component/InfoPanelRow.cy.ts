/// <reference types="cypress" />

import InfoPanelRow from "../../src/components/InfoPanelRow.vue";

describe("<InfoPanelRow />", () => {
  const testProps = {
    year: 2021,
    value: 25000,
    changeFromLastYear: 5,
    isSelectedRow: false,
  };

  it("displays correct values", () => {
    cy.mount(InfoPanelRow, { props: testProps });
    cy.get('[data-cy="year"]').should("have.text", "2021");
    cy.get('[data-cy="value"]').should("have.text", "25000");
    cy.get('[data-cy="change"]').should("contain.text", "5%");
  });

  it("uses correct icon and text colour based on the value of change from last year", () => {
    cy.mount(InfoPanelRow, { props: testProps });
    cy.get('[data-cy="change"]').should("have.class", "text-green");
    cy.get('[data-cy="change-icon"]').should(
      "have.attr",
      "icon",
      "mdi-arrow-up-thin",
    );

    cy.mount(InfoPanelRow, { props: { ...testProps, changeFromLastYear: -3 } });
    cy.get('[data-cy="change"]').should("have.class", "text-red");
    cy.get('[data-cy="change-icon"]').should(
      "have.attr",
      "icon",
      "mdi-arrow-down-thin",
    );
  });

  it("displays chevron icon when the row is selected", () => {
    cy.mount(InfoPanelRow, { props: { ...testProps, isSelectedRow: true } });
    cy.get('[data-cy="select-icon"]').should(
      "have.attr",
      "icon",
      "mdi-chevron-right",
    );
  });
});
