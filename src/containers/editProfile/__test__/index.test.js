import "babel-polyfill";
import React from "react";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";
jest.mock("axios", () => ({
  get: jest.fn(),
  put: jest.fn()
}));

describe("<Edit /> Component", () => {
  const location = {
    state: {
      user: {
        email: ""
      }
    }
  };
  const history = {
    push: jest.fn()
  };
  const role = "manager";

  const doMount = () =>
    mount(
      <MemoryRouter>
        <Component location={location} history={history} role={role} />
      </MemoryRouter>
    );

  const NotRelevantUser = () =>
    mount(
      <MemoryRouter>
        <Component location={location} history={history} role="developer" />
      </MemoryRouter>
    );

  test("mountung the component", () => {
    const wrapper = doMount();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
  });

  test("mountung the component", () => {
    const wrapper = NotRelevantUser();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
  });

  test("selecting user role", () => {
    const wrapper = doMount();
    wrapper
      .find('input[type="checkbox"]')
      .at(0)
      .simulate("change", { target: { checked: true } });
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });

  test("onChange functionality of selecting user permissions", () => {
    const wrapper = doMount();
    wrapper
      .find('[data-testid="role"]')
      .at(0)
      .simulate("change", { target: { value: "select the user role" } });
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });

  test("onChange simulating for password", () => {
    const wrapper = doMount();
    wrapper.update();
    wrapper
      .find('[data-testid="password"]')
      .at(0)
      .simulate("change", { target: { value: "password" } });
    wrapper.unmount();
  });

  test("submitting the form", async () => {
    const wrapper = doMount();
    wrapper
      .find("form")
      .at(0)
      .simulate("submit");
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(history.push).toHaveBeenCalled();
    wrapper.unmount();
  });
});
