import React, { Component } from "react";
import ValidInput from "../ValidInput";
import "./SummingGrid.css";
import formatNumber from "./formatNumber.js";

class SummingGrid extends Component {
  state = (() => {
    let initialState = {};
    for (let i = 1; i <= this.props.boxes; i++) {
      initialState[i] = 0;
    }
    return initialState;
  })();

  initializeGrid = () => {
    let boxes = [];
    for (let i = 1; i <= this.props.boxes; i++) {
      boxes.push(
        <ValidInput
          key={i}
          id={i}
          className="box"
          validator={this.validateNumber}
        />
      );
    }
    return boxes;
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
      <div>
        <div className="SummingGrid">
          {this.initializeGrid()}
          <div className="box">{result}</div>
        </div>
      </div>
    );
  }
}

export default SummingGrid;
