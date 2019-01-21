import React, { Component } from "react";
import InputValidator from "../InputValidator";
import "./SummingGrid.css";
import formatNumber from "../../utils/formatNumber.js";

class SummingGrid extends Component {
  state = {
    first: 0,
    second: 0,
    third: 0
  };

  isNumberString = str => {
    return /^[\d]+$/g.test(str);
  };

  validateAndUpdate = updater => {
    return (value, id) => {
      let number;
      if (this.isNumberString(value)) {
        number = parseInt(value, 10);
      } else {
        number = 0;
      }
      updater(number, id);
    };
  };

  updateState = (number, id) => {
    this.setState(prevState => {
      prevState[id] = number;
      return prevState;
    });
  };

  sumState = state => {
    return Object.keys(state).reduce((acc, v) => {
      return (acc = state[v] + acc);
    }, 0);
  };

  render() {
    let sum = this.sumState(this.state);
    let result = formatNumber(sum);
    return (
      <div className="SummingGrid">
        <InputValidator
          id="first"
          className="box"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <InputValidator
          id="second"
          className="box"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <InputValidator
          id="third"
          className="box"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <div className="box">{result}</div>
      </div>
    );
  }
}

export default SummingGrid;
