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

const initialState: LocalState = {
  siteA: undefined,
  siteB: undefined,
  result: undefined,  
  validationMessage: undefined,
  bestResult: undefined
};

export class App extends React.Component<ComponentProps, LocalState> {
  
  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.updateInputA = this.updateInputA.bind(this);
    this.updateInputB = this.updateInputB.bind(this);
    this.onSelectCalculate = this.onSelectCalculate.bind(this);
    this.renderValidationMessage = this.renderValidationMessage.bind(this);
  }
  
  updateInputA(siteA: Destination): void {
    this.setState({ siteA, validationMessage: undefined });
  }
  
  updateInputB(siteB: Destination): void {
    this.setState({ siteB, validationMessage: undefined });
  }

  onSelectCalculate() {
    const isValid = this.validate();
    if (isValid) {
      this.calculate();
    }
  }

  // Would prefer this to be seperate and set in reducer rather than local state
  validate() {
    const { siteA, siteB } = this.state;
    const bothSelected = siteA && siteB;

    // If one field is empty
    if (!bothSelected) {
      const validationMessage = "Both fields must be filled to find a path";
      this.setState({ validationMessage, result: undefined });
      return false;
    }

    this.setState({ validationMessage: undefined });

    // Valid
    return true;
  }

  calculate(): void {
    const { siteA, siteB } = this.state;
    const result = Calculate(siteA!, siteB!);
    this.setState({ result: convertResultToStringArray(result), bestResult: result[0] });
  }

  renderValidationMessage(): JSX.Element | null {
    const { validationMessage } = this.state;
    if (validationMessage) {
      return <p className="warning-text">{validationMessage}</p>;
    }
    return null;
  }

  reset() {
    this.setState(initialState);
  }

  render() {
    return <div>
      <div id="toolbar">
        <button onClick={this.onSelectCalculate}>Calculate</button>
        <button onClick={this.reset}>Reset</button>
        <div>{this.renderValidationMessage()}</div>
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
