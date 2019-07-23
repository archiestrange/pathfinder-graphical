import * as React from "react";
import { Destination, CalculationItem } from "./types";
import { ConnectingLines } from "./connecting-lines";

interface ComponentProps {
    siteA?: Destination;
    siteB?: Destination;
    result?: CalculationItem;
    calculate: () => void;
    updateInputA: (siteA: Destination) => void;
    updateInputB: (siteB: Destination) => void;
}

export class GraphicalUI extends React.Component<ComponentProps> {

    getDivIdValue(destination: Destination) {
        switch(destination) {
            case Destination.A:
                return "container-a";
            case Destination.B:
                return "container-b";
            case Destination.C:
                return "container-c";
            case Destination.D:
                return "container-d";
            case Destination.E:
                return "container-e";
            case Destination.F:
                return "container-f";
            case Destination.G:
                return "container-g";
            case Destination.H:
                return "container-h";
        }
    }

    getOrbClasses(orb: Destination): string {

        if (this.props.siteA === orb){
            return "green";
        }

        if (this.props.siteB === orb) {
            return "red";
        }

        if (this.props.result) {
            const allStarts = this.props.result.usedRoutes.map(r => r.start);
            const allEnds = this.props.result.usedRoutes.map(r => r.end);
            if (allStarts.includes(orb) || allEnds.includes(orb)) {
                return "orange";
            } else {
                return "hidden";
            }
        }
        
        if (this.props.siteA) {
            if(!this.props.siteB) {
                return "second-select"
            }
        } else {
            return "first-select"
        }

        return "";
    }

    setSiteInfo(destination: Destination) {
        if(this.props.siteA) {
            if (this.props.siteB) {
                return;
            } else {
                this.props.updateInputB(destination);
            }
        } else {
            this.props.updateInputA(destination);
        }
    }

    render() {
        return <div id="graphical-pathfinder-container">
            <div className="squeeze-row">
                <div id={this.getDivIdValue(Destination.A)}
                    className={this.getOrbClasses(Destination.A) + " destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.A)}>A</div>
                <div id={this.getDivIdValue(Destination.B)}
                    className={this.getOrbClasses(Destination.B) +" destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.B)}>B</div>
            </div>
            <div className="loose-row">
                <div id={this.getDivIdValue(Destination.C)}
                    className={this.getOrbClasses(Destination.C) +" destination-orb wide-left-section"}
                    onClick={() => this.setSiteInfo(Destination.C)}>C</div>
                <div id={this.getDivIdValue(Destination.D)}
                    className={this.getOrbClasses(Destination.D) +" destination-orb wide-right-section"}
                    onClick={() => this.setSiteInfo(Destination.D)}>D</div>
            </div>
            <div className="loose-row">
                <div id={this.getDivIdValue(Destination.E)}
                    className={this.getOrbClasses(Destination.E) +" destination-orb wide-left-section"}
                    onClick={() => this.setSiteInfo(Destination.E)}>E</div>
                <div id={this.getDivIdValue(Destination.F)}
                    className={this.getOrbClasses(Destination.F) +" destination-orb wide-right-section"}
                    onClick={() => this.setSiteInfo(Destination.F)}>F</div>
            </div>
            <div className="squeeze-row">
                <div id={this.getDivIdValue(Destination.G)}
                    className={this.getOrbClasses(Destination.G) +" destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.G)}>G</div>
                <div id={this.getDivIdValue(Destination.H)}
                    className={this.getOrbClasses(Destination.H) +" destination-orb"}
                    onClick={() => this.setSiteInfo(Destination.H)}>H</div>
            </div>
            <ConnectingLines
                result={this.props.result}
                getDivIdValue={this.getDivIdValue}/>
        </div>
    }
}