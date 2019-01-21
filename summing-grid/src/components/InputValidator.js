import React, { Component } from "react";

class InputValidator extends Component {
  state = {
    input: ""
  };

  onChange = ev => {
    const inputId = ev.target.id;
    const value = ev.target.value;
    this.setState({ input: value });
    this.props.validator(value, inputId);
  };

  render() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        value={this.state.input}
        onChange={this.onChange}
      />
    );
  }
}

export default InputValidator;
