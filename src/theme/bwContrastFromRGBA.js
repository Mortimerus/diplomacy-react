function bwContrastFromRGBA(rgbaString) {
  let outp = '';
  if (rgbaString) {
    const rgbaStr = rgbaString;
    const strOne = rgbaStr.replace('rgba(', '').replace(')', '');
    const rgbaArr = strOne.split(',');
    if (rgbaArr.length) {
      const r = parseInt(255 - parseInt(rgbaArr[0], 10), 10);
      const g = parseInt(255 - parseInt(rgbaArr[1], 10), 10);
      const b = parseInt(255 - parseInt(rgbaArr[2], 10), 10);
      if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) {
        outp = 'rgba(255,255,255,1)';
      } else {
        outp = 'rgba(0,0,0,1)';
      }
    }
  }
  return outp;
}

export default bwContrastFromRGBA;
