const hasUnitOrder = (orders, zoneId) => {
  let output = false;
  if (orders && zoneId) {
    if (orders.length) {
      for (let i = 0; i < orders.length; i += 1) {
        if (orders[i][3].toString() === zoneId.toString()) {
          output = true;
        }
      }
    }
  }
  return output;
};

export default hasUnitOrder;
