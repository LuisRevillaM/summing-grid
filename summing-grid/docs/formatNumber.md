## Abbreviate and round number

To abbreviate a number, we first must know where in the scale it stands. Is it below the thousands? In the millions? In our implementation, we loop over the units from larger to smaller, in order to effectively constrain the number.

```javascript
//an array representing each unit
const units = ["K", "M", "B", "T"];

//we go from larger to smaller
for (let i = units.length - 1; i >= 0; i--) {
  //map the index to its correspondent unit in the array
  const unitSize = Math.pow(10, (i + 1) * 3);

  //if the number is greater or equal than the current unitSize
  if (number >= unitSize) {
    //it should be measured in the current unitSize
    //here goes code to do it
    //then break the loop
    break;
  }
}
```

Then, to get the measure (how many Ks or Ms our number represents), we must divide the number by its corresponding `unitSize` (1 thousand for Ks, 1 million for Ms, etc).

```javascript
if(number>= unitSize){
	  //...
      const measure = number/unitSize;
      //here goes code to round the measure to three digits
      //...
      break;
}
```

### Round to three digits

We must bring our measure down to its nearest (at most) 3-digit representation. If the 'integer part' of the measure already has three digits (greater than 99), then we round its fractional part completely to the nearest integer.

If the measure is greater than 10 (its integer part has two digits), we must keep one digit of its fractional part, if it rounds to more than 1 tenth of current measure's unit.

If the integer part of the measure has only one digit, then we round its fractional part, keeping two digits.

### Moving the decimal point

Now, we must check for the conditions above to know how many decimals to keep when rounding the measure. How do we keep a decimal after rounding? `Math.round(4.762)` will return `5` no matter how many digits it has right to the decimal point. So, to round `4.762` down to one decimal, we could:

- move the decimal point one digit to the right (by multiplying by ten).
- then round that result, to get the nearest integer.
- and divide by ten again, to move the decimal point one spot back to the left.

This is what `roundToDecimals` does. It takes a `number` to round and a `decPlaces` integer, for the number of digits we want to keep right to decimal point.

```javascript
const roundToDecimals = (number, decPlaces) => {
  let mult;
  if (decPlaces === 0) {
    return Math.round(number);
  } else {
    mult = Math.pow(10, decPlaces);
    return Math.round(number * mult) / mult;
  }
};
```

### Rounding up to 1000

This rounding process has an edge case: our program will take a resulting measure like `999.7` and round it completely to its nearest integer, `1000`, because it already has three digits on its integer part.

If we were working with Ks (thousands), the result would be `1000 Ks`, which should be expressed as `1 M`.

To address this, we perform this check at after rounding the measure:

```javascript
if (rounded === 1000 && i < units.length - 1) {
  //bring 1000 to 1
  rounded = 1;
  //we increment i, to reference the 'previous', larger unit in the array
  i++;
}
//append the unit to the result.
rounded += units[i];
```
