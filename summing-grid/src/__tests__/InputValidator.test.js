import React from "react";
import InputValidator from "../components/InputValidator";
import { mount } from "enzyme";

it("executes validation on input change", () => {
  //object to collect event side effects
  let validationResult = {};

  const validator = (value, id) => {
    validationResult.id = id;
    validationResult.value = value;
  };
  const wrapper = mount(<InputValidator validator={validator} />);
  const inst = wrapper.instance();

  inst.onChange({ target: { id: "one", value: "Alaska" } });
  expect(validationResult.id).toEqual("one");
  expect(validationResult.value).toEqual("Alaska");
  expect(typeof inst.onChange).toBe("function");
});
