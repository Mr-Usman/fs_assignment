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
        weekShift: [{ day: "Monday" }]
      }
    };
  }),
  post: jest.fn(() => {
    return {
      data: {
        currentShift: [{ day: "Tuesday" }]
      }
    };
  })
}));

describe("<ShiftTiming /> Component", () => {
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

  afterEach(() => {
    wrapper.unmount();
  });

  it("mounting the component", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("simulating swap shift button", () => {
    wrapper.update();
    wrapper
      .find('button[data-testid="swap"]')
      .at(0)
      .simulate("click");
  });

  it("simulating drop shift button", () => {
    wrapper.update();
    wrapper
      .find('button[data-testid="drop"]')
      .at(0)
      .simulate("click");
  });
});
