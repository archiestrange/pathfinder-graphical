import React from 'react';
import './styles/index.scss';
import { Destination, CalculationResult, InterfaceType, CalculationItem } from './types';
import { Calculate } from './calculate-route';
import { convertResultToStringArray, destinations } from './utils';
import { SimpleUI } from './simple-ui';
import { GraphicalUI } from './graphical-ui';

interface ComponentProps {}

interface LocalState {
  siteA?: Destination;
  siteB?: Destination;
  result?: CalculationResult[];
  validationMessage?: string;
  interfaceType: InterfaceType;
  bestResult?: CalculationItem;
}

const initialState = { interfaceType: InterfaceType.SIMPLE_UI };
export class App extends React.Component<ComponentProps, LocalState> {
  
  constructor(props: ComponentProps) {
    super(props);
    this.state = initialState;
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.updateInputA = this.updateInputA.bind(this);
    this.updateInputB = this.updateInputB.bind(this);
    this.toggleInterface = this.toggleInterface.bind(this);
    this.renderResultText = this.renderResultText.bind(this);
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

  // Some people prefer without the if and instead use turnary operator in render
  // validationMessage ? renderValidationMessage() : null... I prefer less in render func
  renderValidationMessage(): JSX.Element | null {
    const { validationMessage } = this.state;
    if (validationMessage) {
      return <p className="warning-text">{validationMessage}</p>;
    }
    return null;
  }

  renderResultText(): JSX.Element | null {
    const { result } = this.state;

    // Default text to tell user what to do
    if (!result) {
      return <p className="centered-text">Select two destinations and press the calculate button to find the best route between them.</p>;
    } 

    // If no path is found (don't think this exists in mock data?)
    if (result.length < 1) {
      return <p className="centered-text">There are no possible paths between these destinations</p>
    }

    // Results if calculated successfully 
    return <React.Fragment>{result.map(r => <p key={r.id}>{r.details}</p>)}</React.Fragment>;
  }

  renderUI() {
    switch(this.state.interfaceType){
      case InterfaceType.SIMPLE_UI:
        return <SimpleUI
          siteA={this.state.siteA}
          siteB={this.state.siteB}
          calculate={this.calculate}
          updateInputA={this.updateInputA}
          updateInputB={this.updateInputB}
          renderValidationMessage={this.renderValidationMessage}
          renderResultText={this.renderResultText}
          />;

      case InterfaceType.GRAPHICAL_UI:
        return <GraphicalUI
          siteA={this.state.siteA}
          siteB={this.state.siteB}
          calculate={this.calculate}
          updateInputA={this.updateInputA}
          updateInputB={this.updateInputB}
          result={this.state.bestResult}
          renderValidationMessage={this.renderValidationMessage}
          renderResultText={this.renderResultText} />;
    }
  }

  toggleInterface() {
    const interfaceType = this.state.interfaceType === InterfaceType.GRAPHICAL_UI ?
      InterfaceType.SIMPLE_UI :
      InterfaceType.GRAPHICAL_UI;
    this.setState({ interfaceType });
  }

  reset() {
    this.setState({ siteA: undefined, siteB: undefined, bestResult: undefined, result: undefined });
  }

  render() {
    const interfaceText = this.state.interfaceType === InterfaceType.GRAPHICAL_UI ? "Simple UI" : "Graphical UI";
    return <div>
      <div id="toolbar">
        <button onClick={this.toggleInterface}>{interfaceText}</button>
        <button onClick={this.calculate}>Calculate</button>
        <button onClick={this.reset}>Reset</button>
      </div>
      {this.renderUI()}
    </div>
  }
}
