import "babel-polyfill";
import React from "react";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// jest.mock({ location: { state: { user: { name: "" } } } });

describe("<Edit /> Component", () => {
  test("mountung the component", () => {
    const wrapper = mount(<Component />);
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });

  test("simulating form", () => {
    const location = {
      state: {
        user: {
          email
        }
      }
    };
    const wrapper = mount(<Component location={location} />);
    console.log(wrapper.html());
    wrapper.find("form").simulate("submit");
    expect(wrapper).toHaveLength(1);
  });

  //   test("executing permissions function", () => {
  //     const wrapper = mount(<Component />);
  //     wrapper.find('[data-testid="permissions"]').simulate("change");
  //     expect(wrapper).toBeDefined();
  //   });
});
