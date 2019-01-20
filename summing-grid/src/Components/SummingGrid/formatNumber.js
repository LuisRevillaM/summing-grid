const roundToDecimals = (number, dec) => {
  let mult;
  if (dec === 0) {
    return Math.round(number);
  } else {
    mult = Math.pow(10, dec);
    return Math.round(number * mult) / mult;
  }
};

const abbrNum = number => {
  let decPlaces;
  const abbrev = ["k", "m", "b", "t"];
  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);
    if (size <= number) {
      const measure = number / size;
      if (measure < 10) {
        decPlaces = 2;
      } else if (measure < 100) {
        decPlaces = 1;
      } else {
        decPlaces = 0;
      }
      number = roundToDecimals(measure, decPlaces);
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      number += abbrev[i];
      break;
    }
  }
  return number;
};

export default abbrNum;
