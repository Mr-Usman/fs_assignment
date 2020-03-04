import "babel-polyfill";
import React from "react";
import Component from "../index";
import { create } from "react-test-renderer";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

jest.mock("axios", () => ({
  get: jest.fn(url => {
    if (url === "http://localhost:5000/user/all") {
      return Promise.resolve({
        data: [{ name: "abc", permissions: ["Admin"] }]
      });
    }
  }),
  post: jest.fn(url => {
    if (url === "/something") {
      return Promise.resolve({
        data: "data"
      });
    }
    if (url === "/something2") {
      return Promise.resolve({
        data: "data2"
      });
    }
  }),
  create: jest.fn(function() {
    return this;
  })
}));

describe("<GetAllUsers /> Component", () => {
  test("mountung the component", () => {
    const wrapper = mount(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });

  test("calls component DidMount lifecycle", done => {
    const compDidMoutMock = jest.spyOn(
      Component.WrappedComponent.prototype,
      "componentDidMount"
    );
    const wrapper = mount(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );

    setTimeout(() => {
      wrapper.update();
      wrapper.find('button[data-testid="assignTask"]').simulate("click");
      wrapper.find('button[data-testid="assignShift"]').simulate("click");
      wrapper.find('button[data-testid="edit"]').simulate("click");
      wrapper.find('button[data-testid="delete"]').simulate("click");
      wrapper.find('button[data-testid="getShifts"]').simulate("click");
      wrapper.find('button[data-testid="getSwapped"]').simulate("click");
      expect(compDidMoutMock).toHaveBeenCalledTimes(1);
      done();
    }, 100);
  });
});
