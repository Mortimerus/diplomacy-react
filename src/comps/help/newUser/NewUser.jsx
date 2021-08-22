import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import svgbgSETTER from '../../../theme/svgbgs/svgbgSETTER';
import InfoBox from '../infoBox/InfoBox';
import './newUser.css';

const NewUser = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { isNewUser, client, uiBackgroundPattern } = rs;
  const { hasLocalStorage } = client;
  const { t } = useTranslation();

  const onShowHelp = () => {
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: true, isNewUser: false } });
    if (hasLocalStorage) {
      window.localStorage.setItem('uiShowHelp', true);
    }
  };

  const onNotShowHelp = () => {
    rd({ type: RS_POST_SPREAD_OBJ, payload: { uiShowHelp: false, isNewUser: false } });
    if (hasLocalStorage) {
      window.localStorage.setItem('uiShowHelp', false);
    }
  };

  return (
    <>
      {isNewUser ? (
        <div
          className="dash-newuser-fr"
        >
          <div
            className="dash-newuser-inner"
            style={{
              minHeight: '100vh',
              backgroundImage: svgbgSETTER(uiBackgroundPattern),
            }}
          >
            <div className="dash-newuser-cont">

              <h2>{t('t_175')}</h2>
              <p>{t('t_176')}</p>
              <p>{t('t_177')}</p>
              <p>{t('t_178')}</p>
              <InfoBox
                className=""
                summary="t_158"
                list={['t_159']}
              />
              <br />
              <p>{t('t_179')}</p>
              <p>{t('t_180')}</p>
              <div className="dash-newuser-btn-fr">
                <button type="button" onClick={() => onShowHelp()}>
                  {t('t_181')}
                </button>
                <button type="button" onClick={() => onNotShowHelp()}>
                  {t('t_182')}
                </button>
              </div>

            </div>

          </div>
        </div>
      ) : null}

    </>
  );
};

export default NewUser;
