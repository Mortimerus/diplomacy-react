/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../states/rootState';
import browserConfig from './browserConfig';
import { RS_POST_SPREAD_OBJ } from '../../states/selectors/sharedSelectors';
import themeSetter from '../../theme/themeSetter';
import { themeVarsArr, TOKEN_LIFESPAN_IN_MS, TOKEN_WARNING_TO_BE_EXPIRED_IN_MS } from '../../constants/defaults/uiConfig';
import useCurrentDim from './useCurrentDim';
import svgbgSETTER from '../../theme/svgbgs/svgbgSETTER';
import './startUp.css';
// import { ReactComponent as Lisbon } from '../../theme/svgbgs/lisbon.svg';

/*
start up tasks
- save supported features of browser ('client') to rs
- UI: get theme preferences of browser dark/light ('themeColor')
- UI: set colors if custom theme
- save DOM ref of main window to rs ('dom.refMain')
 */

const StartUp = ({ children }) => {
  const rd = useRootDispatch();
  const rs = useRootState();
  const ref = useRef();
  const dim = useCurrentDim();
  const { i18n } = useTranslation(null, { useSuspense: false });
  const { language } = i18n;
  const { uiBackgroundPattern } = rs;

  useEffect(() => {
    const supportedByUserAgent = browserConfig();
    // save main dom ref and browser settings to rs
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        ...supportedByUserAgent,
        dom: { refMain: ref },
        ...dim,
      },
    });
    // SET THEME
    if (supportedByUserAgent) {
      if (supportedByUserAgent.themeColor !== 'custom') {
        themeSetter(supportedByUserAgent.themeColor);
        // set colors for customTheme
      } else if (supportedByUserAgent.client.hasLocalStorage) {
        // settings from localStorage?
        const colorSettingsFromLocalStorage = localStorage.getItem('customTheme');
        if (colorSettingsFromLocalStorage !== null) {
          const colorsArr = colorSettingsFromLocalStorage.split(' ,');
          if (colorsArr.length) {
            for (let i = 0; i < colorsArr.length; i += 1) {
              const onePropertyArr = colorsArr[i].split(' ');
              const cssVal = onePropertyArr[1];
              const rsCustomThemeItemKey = onePropertyArr[0];
              const customTheme = {};
              if (themeVarsArr.length) {
                for (let j = 0; j < themeVarsArr.length; j += 1) {
                  if (themeVarsArr[j][2] === rsCustomThemeItemKey) {
                    document.documentElement.style.setProperty(themeVarsArr[j][0], cssVal);
                    customTheme[rsCustomThemeItemKey] = cssVal;
                  }
                }
              }
              rd({ type: RS_POST_SPREAD_OBJ, payload: customTheme });
            }
          }
        }
      }
      if (supportedByUserAgent.client.hasLocalStorage) {
        // check for uiHelp and backgroundPattern
        const uiShowHelpInLocalStorage = localStorage.getItem('uiShowHelp');
        const uiBackgroundPatternInLocalStorage = localStorage.getItem('uiBackgroundPattern');
        if (uiShowHelpInLocalStorage === 'true') {
          rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: true } });
        } else {
          rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: false } });
        }
        if (uiBackgroundPatternInLocalStorage === null) {
          // default
          rd({ type: RS_POST_SPREAD_OBJ, payload: { uiBackgroundPattern: 'Lisbon' } });
        } else {
          rd({
            type: RS_POST_SPREAD_OBJ,
            payload: { uiBackgroundPattern: uiBackgroundPatternInLocalStorage },
          });
        }
        // check for valid token
        const currentDate = new Date();
        const currentTimeT = currentDate.getTime();
        const tokenInLocalStorage = localStorage.getItem('jwt');
        const tokenTimeInLocalStorage = localStorage.getItem('jwtTime');
        const usernameL = localStorage.getItem('username');
        if (usernameL) {
          rd({ type: RS_POST_SPREAD_OBJ, payload: { username: usernameL } });
        }
        if (tokenInLocalStorage && tokenTimeInLocalStorage) {
          const tokenTimeLSInt = parseInt(tokenTimeInLocalStorage, 10);
          const timeOutIn = parseInt(tokenTimeLSInt + TOKEN_LIFESPAN_IN_MS - currentTimeT, 10);
          if (timeOutIn > 0) {
            console.log('token expires in', timeOutIn / 60000);
            rd({
              type: RS_POST_SPREAD_OBJ,
              payload: {
                isAuth: true,
                jwtToken: tokenInLocalStorage,
                jwtTime: tokenTimeInLocalStorage,
              },
            });
            const currentTime = currentDate.getTime();
            const msLeft = parseInt(parseInt(tokenTimeInLocalStorage, 10)
            + TOKEN_LIFESPAN_IN_MS - currentTime, 10);
            const warningAfter = parseInt(tokenTimeInLocalStorage, 10)
            + TOKEN_LIFESPAN_IN_MS - currentTime
              - TOKEN_WARNING_TO_BE_EXPIRED_IN_MS;

            if (msLeft > 0) {
              // minHeight: '100vh',
              setTimeout(() => {
                rd({
                  type: RS_POST_SPREAD_OBJ,
                  payload: {
                    isAuth: null,
                    jwtTime: null,
                    jwtToken: null,
                    password: null,
                    jwtExpireMsg: null,
                  },
                });
                localStorage.removeItem('jwt');
                localStorage.removeItem('jwtTime');
              }, msLeft);
              if (warningAfter > 0) {
                console.log('send delayed warning', msLeft, warningAfter);
                setTimeout(() => {
                  rd({
                    type: RS_POST_SPREAD_OBJ,
                    payload: {
                      jwtExpireMsg: true,
                    },
                  });
                }, warningAfter);
              } else {
                console.log('send direct warning', msLeft, warningAfter);
                rd({
                  type: RS_POST_SPREAD_OBJ,
                  payload: {
                    jwtExpireMsg: true,
                  },
                });
              }
            }
          } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('jwtTime');
          }
        }
      }
    }
    // store language to rs
    if (language) {
      rd({ type: RS_POST_SPREAD_OBJ, payload: { currentLanguage: language } });
    }
  }, [rd, i18n, language]);

  return (
    <div
      className="g-bg-fr"
      ref={ref}
      style={{
        minHeight: '100vh',
        ...svgbgSETTER(uiBackgroundPattern),
      }}
    >
      {children}
    </div>
  );
};

export default StartUp;

StartUp.propTypes = {
  children: PropTypes.element.isRequired,
};
