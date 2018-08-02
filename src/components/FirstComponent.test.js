import React from "react";
import { shallow } from "enzyme";
import FirstComponent from "./FirstComponent";

describe("FirstComponentBasicCheck", () => {
    it("Should render the component", () => {
        const wrapper = shallow(<FirstComponent />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});
