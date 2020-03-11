import "babel-polyfill";
import React from "react";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

const location = {
  state: {
    user: {
      email: "ali@gmail.com"
    }
  }
};

jest.mock("axios", () => ({
  post: jest.fn(url => {
    if (url === "http://localhost:5000/manager/assigntiming/") {
      return Promise.resolve({
        shiftAssign: true
      });
    }
  })
}));

describe("<AssignShift /> Component", () => {
  const doMount = () =>
    mount(
      <MemoryRouter>
        <Component location={location} role="manager" />
      </MemoryRouter>
    );

  test("mounting the component(for unauthorize user)", () => {
    const wrap = mount(
      <MemoryRouter>
        <Component location={location} role="developer" />
      </MemoryRouter>
    );
    expect(toJson(wrap)).toMatchSnapshot();
    wrap.unmount();
  });

  test("mounting component", () => {
    const wrapper = doMount();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('input[id="startTime"]')
      .at(0)
      .simulate("change", { id: "21412", time: "242", date: "2234" });
    wrapper.update();
    wrapper
      .find('input[id="endTime"]')
      .at(0)
      .simulate("change", { id: "21412", time: "242", date: "2234" });
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  test("simulating the Submit Button", () => {
    const wrapper = doMount();
    wrapper
      .find('button[data-testid="submitButton"]')
      .at(0)
      .simulate("submit");
    wrapper.unmount();
  });
});
