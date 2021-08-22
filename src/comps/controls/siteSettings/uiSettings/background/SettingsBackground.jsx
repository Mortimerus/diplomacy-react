/* eslint-disable no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { svgbgPatternsArr } from '../../../../../constants/defaults/uiConfig';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import svgbgSETTER from '../../../../../theme/svgbgs/svgbgSETTER';
import './settingsBackground.css';

const SettingsBackground = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const { uiBackgroundPattern, client } = rs;
  const { hasLocalStorage } = client;

  const onChoosePattern = (e) => {
    const pattern = e.target.value;
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiBackgroundPattern: pattern } });
    if (hasLocalStorage) {
      window.localStorage.setItem('uiBackgroundPattern', pattern);
    }
  };

  return (
    <div className="bgpattern-fr">
      <table>
        <tbody>
          <tr>
            <td className="bgpattern-lab-td">
              {t('t_223')}
            </td>
            <td>
              <em>
                {uiBackgroundPattern}
              </em>
            </td>
          </tr>
        </tbody>
      </table>
      <div />
      <div>
        {svgbgPatternsArr ? svgbgPatternsArr.map((it) => (
          <button
            onClick={(e) => onChoosePattern(e)}
            value={it[0]}
            type="button"
            className="bgpattern-btn"
            key={it[0]}
            style={{
              maxHeight: '5em',
              ...svgbgSETTER(it[0]),
            }}
          >
            {it[0]}
          </button>
        )) : null}
      </div>
    </div>
  );
};

export default SettingsBackground;
