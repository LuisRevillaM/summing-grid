const roundToDecimals = (number, decPlaces) => {
  let mult;
  if (decPlaces === 0) {
    return Math.round(number);
  } else {
    mult = Math.pow(10, decPlaces);
    return Math.round(number * mult) / mult;
  }
};

const formatNumber = number => {
  let rounded = number;
  const units = ["K", "M", "B", "T"];
  for (let i = units.length - 1; i >= 0; i--) {
    const unitSize = Math.pow(10, (i + 1) * 3);
    if (unitSize <= number) {
      const measure = number / unitSize;
      let decPlaces;

      if (measure < 10) {
        decPlaces = 2;
      } else if (measure < 100) {
        decPlaces = 1;
      } else {
        decPlaces = 0;
      }

      rounded = roundToDecimals(measure, decPlaces);
      if (rounded === 1000 && i < units.length - 1) {
        rounded = 1;
        console.log("here");
        i++;
      }
      rounded += units[i];
      break;
    }
  }
  return rounded;
};

export default formatNumber;
