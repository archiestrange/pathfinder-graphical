import * as React from "react";
import { Destination, CalculationItem} from "../types";
import { getOrbIdValue } from "../functions/utils";

export function ConnectingLines(result?: CalculationItem) {

    // Get X and Y coordinates for orbs
    const getDivLocation = (destination: Destination) => {
        const id = getOrbIdValue(destination);
        const element = document.getElementById(id);
        if (element) {
            const el = element.getBoundingClientRect();
            const padding = 37.5;
            return {
                x: el.left + window.scrollX + padding,
                y: el.top + window.scrollY + padding
            };
        }
        return null;
    }

    if (result) {
        // Map through the used routes to draw a connecting line between each point used
        return result.usedRoutes.map(r => {
            const divALocation = getDivLocation(r.start);
            const divBLocation = getDivLocation(r.end);
            if (divALocation && divBLocation) {
                return <svg key={r.start} className="svg" width="500" height="500">
                    <line x1={divALocation.x} y1={divALocation.y} x2={divBLocation.x} y2={divBLocation.y} />
                </svg>
            }
        });
    }
    return null;
}