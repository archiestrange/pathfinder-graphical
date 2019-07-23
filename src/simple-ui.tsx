import * as React from "react";
import { Destination } from "./types";
import { destinations } from "./utils";

interface ComponentProps {
    siteA?: Destination;
    siteB?: Destination;
    calculate: () => void;
    updateInputA: (siteA: Destination) => void;
    updateInputB: (siteB: Destination) => void;
    renderValidationMessage: () => JSX.Element | null;
    renderResultText: () => JSX.Element | null;
}

function renderSelectOptions(): JSX.Element {
    return <React.Fragment>
      <option key={"empty"}></option>
      {destinations.map(d => <option key={d} value={d}>{d}</option>)}
    </React.Fragment>
}

export function SimpleUI(props: ComponentProps) {
    const { siteA, siteB, updateInputA, updateInputB, calculate, renderValidationMessage, renderResultText } = props;
    return <div id="simple-pathfinder-container">
        <div id="header">Pathfinder</div>
        <div id="body">
            <div className="route-picker-container">
                <select className="route-picker" value={siteA} onChange={e => updateInputA(e.target.value as Destination)}>
                {renderSelectOptions()}
                </select>
                <select className="route-picker" value={siteB} onChange={e => updateInputB(e.target.value as Destination)}>
                {renderSelectOptions()}
                </select>
            </div>
            <div id="calculate-button-container">
                <button onClick={calculate}>Calculate</button>
            </div>
            {renderValidationMessage()}
            <div id="result-field-container">
                {renderResultText()}
            </div>
        </div>
    </div>
}