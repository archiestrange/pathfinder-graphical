import * as React from "react";
import { Destination, CalculationItem} from "../types";
import { getOrbIdValue } from "../functions/utils";

interface ComponentProps {
    result?: CalculationItem;
}

export class ConnectingLines extends React.Component<ComponentProps> {

    getDivLocation(destination: Destination) {
        const id = getOrbIdValue(destination);
        const element = document.getElementById(id);
        const el = element!.getBoundingClientRect();
        const padding = 37.5;
        return {
            x: el.left + window.scrollX + padding,
            y: el.top + window.scrollY + padding
        };
    }

    render() {
        if (this.props.result) {
            return this.props.result.usedRoutes.map(r => {
                const divALocation = this.getDivLocation(r.start);
                const divBLocation = this.getDivLocation(r.end);
                return <svg className="svg" width="500" height="500">
                    <line x1={divALocation.x} y1={divALocation.y} x2={divBLocation.x} y2={divBLocation.y} />
                </svg>
            });
        }
        return null;
    }
}