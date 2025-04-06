import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import KeyWindow from "../../src/components/KeyWindow.vue";
import { mount } from "@vue/test-utils";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("correctly displays all ranges in the dataset", () => {
  const wrapper = mount(KeyWindow);

  const expectedRanges = [
    "No data",
    "£10,000 - £15,000",
    "£15,000 - £20,000",
    "£20,000 - £25,000",
    "£25,000 - £30,000",
    "£30,000 - £35,000",
    "£35,000+",
  ];

  for (const [i, elem] of wrapper.findAll(".key-colour-box ~ div").entries()) {
    expect(elem.text()).toEqual(expectedRanges[i]);
  }
});
