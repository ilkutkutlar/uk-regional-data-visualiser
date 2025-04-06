import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import DataSelectionBar from "../../src/components/DataSelectionBar.vue";
import { mount } from "@vue/test-utils";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("correctly displays selected dataset and year", () => {
  const wrapper = mount(DataSelectionBar);
  expect(wrapper.find("#bottom-card").text()).toContain(
    "Median earnings | 2021",
  );
});
