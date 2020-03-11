import "babel-polyfill";
import React from "react";
import Component from "../index";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

const location = {
  state: {
    user: {
      email: ""
    }
  }
};

jest.mock("axios", () => ({
  post: jest.fn(url => {
    if (url === "http://localhost:5000/task/create") {
      return {
        taskAssigned: true
      };
    }
  })
}));

describe("<AssignTask /> Component", () => {
  const doMount = () =>
    mount(
      <MemoryRouter>
        <Component location={location} role="manager" />
      </MemoryRouter>
    );

  test("mounting the component", async () => {
    const wrapper = doMount();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    await new Promise(resolve => setTimeout(resolve, 100));
    wrapper.update();
    wrapper
      .find('[data-testid="title"]')
      .at(0)
      .simulate("change", { target: { value: "title" } });
    wrapper.update();
    wrapper
      .find('[data-testid="description"]')
      .at(1)
      .simulate("change", { target: { value: "description" } });
    wrapper.unmount();
  });

  test("simulating onChange on datePicker", () => {
    const wrapper = doMount();
    wrapper.update();
    wrapper
      .find('input[type="text"]')
      .at(1)
      .simulate("change", { date: "3/3/3" });
  });

  test("if role is not manager", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Component location={location} role="developer" />
      </MemoryRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
