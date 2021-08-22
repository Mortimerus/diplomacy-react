const returnOrderTypeWithLabel = (type, t) => {
  let output = '';
  if (type) {
    if (type === 1) {
      output = t('t_108');
    }
    if (type === 2) {
      output = t('t_103');
    }
    if (type === 3) {
      output = t('t_102');
    }
    if (type === 4) {
      output = t('t_110');
    }
    if (type === 5) {
      output = t('t_111');
    }
    if (type === 6) {
      output = t('t_112');
    }
    if (type === 7) {
      output = t('t_113');
    }
    if (type === 8) {
      output = t('t_114');
    }
    if (type === 9) {
      output = t('t_115');
    }
  }
  return output;
};

export default returnOrderTypeWithLabel;
