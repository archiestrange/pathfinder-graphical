import React from "react";
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Pathfinder } from "../pathfinder";

configure({adapter: new Adapter()});

describe("Orb Selection", () => {

    it("Orb A renders with class 'green' when selected first", () => {
        const pathfinderComponent = (
            <Pathfinder />
        );

        const component = mount(pathfinderComponent);

        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(false);

        orbA.simulate("click");

        component.update();
        
        const orbAPostUpdate = component.find("div#container-a");
        expect(orbAPostUpdate.hasClass("green")).toEqual(true);
    });

    it("Reset button clears selected orb classes", () => {
        const pathfinderComponent = (
            <Pathfinder />
        );

        const component = mount(pathfinderComponent);

        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(false);

        orbA.simulate("click");
        component.update();
        
        const orbAPostUpdate = component.find("div#container-a");
        expect(orbAPostUpdate.hasClass("green")).toEqual(true);

        const resetButton = component.find("button");

        resetButton.simulate("click");
        component.update();

        const orbAPostReset = component.find("div#container-a");
        expect(orbAPostReset.hasClass("green")).toEqual(false);

    });

    it("Orb E renders class 'red' when sleected last", () => {
        const pathfinderComponent = (
            <Pathfinder />
        );

        const component = mount(pathfinderComponent);

        const orbA = component.find("div#container-a");
        expect(orbA.hasClass("green")).toEqual(false);

        orbA.simulate("click");
        component.update();
        
        const orbAPostUpdate = component.find("div#container-a");
        expect(orbAPostUpdate.hasClass("green")).toEqual(true);

        const orbE = component.find("div#container-e");
        expect(orbAPostUpdate.hasClass("red")).toEqual(false);

        orbE.simulate("click");
        component.update();

        const orbEPostUpdate = component.find("div#container-e");
        expect(orbEPostUpdate.hasClass("red")).toEqual(true);

    });

});