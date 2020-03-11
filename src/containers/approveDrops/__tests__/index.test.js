import "babel-polyfill";
import React from "react";
import Component from "../index";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import toJson from "enzyme-to-json";

jest.mock("axios", () => ({
  post: jest.fn(url => {
    if (url === "http://localhost:5000/user/getdropshifts/") {
      //   return Promise.resolve({
      //     data: [
      //       {
      //         _id: "",
      //         day: "",
      //         startTime: "",
      //         endTime: "",
      //         aprovedStatus: ""
      //       }
      //     ]
      //   });
      return {
        data: [
          {
            _id: "",
            day: "",
            startTime: "",
            endTime: "",
            aprovedStatus: ""
          }
        ]
      };
    }
  })
}));

const location = {
  state: {
    user: {
      email: "ali@gmail.com"
    }
  }
};

describe("<ApproveDrops /> Component", () => {
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

  test("mounting the component", async () => {
    const wrapper = doMount();
    await new Promise(resolve =>
      setTimeout(() => {
        expect(wrapper).toMatchSnapshot();
        wrapper.update();
        wrapper.find('button[data-testid="onApproveShift"]').simulate("click");
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
        resolve();
      }, 100)
    );
  });
});
