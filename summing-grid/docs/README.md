# Documentation

### Table of contents

- [Summing Grid](#SummingGrid)
- [Input Validator](#InputValidator)
- [The validation function](#Validation)
- [Output format](#Output)
- [Responsive grid](#Grid)
- [Generic grid](#Generic)

## <a name="SummingGrid">`SummingGrid`</a>

Our application consists of a main component named `<SummingGrid/>`. This component holds a value for each of its child input fields. It also contains the logic to validate the input and update the state accordingly, passing down such logic as a prop function to the `<InputValidator/>` component.

```javascript
class SummingGrid extends Component {
  state = {
    first: 0,
    second: 0,
    third: 0
  };

  //returns a fn to validate and call
  //an updater fn passed as argument
  validateAndUpdate = updater => {
    return (value, id) => {
      //implementation details
      //call updater fn after validation
      updater(value, id);
    };
  };

  updateState = (number, id) => {
    //implementation details
  };

  render() {
    return (
      <div className="SummingGrid">
        <InputValidator
          id="first"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <InputValidator
          id="second"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <InputValidator
          id="third"
          validator={this.validateAndUpdate(this.updateState)}
        />
        <div>{result}</div>
      </div>
    );
  }
}
```

## <a name="InputValidator">`InputValidator`</a>

`<InputValidator/>` is a react component that holds its own inner state and handles its changes. With every change, however, it executes a function received as a prop, named `this.props.validator`. This way the component delegates to its parent the input validation criteria as well as its side-effects.

```javascript
class InputValidator extends Component {
  state = {
    input: ""
  };

  onChange(ev) {
    const value = ev.target.value;
    const inputId = ev.target.id;
    //set inner state
    this.setState({ input: ev.target.value });
    //execute validation function
    this.props.validator(value, inputId);
  }
  render() {
    return (
      <input
        onChange={this.onChange}
        id={this.props.id}
        value={this.state.input}
      />
    );
  }
}
```

## <a name="Validation">The validation function</a>

`<SummingGrid/>` will add every sequence of integers on any of it child input fields. This is, add every input that satisfies the test:

```javascript
/^[\d]+$/g.test(value) === true;
```

Every input that fails the test, will be considered zero by `<SummingGrid/>`:

```javascript
(value, id) => {
  let number;
  if (/^[\d]+$/g.test(value)) {
    number = parseInt(value, 10);
  } else {
    number = 0;
  }
  updater(number, id);
};
```

This way, if the user inputs `"2"`, `"yrjm!"` and `"7"`, `<SummingGrid/>` will still output `9`;

Note that something like `2c` will fail the test and count as zero.

## <a name="Output">Output format</a>

Through the utility function `formatNumber`, `SummigGrid` renders the output as three digits and an abbreviation corresponding to either thousands (K), millions (M), billions (B) or trillions (T).

See the [format number](https://github.com/LuisRevillaM/summing-grid/tree/master/summing-grid/docs/formatNumber.md) docs to read about its implementation.

## <a name="Grid">Responsive grid</a>

SummingGrid's layout is determined by CSS styles applied to the component through the `className` prop. Mainly, the `display: grid` property is used to declare a 1x4 grid, with each column having 25% of the screen's width

```css
display: grid;
grid-template-columns: 25% 25% 25% 25%;
grid-template-rows: auto;
```

To give the grid different layouts with different screen widths, we rely on CSS media queries, to change the columns/rows proportion.

```css
@media screen and (max-width: 720px) {
  .SummingGrid {
    grid-template-columns: 50% 50%;
    grid-template-rows: auto auto;
  }
}

@media screen and (max-width: 360px) {
  .SummingGrid {
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto auto;
  }
}
```

## <a name="Generic">Generic grid</a>

The component `GenericSummingGrid` implements a generalized version of our summing grid. It takes a `boxes` integer number as prop, to determine the number of inputs the grid should have. To be used, `GenericSummingGrid` must be imported to and rendered by the `App` component.

```javascript
//from src/components/App/index.js
import GenericSummingGrid from "../GenericSummingGrid";

const App = () => {
  //boxes prop sets number of inputs
  return <GenericSummingGrid boxes={2} />;
};
```
