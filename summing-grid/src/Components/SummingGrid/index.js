import React, { Component } from "react";
import ValidInput from "../ValidInput";
import "./SummingGrid.css";
import formatNumber from "./formatNumber.js";

class SummingGrid extends Component {
  state = {
    first: 0,
    second: 0,
    third: 0
  };

  validateNumber = (value, id) => {
    let number;
    if (/^[\d]+$/g.test(value)) {
      number = parseInt(value, 10);
    } else {
      number = 0;
    }
    this.updateState(number, id);
  };

  updateState = (number, id) => {
    this.setState(prevState => {
      prevState[id] = number;
      return prevState;
    });
  };

  sumState = () => {
    return Object.keys(this.state).reduce((acc, v) => {
      return (acc = this.state[v] + acc);
    }, 0);
  };

  render() {
    let sum = this.sumState();
    let result = formatNumber(sum);
    return (
      <div className="SummingGrid">
        <ValidInput
          id="first"
          className="box"
          validator={this.validateNumber}
        />
        <ValidInput
          id="second"
          className="box"
          validator={this.validateNumber}
        />
        <ValidInput
          id="third"
          className="box"
          validator={this.validateNumber}
        />
        <div className="box">{result}</div>
      </div>
    );
  }
}

export default SummingGrid;
