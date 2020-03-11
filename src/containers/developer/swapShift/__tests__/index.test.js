import "babel-polyfill";
import React from "react";
import Component from "../index";
import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";

/** mock data */
jest.mock("axios", () => ({
  get: jest.fn(() => {
    return {
      data: {
        swapShift: [{ day: "Monday" }],
        email: "usman@gmail.com"
      }
    };
  }),
  post: jest.fn(() => {
    return {
      data: ["sdnjksk"]
    };
  })
}));

describe("<SwapShift /> Component", () => {
  it("mounting the component(for unauthorize user)", () => {
    const wrap = mount(
      <MemoryRouter>
        <Component role="manager" />
      </MemoryRouter>
    );
    expect(toJson(wrap)).toMatchSnapshot();
    wrap.unmount();
  });

  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Component role="developer" />
      </MemoryRouter>
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it("mounting the component", () => {
    console.log(wrapper.html());
    wrapper.update();
    console.log("chussss", wrapper.find('[data-testid="swapshift"]').length);
    wrapper
      .find('button[data-testid="swapshift"]')
      .at(0)
      .simulate("click");
  });
});
