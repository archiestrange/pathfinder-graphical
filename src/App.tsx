import React from 'react';
import './styles/index.scss';
import { Destination, CalculationResult, InterfaceType, CalculationItem } from './types';
import { Calculate } from './calculate-route';
import { convertResultToStringArray, destinations } from './utils';
import { GraphicalUI } from './graphical-ui';

interface ComponentProps {}

interface LocalState {
  siteA?: Destination;
  siteB?: Destination;
  result?: CalculationResult[];
  validationMessage?: string;
  bestResult?: CalculationItem;
}

export class App extends React.Component<ComponentProps, LocalState> {
  
  constructor(props: ComponentProps) {
    super(props);
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.updateInputA = this.updateInputA.bind(this);
    this.updateInputB = this.updateInputB.bind(this);
    this.renderValidationMessage = this.renderValidationMessage.bind(this);
  }
  
  updateInputA(siteA: Destination): void {
    this.setState({ siteA, validationMessage: undefined });
  }
  
  updateInputB(siteB: Destination): void {
    this.setState({ siteB, validationMessage: undefined });
  }

  // Would prefer this to be seperate and set in reducer rather than local state
  validate() {
    const { siteA, siteB } = this.state;
    const bothSelected = siteA && siteB

    // If one field is empty
    if (!bothSelected) {
      const validationMessage = "Both fields must be filled to find a path";
      this.setState({ validationMessage, result: undefined });
      return false;
    }

    // If both fields are the same
    if (bothSelected && siteA === siteB) {
      const validationMessage = "Please select two different destinations";
      this.setState({ validationMessage, result: undefined });
      return false;
    }

    // Valid
    return true;
  }

  calculate(): void {
    const { siteA, siteB } = this.state;
    const isValid = this.validate();
    if (isValid) {
      const result = Calculate(siteA!, siteB!);
      this.setState({ result: convertResultToStringArray(result), bestResult: result[0] });
    }
  }

  renderValidationMessage(): JSX.Element | null {
    const { validationMessage } = this.state;
    if (validationMessage) {
      return <p className="warning-text">{validationMessage}</p>;
    }
    return null;
  }

  reset() {
    this.setState({ siteA: undefined, siteB: undefined, bestResult: undefined, result: undefined });
  }

  render() {
    return <div>
      <div id="toolbar">
        <button onClick={this.calculate}>Calculate</button>
        <button onClick={this.reset}>Reset</button>
        <span>{this.renderValidationMessage()}</span>
      </div>
      <GraphicalUI
          siteA={this.state.siteA}
          siteB={this.state.siteB}
          calculate={this.calculate}
          updateInputA={this.updateInputA}
          updateInputB={this.updateInputB}
          result={this.state.bestResult} />
    </div>
  }
}
