import { expect, test } from "vitest";
import DataSelectionBar from "../../src/components/DataSelectionBar.vue";
import { mount } from "@vue/test-utils";

test("correctly displays selected dataset and year", () => {
  const wrapper = mount(DataSelectionBar, {
    props: { datasetName: "Median earnings", selectedYear: "2021" },
  });
  expect(wrapper.find("#bottom-card").text()).toContain(
    "Median earnings | 2021",
  );
});
