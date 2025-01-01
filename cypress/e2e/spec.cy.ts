/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:5173");
});

describe("Data Details Panel", () => {
  it("displays the correct dataset", () => {
    cy.get("#dataset-select")
      .parent()
      .contains("Median earnings")
      .should("exist");
  });

  it("displays the correct dataset year", () => {
    cy.get("#dataset-year-select").parent().contains("2021").should("exist");
  });

  it("toggles navigation drawer when the icon is clicked", () => {
    cy.get(".v-navigation-drawer").should("be.visible");
    cy.get("#drawer-toggle-button").click();
    cy.get(".v-navigation-drawer").should("not.be.visible");
    cy.get("#drawer-toggle-button").click();
    cy.get(".v-navigation-drawer").should("be.visible");
  });

  it("closes navigation drawer when the close button is clicked", () => {
    cy.get(".v-navigation-drawer").should("be.visible");
    cy.get("button#close-drawer-button").click();
    cy.get(".v-navigation-drawer").should("not.be.visible");
  });


  it("displays the dataset metadata tab", () => {
    cy.get("div.v-card").contains("Description").should("be.visible");
    cy.get(".v-window-item#metadata-window-item").should("be.visible");
    cy.get(".v-window-item#data-window-item").should("not.be.visible");
  });

  it("switches to the data tab when clicked", () => {
    cy.contains("span", "Data").click();
    cy.get(".v-window-item#data-window-item").should("be.visible");
    cy.get('input[placeholder="Search data..."]').should("be.visible");
  });

  describe("Data tab", () => {
    beforeEach(() => {
      cy.contains("span", "Data").click();
    });

    it("filters data when searched for it", () => {
      cy.get('input[placeholder="Search data..."]').type("Manchester");
      cy.get(".v-window-item tbody").children().should("have.length", 1);
      cy.get(".v-window-item tbody tr")
        .eq(0)
        .contains("Manchester")
        .should("be.visible");
    });
  });
});
