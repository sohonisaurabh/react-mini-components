import React from "react";
import {shallow} from "enzyme";
import InputComponent from "./InputComponent";

describe("InputComponentTestSuite", () => {
    it("should render input text component", () => {
        const comp = shallow(<InputComponent />);
        expect(comp.getElements()).toMatchSnapshot();
    });
});