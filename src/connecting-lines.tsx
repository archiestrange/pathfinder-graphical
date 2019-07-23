import * as React from "react";
import { Destination, CalculationItem} from "./types";

interface ComponentProps {
    result?: CalculationItem;
    getDivIdValue: (destination: Destination) => string;
}

export class ConnectinLines extends React.Component<ComponentProps> {

    getDivLocation(destination: Destination) {
        const id = this.props.getDivIdValue(destination);
        const element = document.getElementById(id);
        const el = element!.getBoundingClientRect();
        return {
            x: el.left + window.scrollX,
            y: el.top + window.scrollY
        };
    }

    render() {
        if (this.props.result) {
            return this.props.result.usedRoutes.map(r => {
                const divALocation = this.getDivLocation(r.start);
                const divBLocation = this.getDivLocation(r.end);
                return <svg className="svg" width="500" height="500">
                    <line x1={divALocation.x + 37.5} y1={divALocation.y + 37.5} x2={divBLocation.x + 37.5} y2={divBLocation.y + 37.5} />
                </svg>
            });
        }
        return null;
    }
}