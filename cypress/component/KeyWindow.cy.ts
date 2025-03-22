/// <reference types="cypress" />

import { createPinia, setActivePinia } from "pinia";
import KeyWindow from "../../src/components/KeyWindow.vue";

describe("<KeyWindow />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders", () => {
    cy.mount(KeyWindow);
  });

  it("correctly displays all ranges in the dataset", () => {
    cy.mount(KeyWindow);
    const expectedRanges = [
      "No data",
      "£10,000 - £15,000",
      "£15,000 - £20,000",
      "£20,000 - £25,000",
      "£25,000 - £30,000",
      "£30,000 - £35,000",
      "£35,000+",
    ];
    cy.get(".key-colour-box")
      .siblings()
      .should((elem) => {
        for (let i = 0; i < expectedRanges.length; i++) {
          expect(elem.eq(i).text()).to.equal(expectedRanges[i]);
        }
      });
  });
});
