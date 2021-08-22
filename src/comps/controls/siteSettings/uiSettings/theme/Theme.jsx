import React from 'react';
import { useTranslation } from 'react-i18next';
import { themesArr } from '../../../../../constants/defaults/uiConfig';
// import initUIcustomTheme from '../../../../../states/init/initUIcustomTheme';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ, RS_POST_TOGGLE_BOOL } from '../../../../../states/selectors/sharedSelectors';
import bwContrastFromRGBA from '../../../../../theme/bwContrastFromRGBA';
import { getValueFromCssVar } from '../../../../../theme/cssDOM';
import setCSSVarsFromLocalStorage from '../../../../../theme/setCSSVarsFromLocalStorage';
import themeSetter from '../../../../../theme/themeSetter';
import { arrayRemove } from '../../../../../tools/handleArrays';
import PickFeature from './customColors/pickFeature/PickFeature';
import PickOneColor from './customColors/pickOneColor/PickOneColor';
import './theme.css';

/*
change ui theme color
- maps button of available themes
- sets theme onClick
- save theme to rs
*/
const Theme = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();

  const {
    client, customTheme, themeColor, uiSubSubMenCustomTheme,
    uiTempCustomThemeOpenPickersArr, uiTempCustomThemeHasUnsavedChanges,
    ccUIThemeProps,
  } = rs;
  const { hasLocalStorage } = client;
  // TO CHANGE PLAYERS COLORS PERMANENTLY / SAVE TO LOCALSTORATE, ADD PROPS TO 'cutomTheme'
  const varsFromStateArr = Object.entries(customTheme);

  const onSaveCustomColors = () => {
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        uiTempCustomThemeHasUnsavedChanges: false,
        uiSubSubMenCustomTheme: false,
        uiTempCustomThemeOpenPickersArr: [],
      },
    });
    let arrForLocalStorage = [];
    for (let i = 0; i < varsFromStateArr.length; i += 1) {
      const oneKey = varsFromStateArr[i][0];
      const oneVal = varsFromStateArr[i][1];
      if (oneVal !== null) {
        arrForLocalStorage = arrForLocalStorage.concat(`${oneKey} ${oneVal} `);
      } else {
        for (let j = 0; j < ccUIThemeProps.length; j += 1) {
          if (ccUIThemeProps[j][2] === oneKey) {
            const currentCol = window.getComputedStyle(document.documentElement).getPropertyValue(ccUIThemeProps[j][0]).replace(/ /g, '');
            arrForLocalStorage = arrForLocalStorage.concat(`${oneKey} ${currentCol} `);
          }
        }
      }
    }
    if (hasLocalStorage) {
      localStorage.setItem('customTheme', arrForLocalStorage.toString());
    } else {
      // console.log('values can\'t be saved. localStorage not supported or not enough disk space');
    }
  };

  const onSetTheme = (e) => {
    const theme = e.target.value;
    console.log('___________________d', localStorage.getItem('costomTheme'));
    if (hasLocalStorage) {
      if (theme === 'custom' && localStorage.getItem('customTheme') === null) {
        console.log('is null__________');
        onSaveCustomColors();
      } else {
        localStorage.setItem('themeColor', theme);
      }
    }
    rd({ type: RS_POST_SPREAD_OBJ, payload: { themeColor: theme } });
    if (theme !== 'custom') {
      themeSetter(theme);
      // reset open custom theme menues if not custom
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: { uiSubSubMenCustomTheme: false, uiTempCustomThemeOpenPickersArr: [] },
      });
      // set colors for custom theme
    } else if (hasLocalStorage) {
      setCSSVarsFromLocalStorage(ccUIThemeProps, 'customTheme');
    }
  };

  const onDiscardCustomThemeChanges = () => {
    setCSSVarsFromLocalStorage(ccUIThemeProps, 'customTheme');
    // onSaveCustomColors();
    // setTimeout(() => setCSSVarsFromLocalStorage(ccUIThemeProps, 'customTheme'), 200);
    // onSaveCustomColors();
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        uiSubSubMenCustomTheme: false,
        uiTempCustomThemeOpenPickersArr: [],
        uiTempCustomThemeHasUnsavedChanges: false,
      },
    });
  };

  const onChoosePropertyToChange = (e, arr) => {
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiTempCustomThemeHasUnsavedChanges: true } });
    const alreadyChoosen = e.target.value;
    if (alreadyChoosen === 'c') {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          uiTempCustomThemeOpenPickersArr: [...uiTempCustomThemeOpenPickersArr, arr],
        },
      });
      e.target.value = 'o';
      if (arr[4] !== 'za') {
        e.target.style.backgroundColor = `var(${arr[0]})`;
        e.target.style.color = bwContrastFromRGBA(getValueFromCssVar(arr[0]));
      }
      // no changes of backgroudColor of button for number input (stroke witdh)
    } else {
      const reducedArr = arrayRemove(uiTempCustomThemeOpenPickersArr, arr);
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          uiTempCustomThemeOpenPickersArr: reducedArr,
        },
      });
      e.target.value = 'c';
      e.target.removeAttribute('style');
    }
  };

  const onResetCustomTheme = () => {
    // setCSSVarsFromLocalStorage(ccUIThemeProps, 'customTheme');
    // onSetTheme(e);
    // setTimeout(() => themeSetter('custom'), 300);
    themeSetter('light');
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        uiTempCustomThemeOpenPickersArr: [],
        uiTempCustomThemeHasUnsavedChanges: false,
        themeColor: 'light',
        // ...initUIcustomTheme,
      },
    });
    localStorage.removeItem('customTheme');
    localStorage.setItem('themeColor', 'light');
    window.location.reload();
  };

  return (
    <div>
      {/** theme buttons */}
      <div className="sstheme-thop-fr">
        <table>
          <tbody>

            {themesArr ? themesArr.map((it) => (
              <tr key={it[0]}>
                <td>{t(it[1])}</td>
                <td>
                  <button className={`sssubbtn-btn${themeColor === it[0] ? ' btnactive' : ''}`} type="button" value={it[0]} onClick={(e) => onSetTheme(e)}>
                    {it[0]}
                  </button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      {/** change theme button */}
      {themeColor === 'custom' ? (
        <div className="sstheme-ctrls">
          <table>
            <tbody>
              <tr>
                <td>
                  {t('t_224')}
                </td>
                <td>
                  <button className={uiSubSubMenCustomTheme ? 'btnactive' : ''} type="button" onClick={() => rd({ type: RS_POST_TOGGLE_BOOL, payload: 'uiSubSubMenCustomTheme' })}>
                    {t('t_008')}
                  </button>
                </td>

              </tr>
              <tr>
                <td>
                  {t('t_225')}
                </td>
                <td>
                  <button type="button" value="light" onClick={(e) => onResetCustomTheme(e)}>
                    {t('t_228')}
                  </button>
                </td>
              </tr>

              {/** save colors button */}
              {uiTempCustomThemeHasUnsavedChanges && hasLocalStorage ? (
                <>
                  <tr>
                    <td>{t('t_226')}</td>
                    <td>
                      <button className="btnattention" type="button" onClick={() => onSaveCustomColors()}>
                        {t('t_009')}
                      </button>
                    </td>
                  </tr>
                </>
              ) : null}
              {/** discard custom theme color changes */}
              {uiTempCustomThemeHasUnsavedChanges ? (
                <tr>
                  <td>{t('t_227')}</td>

                  <td>
                    <button type="button" onClick={() => onDiscardCustomThemeChanges()}>
                      {t('t_010')}
                    </button>
                  </td>
                </tr>
              ) : null}

            </tbody>
          </table>

        </div>
      ) : null}

      {/** theme props buttons */}
      {themeColor === 'custom' && uiSubSubMenCustomTheme && ccUIThemeProps ? (
        <div>
          <br />
          <PickFeature
            themeVarsArr={ccUIThemeProps}
            onChoosePropertyToChange={onChoosePropertyToChange}
          />
          {/** color pickers */}
          <div>
            {uiTempCustomThemeOpenPickersArr.length ? uiTempCustomThemeOpenPickersArr.map((it) => (

              <PickOneColor
                key={it[0]}
                cssPropertiesArr={it}
              />

            )) : null}
          </div>
        </div>
      )
        : null}
    </div>
  );
};

export default Theme;
