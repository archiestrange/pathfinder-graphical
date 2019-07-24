import React from "react";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ConnectingLines } from "../connecting-lines";

configure({adapter: new Adapter()});

describe("Connecting Lines", () => {

    it("SVG lines DO NOT render when result is undefined", () => {
        const connectingLinesComponent = (
            ConnectingLines(undefined)
        );

        expect(connectingLinesComponent).toEqual(null);
    });

});