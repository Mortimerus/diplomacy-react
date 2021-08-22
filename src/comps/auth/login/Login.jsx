import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { API_1_ENDPOINT_LOGIN } from '../../../constants/paths/apiEndpoints';
import { API_URL_USER_1 } from '../../../constants/paths/apiUrls';
import { ROUTE_GAME, ROUTE_PLAY, ROUTE_SIGN_UP } from '../../../constants/paths/appRoutes';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import { regexPatternPassword } from '../../../tools/inputChecks';
import apiCall from '../../http/api/base/apiCall';
import Loader from '../../spinner/loader/Loader';
import './login.css';

const Login = () => {
  const rd = useRootDispatch();
  const rs = useRootState();
  const { uiProcLoginIsSending, isAuth, username } = rs;
  const [usernameS, setUsername] = useState(username || '');
  const [passw, setPassw] = useState('');
  const { t } = useTranslation();
  const history = useHistory();
  const { push } = history;

  const onLogin = (e) => {
    e.preventDefault();
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        uiProcLoginIsSending: true,
        uiProcLoginError: false,
      },
    });
    const promiseToken = new Promise((resolve) => {
      apiCall(
        'POST',
        API_URL_USER_1,
        API_1_ENDPOINT_LOGIN,
        false,
        0,
        false,
        rd,
        false,
        {
          user_name: usernameS,
          password: passw,
        },
        false,
      )
        .then((dat) => {
          // console.log('login respones \n', dat);
          if (dat === undefined || dat === '_CATCH_') {
            rd({
              type: RS_POST_SPREAD_OBJ,
              payload: {
                uiProcLoginIsSending: false,
                uiProcLoginError: 1,
              },
            });
            setTimeout(() => {
              rd({
                type: RS_POST_SPREAD_OBJ,
                payload: {
                  uiProcLoginError: null,
                },
              });
            }, 2000);
          } else {
            if (dat.AccessToken) {
              rd({
                type: RS_POST_SPREAD_OBJ,
                payload: {
                  uiProcLoginIsSending: false,
                  uiProcLoginError: false,
                },
              });
              resolve(dat.AccessToken);
            }
            if (dat.msg === 'Bad user_name or password') {
              rd({
                type: RS_POST_SPREAD_OBJ,
                payload: {
                  uiProcLoginIsSending: false,
                  uiProcLoginError: 2,
                },
              });
              setTimeout(() => {
                rd({
                  type: RS_POST_SPREAD_OBJ,
                  payload: {
                    uiProcLoginError: null,
                  },
                });
              }, 2000);
            }
          }
        });
    });
    const currentDate = new Date();
    const jwtTime = currentDate.getTime();
    promiseToken.then((to) => {
      rd({
        type: RS_POST_SPREAD_OBJ,
        payload: {
          isAuth: true,
          jwtToken: to,
          username: usernameS,
          password: passw,
          jwtTime,
        },
      });
      window.localStorage.setItem('username', usernameS);
      window.localStorage.setItem('jwt', to);
      window.localStorage.setItem('jwtTime', jwtTime);
    }).then(() => {
      if (!history.location.pathname.includes(`${ROUTE_GAME}/`)) {
        push(ROUTE_PLAY);
      }
    });
  };

  return (
    <>
      {!isAuth ? (
        <div className="frmfr">
          {uiProcLoginIsSending ? (
            <div className="loader-frame">
              <Loader />
            </div>
          ) : (
            <form onSubmit={onLogin} className="frmlogin">
              <fieldset>
                <input required className={usernameS.length > 2 ? 'isok' : ''} id="loginusername" placeholder={t('t_017')} type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value.replace(' ', '_'))} value={usernameS || ''} />
                <input required className={passw.match(regexPatternPassword) ? 'isok' : ''} id="loginpass" placeholder={t('t_018')} type="password" autoComplete="current-password" onChange={(e) => setPassw(e.target.value)} />
                <input className={`loginsubm${passw.match(regexPatternPassword) && usernameS.length > 2 ? ' isok' : ''}`} type="submit" value={t('t_119')} />
                <input className="sgnpinpbrdvw" type="button" value={t('t_120')} onClick={() => history.push(ROUTE_SIGN_UP)} />
              </fieldset>
            </form>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Login;
