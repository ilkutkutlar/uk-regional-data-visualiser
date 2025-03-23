/// <reference types="cypress" />

const assertInfoPanelDisplaysManchester = () => {
  cy.get("#info-panel-root .v-card-title .v-col-10").should(
    "contain.text",
    "Manchester",
  );
  cy.get("#info-panel-root .v-card-text table tbody").should(
    "contain.text",
    "£23,003",
  );
};

const typeInRegionSearchBox = (query: string) => {
  cy.get('input[placeholder="Search data..."]').type(query);
};

describe("Data details panel", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("displays the correct dataset", () => {
    cy.get("#dataset-select")
      .parent()
      .contains("Median earnings")
      .should("exist");
  });

  it("displays the correct dataset year", () => {
    cy.get("#dataset-year-select").parent().contains("2021").should("exist");
  });

  it("toggles data details drawer when the hamburger icon is clicked", () => {
    cy.get(".v-navigation-drawer").should("be.visible");
    cy.get("#drawer-toggle-button").click();
    cy.get(".v-navigation-drawer").should("not.be.visible");
    cy.get("#drawer-toggle-button").click();
    cy.get(".v-navigation-drawer").should("be.visible");
  });

  it("closes data details drawer when the close button is clicked", () => {
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

    it("filters regions matching a query when typed into the search textbox", () => {
      typeInRegionSearchBox("Manchester");
      cy.get(".v-window-item tbody").children().should("have.length", 1);
      cy.get(".v-window-item tbody tr")
        .eq(0)
        .contains("Manchester")
        .should("be.visible");
    });

    it("displays region info on the info panel when a region row is clicked on the table", () => {
      typeInRegionSearchBox("Manchester");
      cy.get(".v-window-item tbody tr").eq(0).click();
      assertInfoPanelDisplaysManchester();
    });

    it("highlights the selected row on the table when a region row is clicked on the table", () => {
      typeInRegionSearchBox("Manchester");
      cy.get(".v-window-item tbody tr").eq(0).click();
      cy.get(".v-window-item tbody tr").eq(0).should("have.class", "selected");
    });

    it("displays region info on the info panel when a region row is hovered over on the table", () => {
      typeInRegionSearchBox("Manchester");
      cy.get(".v-window-item tbody tr").eq(0).trigger("mouseenter");
      assertInfoPanelDisplaysManchester();
    });

    it("hides the info panel and unhighlights the region row when the close button is clicked on the info panel", () => {
      typeInRegionSearchBox("Manchester");
      cy.get(".v-window-item tbody tr").eq(0).click();
      cy.get("#info-panel-root").should("be.visible");
      cy.get("#info-panel-root .v-card-title .v-col-2 .v-btn").click();
      cy.get("#info-panel-root").should("not.be.visible");
    });
  });
});
