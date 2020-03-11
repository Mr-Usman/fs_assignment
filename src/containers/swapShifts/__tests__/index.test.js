import "babel-polyfill";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Component from "../index";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

/** mock data */
const location = {
  state: {
    user: {
      email: ""
    }
  }
};

jest.mock("axios", () => ({
  post: jest.fn(() => {
    return {
      data: "usman"
    };
  })
}));

describe("<SwapShift /> Component", () => {
  let wrapper;
  it("mounting the component(for unauthorize user)", () => {
    const wrap = mount(
      <MemoryRouter>
        <Component location={location} role="developer" />
      </MemoryRouter>
    );
    expect(toJson(wrap)).toMatchSnapshot();
    wrap.unmount();
  });

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Component location={location} role="manager" />
      </MemoryRouter>
    );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it("mounting the component", () => {
    // console.log(wrapper.html());
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
