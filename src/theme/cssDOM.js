export const getValueFromCssVar = (cssCustomVariable) => {
  const el = window.getComputedStyle(document.documentElement)
    .getPropertyValue(cssCustomVariable);
  return el;
};

export const changeCssStyleProps = (cssClass, cssProperty, newValue) => {
  const els = document.getElementsByClassName(cssClass);
  if (els !== undefined) {
    if (els.length) {
      for (let i = 0; i < els.length; i += 1) {
        els[i].style[cssProperty] = newValue;
      }
    }
  }
};
