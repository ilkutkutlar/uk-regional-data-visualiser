import { expect, test } from "vitest";
import InfoPanelRow from "../../src/components/InfoPanelRow.vue";
import { mount } from "@vue/test-utils";

const testProps = {
  year: 2021,
  value: 25000,
  changeFromLastYear: 5.14,
  isSelectedRow: false,
};

test("displays correct values", () => {
  const wrapper = mount(InfoPanelRow, { props: testProps });
  expect(wrapper.find('[data-cy="year"]').text()).toEqual("2021");
  expect(wrapper.find('[data-cy="value"]').text()).toEqual("25000");
  expect(wrapper.find('[data-cy="change"]').text()).toContain("5.14%");
});

test("uses correct icon and text colour based on the value of change from last year", () => {
  let wrapper = mount(InfoPanelRow, { props: testProps });
  expect(wrapper.find('[data-cy="change"]').classes()).toContain("text-green");
  expect(wrapper.find('[data-cy="change-icon"]').attributes().icon).toEqual(
    "$arrowUpThin",
  );

  wrapper = mount(InfoPanelRow, {
    props: { ...testProps, changeFromLastYear: -3 },
  });
  expect(wrapper.find('[data-cy="change"]').classes()).toContain("text-red");
  expect(wrapper.find('[data-cy="change-icon"]').attributes().icon).toEqual(
    "$arrowDownThin",
  );
});

test("displays chevron icon when the row is selected", () => {
  const wrapper = mount(InfoPanelRow, {
    props: { ...testProps, isSelectedRow: true },
  });
  expect(wrapper.find('[data-cy="select-icon"]').attributes().icon).toEqual(
    "$chevronRight",
  );
});
