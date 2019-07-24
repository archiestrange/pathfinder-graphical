import React from "react";
import { GraphicalUI } from "../graphical-ui";
import { Destination, CalculationItem } from "../../types";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe("Graphical UI", () => {

    const result: CalculationItem = {
        current: Destination.E,
        foundDestination: true,
        total: 14,
        used: false,
        usedRoutes: [
            { start: Destination.A, end: Destination.C },
            { start: Destination.C, end: Destination.D },
            { start: Destination.D, end: Destination.B },
            { start: Destination.B, end: Destination.E }
        ]
    }

    it("Orb A renders with class 'green' when selected first", () => {
        const graphicalUIComponent = (
            <GraphicalUI
                siteA={Destination.A}
                siteB={undefined}
                result={undefined}
                calculate={() => {}}
                updateInputA={() => {}}
                updateInputB={() => {}} />
        );

        const component = shallow(graphicalUIComponent);
        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(true);
    });

    it("Orb A renders with class 'red' when selected second", () => {
        const graphicalUIComponent = (
            <GraphicalUI
                siteA={undefined}
                siteB={Destination.A}
                result={undefined}
                calculate={() => {}}
                updateInputA={() => {}}
                updateInputB={() => {}} />
        );

        const component = shallow(graphicalUIComponent);
        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("red")).toEqual(true);
    });

    it("Connecting orbs render with class 'orange' when result is on display", () => {
        const graphicalUIComponent = (
            <GraphicalUI
                siteA={Destination.A}
                siteB={Destination.E}
                result={result}
                calculate={() => {}}
                updateInputA={() => {}}
                updateInputB={() => {}} />
        );

        const component = shallow(graphicalUIComponent);

        const orbB = component.find("div#container-b");
        expect(orbB.hasClass("orange")).toEqual(true);

        const orbC = component.find("div#container-c");
        expect(orbC.hasClass("orange")).toEqual(true);

        const orbD = component.find("div#container-d");
        expect(orbD.hasClass("orange")).toEqual(true);

    });

    it("Unused orbs render with class 'hidden' when result is on display", () => {
        const graphicalUIComponent = (
            <GraphicalUI
                siteA={Destination.A}
                siteB={Destination.E}
                result={result}
                calculate={() => {}}
                updateInputA={() => {}}
                updateInputB={() => {}} />
        );

        const component = shallow(graphicalUIComponent);

        const orbF = component.find("div#container-f");
        expect(orbF.hasClass("hidden")).toEqual(true);

        const orbG = component.find("div#container-g");
        expect(orbG.hasClass("hidden")).toEqual(true);

        const orbH = component.find("div#container-h");
        expect(orbH.hasClass("hidden")).toEqual(true);

    });
});