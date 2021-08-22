import React, { Suspense, useState } from 'react';
import { ChromePicker } from 'react-color';
import PropTypes from 'prop-types';
import { useRootDispatch, useRootState } from '../../../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../../../../states/selectors/sharedSelectors';
import { hasWindow } from '../../../../../../startUp/uAgent';
import './pickOneColor.css';

const PickOneColor = ({ cssPropertiesArr }) => {
  // set current property value as start value

  const currentValue = hasWindow() ? window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(cssPropertiesArr[0]) : 'rgba(0,0,0,1)';

  const [chooseColor, setChoosenColor] = useState(currentValue);
  const rd = useRootDispatch();
  const rs = useRootState();
  const { customTheme } = rs;

  const onChooseColor = (e) => {
    setChoosenColor(e);
    const rgbaObj = e.rgb;
    const convertToRGBA = `rgba(${rgbaObj.r},${rgbaObj.g},${rgbaObj.b},${rgbaObj.a})`;
    document.documentElement.style.setProperty(cssPropertiesArr[0], convertToRGBA);
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        customTheme: {
          ...customTheme,
          [cssPropertiesArr[2]]: convertToRGBA,
        },
      },
    });
  };

  const onChangeInt = (e) => {
    document.documentElement.style.setProperty(cssPropertiesArr[0], e.target.value);
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        customTheme: {
          ...customTheme,
          [cssPropertiesArr[2]]: e.target.value,
        },
      },
    });
  };

  return (
    <div>
      <Suspense fallback="loading">
        <div className="ccpochdr">{cssPropertiesArr[1]}</div>
        {chooseColor ? (
          <>
            {cssPropertiesArr[4] === 'bg'
          || cssPropertiesArr[4] === 'f'
          || cssPropertiesArr[4] === 's'
          || cssPropertiesArr[4] === 'bt'
          || cssPropertiesArr[4] === 'z'
          || cssPropertiesArr[4] === 'p'
              ? (
                <ChromePicker
                  color={chooseColor}
                  onChangeComplete={onChooseColor}
                  disableAlpha={false}
                  width="100%"
                />
              ) : null}
            {cssPropertiesArr[4] === 'za' ? (
              <input type="number" name="strokewidth" defaultValue={currentValue} onChange={onChangeInt} />
            ) : null}
          </>
        ) : null}
      </Suspense>
    </div>
  );
};

export default PickOneColor;

PickOneColor.propTypes = {
  cssPropertiesArr: PropTypes.arrayOf(PropTypes.string).isRequired,
};
