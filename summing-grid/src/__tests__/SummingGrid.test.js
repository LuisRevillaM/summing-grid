import React from "react";
import SummingGrid from "../components/SummingGrid/";
import { mount } from "enzyme";

it("validates number strings correctly", () => {
  const wrapper = mount(<SummingGrid />);
  const inst = wrapper.instance();
  expect(inst.isNumberString("28282")).toBe(true);
  expect(inst.isNumberString("282tt82")).toBe(false);
});

it("adds the state correctly", () => {
  const wrapper = mount(<SummingGrid />);
  const inst = wrapper.instance();
  const state = { first: 30, second: 0, third: 43 };

  let result = inst.sumState(state);

  expect(result).toEqual(30 + 0 + 43);
});
