# Summing grid

Summing grid is a website that displays a grid of four cells. Three of them are input fields that accept integers; the fourth displays the result of adding such numbers. Any input that's not a sequence of digits [0-9] will count as zero.

## Prerequisites

Node is required to run this project in your system.

## Run locally

Clone the repository. From the `/summing-grid` directory, run

```sh
npm install
```

Then you can start the development server with

```sh
npm start
```

## Testing

from the `/summing-grid directory` run:

```sh
npm run test
```

## Documentation

This website consist of a root HTML document and JavaScript (React) code to generate the view layer. It's been bootstrapped with [Create React App](https://github.com/facebook/create-react-app). See the [docs](https://github.com/LuisRevillaM/summing-grid/tree/master/summing-grid/docs) for implementation details on the component structure, input validation and output formatting process.

### A responsive grid

`<SummingGrid/>` keeps track of the values on each input, and calculates their sum every time any input changes. The component has been styled with the CSS `display: grid` property, including media queries to modify its column/row composition according to the screen width.

### Validation

`<InputValidator/>` is a react component that accepts a prop function for input validation. Each time its inner state changes, the component will execute the validation function `this.props.validator(value, inputId)`, passing it the new value and an identifier.

`<SummingGrid/>` holds the validation logic and delegates its execution to `<InputValidator/>`, as well as the ensuing updates to the global state of the grid.

Any input that's not a sequence of integers [0-9] will count as zero to `<SummingGrid/>`

### Formatting

The displayed sum number is rounded to its nearest 3 digit form, using Ks, Ms, Bs and Ts to abbreviate thousands, millions et cetera.

### Variable number of inputs

The component `<GenericSummingGrid/>` implements a version of the grid that takes a `boxes` prop, to control how many input fields to display. See the [docs](https://github.com/LuisRevillaM/summing-grid/tree/master/summing-grid/docs) for usage instructions.

```javascript
const App = () => {
  return <GenericSummingGrid boxes={7} />;
};
```
