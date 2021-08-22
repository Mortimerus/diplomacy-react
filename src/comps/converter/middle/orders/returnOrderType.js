const returnOrderType = (type) => {
  let output = '';
  if (type) {
    if (type === 1) {
      output = '-';
    }
    if (type === 2) {
      output = 'S';
    }
    if (type === 3) {
      output = 'S';
    }
    if (type === 4) {
      output = 'H';
    }
    if (type === 5) {
      output = 'C';
    }
    if (type === 6) {
      output = 'R';
    }
    /**
     * CHECK DEV
     */
    if (type === 7) {
      output = '-';
    }
    if (type === 8) {
      output = '+';
    }
    if (type === 9) {
      output = '-';
    }
  }
  return output;
};

export default returnOrderType;
