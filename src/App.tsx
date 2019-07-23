import React from 'react';
import './styles/index.scss';
import { Destination, CalculationResult, CalculationItem } from './types';
import { Calculate } from './calculate-route';
import { convertResultToStringArray } from './utils';
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
    this.renderValidationMessage = this.renderValidationMessage.bind(this);
  }
  
  componentDidUpdate() {
    if (this.state.siteA && this.state.siteB && !this.state.result) {
        this.calculate();
    }
  }

  updateInputA(siteA: Destination): void {
    this.setState({ siteA, validationMessage: undefined });
  }
  
  updateInputB(siteB: Destination): void {
    this.setState({ siteB, validationMessage: undefined });
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
