import "babel-polyfill";
import React from "react";
import Component from "../index";
import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import toJson from "enzyme-to-json";
import { act } from "react-dom/test-utils";

describe("<Navbar /> component", () => {
  //   let wrapper;
  let history;

  beforeAll(() => {
    history = {
      push: jest.fn()
    };
  });

  describe("when role is Developer", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Component history={history} role="developer" />
        </MemoryRouter>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });
    it("simulating the Logout Button", () => {
      wrapper
        .find('button[data-testid="logout"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("simulating the Swap Requests Link", () => {
      wrapper.update();
      wrapper
        .find('a[data-testid="swapshift"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("simulating the Swap Requests Link", () => {
      wrapper.update();
      wrapper
        .find('a[data-testid="timings"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("simulating the Swap Requests Link", () => {
      wrapper.update();
      wrapper
        .find('a[data-testid="tasks"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe("when role is manager", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <MemoryRouter>
          <Component history={history} role="manager" />
        </MemoryRouter>
      );
    });

    afterAll(() => {
      wrapper.unmount();
    });
    it("simulating the Logout Button", () => {
      wrapper
        .find('button[data-testid="logout"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("simulating the Create Profile Link", () => {
      wrapper.update();
      wrapper
        .find('a[data-testid="createprofile"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("simulating the Swap Requests Link", () => {
      wrapper.update();
      wrapper
        .find('a[data-testid="alldevelopers"]')
        .at(0)
        .simulate("click");
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("click on the Navbar Brand", () => {
      console.log(wrapper.html());
    });
  });
});
