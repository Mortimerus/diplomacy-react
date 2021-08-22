import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import './settingsHelp.css';

const SettingsHelp = () => {
  const { t } = useTranslation();
  const rs = useRootState();
  const rd = useRootDispatch();
  const { uiShowHelp } = rs;

  const onDisplayHelp = () => {
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: true } });
    window.localStorage.setItem('uiShowHelp', true);
  };

  const onHideHelp = () => {
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: false } });
    window.localStorage.setItem('uiShowHelp', false);
  };

  return (
    <>
      {uiShowHelp ? (
        <div className="sshelp-fr">
          <table>
            <tbody>
              <tr>
                <td>
                  {/** info boxes are displayed */}
                  {t('t_229')}
                </td>
                <td>
                  <button type="button" onClick={() => onHideHelp()}>
                    {/** hide */}
                    {t('t_230')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="sshelp-fr">
            <table>
              <tbody>
                <tr>
                  <td>
                    {/** info boxes not displayed */}
                    {t('t_231')}
                  </td>
                  <td>
                    <button type="button" onClick={() => onDisplayHelp()}>
                      {/** show */}
                      {t('t_232')}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsHelp;
