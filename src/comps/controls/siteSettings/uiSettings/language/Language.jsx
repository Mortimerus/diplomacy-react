import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguagesArr } from '../../../../../constants/defaults/uiConfig';
import { useRootState, useRootDispatch } from '../../../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../../../states/selectors/sharedSelectors';
import './language.css';

const Language = () => {
  const { i18n, t } = useTranslation();
  const rd = useRootDispatch();
  const rs = useRootState();
  const { currentLanguage } = rs;

  const onSetLanguage = (e) => {
    const choosenLanguage = e.target.name;
    i18n.changeLanguage(choosenLanguage);
    rd({ type: RS_POST_SPREAD_OBJ, payload: { currentLanguage: choosenLanguage } });
  };

  return (
    <div className="ssmnlanguage-fr">
      <table>
        <tbody>
          {supportedLanguagesArr ? supportedLanguagesArr.map((it) => (
            <tr key={`chslng${it[0]}`}>
              <td>
                <button className={currentLanguage === it[0] ? 'btnactive' : ''} name={it[0]} type="button" onClick={(e) => onSetLanguage(e)}>
                  {t(it[1])}
                </button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>

    </div>
  );
};

export default Language;
