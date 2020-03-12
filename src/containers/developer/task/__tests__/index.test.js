import "babel-polyfill";
import React from "react";
import waitUntil from "async-wait-until";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

/** mock data */

// jest.mock("axios", () => ({
//   get: jest.fn(() => {
//     return Promise.resolve({
//       data: [
//         {
//           _id: "",
//           title: "",
//           description: "",
//           deadline: ""
//         }
//       ]
//     });
//   })
// }));

jest.mock("axios", () => ({
  get: jest.fn(() => {
    return {
      data: [
        {
          _id: "",
          title: "",
          description: "",
          deadline: ""
        }
      ]
    };
  })
}));

describe("<Task /> Component Tests", () => {
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
    wrapper.update();
  });
});
