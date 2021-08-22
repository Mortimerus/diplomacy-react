// get css values of custom theme for localStorate and set CSS variables
// (<constants/defaults/uiConfig/themeVarsArr>, <localStorageKey>)
// themeVarsArr: [CSS Selector, property description, rs key]
const setCSSVarsFromLocalStorage = (themeVarsArr, localStorageKey) => {
  const colorSettingsFromLocalStorage = localStorage.getItem(localStorageKey);
  if (colorSettingsFromLocalStorage !== null) {
    const colorsArr = colorSettingsFromLocalStorage.split(' ,');
    if (colorsArr.length) {
      for (let i = 0; i < colorsArr.length; i += 1) {
        const onePropertyArr = colorsArr[i].split(' ');
        const cssVal = onePropertyArr[1];
        const rsCustomThemeItemKey = onePropertyArr[0];
        if (themeVarsArr.length) {
          for (let j = 0; j < themeVarsArr.length; j += 1) {
            if (themeVarsArr[j][2] === rsCustomThemeItemKey) {
              if (cssVal !== 'null' && cssVal !== null) {
                document.documentElement.style.setProperty(themeVarsArr[j][0], cssVal);
              }
            }
          }
        }
      }
    }
  }
};

export default setCSSVarsFromLocalStorage;
