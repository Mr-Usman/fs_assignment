import "babel-polyfill";
import React from "react";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

/** mock data */
const location = {
  state: {
    swap: [
      { id: 1, username: "usman", role: "developer", taskId: ["dsbcsbh"] }
    ],
    day: "Monday"
  }
};

jest.mock("axios", () => ({
  post: jest.fn(() => {
    return Promise.resolve({
      data: [
        {
          _id: "",
          day: "",
          startTime: "",
          endTime: "",
          aprovedStatus: ""
        }
      ]
    });
  })
}));

describe("<MatchUsers /> Component", () => {
  const doMount = () =>
    mount(
      <MemoryRouter>
        <Component location={location} role="developer" />
      </MemoryRouter>
    );

  test("mounting the component(for unauthorize user)", () => {
    const wrap = mount(
      <MemoryRouter>
        <Component location={location} role="manager" />
      </MemoryRouter>
    );
    expect(toJson(wrap)).toMatchSnapshot();
    wrap.unmount();
  });

  test("mounting the component", () => {
    const wrapper = doMount();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  test("Simulating the allSelectedUsers function", () => {
    const wrapper = doMount();
    wrapper
      .find('input[id="swap"]')
      .at(0)
      .simulate("change", { id: 4 });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  test("simulating the submit button", () => {
    const wrapper = doMount();
    wrapper.find('button[data-testid="submitbutton"]').simulate("click");
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
