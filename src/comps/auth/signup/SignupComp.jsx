import React, { useEffect, useReducer } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_1_ENDPOINT_LOGIN, API_3_ENDPOINT_EMAILS, API_3_ENDPOINT_PLAYERS } from '../../../constants/paths/apiEndpoints';
import { API_URL_PLAYERS_3, API_URL_USER_1 } from '../../../constants/paths/apiUrls';
import { ROUTE_HOME, ROUTE_PLAY, WWW_LINK_FORUM } from '../../../constants/paths/appRoutes';
import { useRootDispatch } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import apiCall from '../../http/api/base/apiCall';
import intialSignupState from './initialSignupState';
import reducerSignup from './reducerSignup';
import { SU_POST_SPREAD_OBJ } from './selectorsSignup';
import './signupComp.css';
import { sortyBy3rdItemAsc } from '../../../tools/handleArrays';
import Loader from '../../spinner/loader/Loader';

const SignupComp = () => {
  const [signupState, dispatcherSignupState] = useReducer(reducerSignup, intialSignupState);
  const history = useHistory();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const onSignup = (e) => {
    e.preventDefault();
    dispatcherSignupState({ type: SU_POST_SPREAD_OBJ, payload: { waitingForResponse: true } });
    apiCall(
      'POST',
      API_URL_PLAYERS_3,
      API_3_ENDPOINT_PLAYERS,
      false,
      0,
      false,
      false,
      false,
      {
        pseudo: signupState.pseudo,
        password: signupState.password,
        email: signupState.email,
        telephone: signupState.telephone,
        first_name: signupState.firstName,
        family_name: signupState.lastName,
        nationality: signupState.nationality,
        residence: signupState.residence,
        time_zone: signupState.timeZone,
      },
      false,
    ).then((dat) => {
      console.log(dat);
      if (dat.msg === 'Ok player created') {
        console.log(dat.msg);
        dispatcherSignupState({
          type: SU_POST_SPREAD_OBJ,
          payload: { waitingForResponse: false, didSignUp: true, errorMessage: 0 },
        });
      }
      // ==========
      if (dat.msg.indexOf('already exists') !== -1) {
        dispatcherSignupState({
          type: SU_POST_SPREAD_OBJ,
          payload: {
            waitingForResponse: false, didSignUp: false, errorMessage: 1, pseudo: '',
          },
        });
      }
      if (dat.msg.indexOf('Failed to send email to') !== -1) {
        dispatcherSignupState({
          type: SU_POST_SPREAD_OBJ,
          payload: {
            waitingForResponse: false, didSignUp: false, errorMessage: 2, pseudo: '',
          },
        });
      }
    });
  };
  const onVerifyEmail = (e) => {
    dispatcherSignupState({
      type: SU_POST_SPREAD_OBJ,
      payload: {
        waitingForResponse: true,
      },
    });
    e.preventDefault();
    apiCall(
      'POST',
      API_URL_PLAYERS_3,
      API_3_ENDPOINT_EMAILS,
      false,
      0,
      false,
      rd,
      false,
      {
        pseudo: signupState.pseudo,
        code: signupState.verificationCode,
      },
      false,
    ).then((dat) => {
      if (dat) {
        if (dat.msg === 'Ok code is correct') {
          // auto login after verification
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
              user_name: signupState.pseudo,
              password: signupState.password,
            },
            false,
          ).then((da) => {
            console.log(da);
            window.localStorage.setItem('username', signupState.pseudo);
            window.localStorage.setItem('jwt', da.AccessToken);
            window.localStorage.setItem('jwtTime', Date.now());
            rd({
              type: RS_POST_SPREAD_OBJ,
              payload: {
                isAuth: true,
                jwtToken: da.AccessToken,
                username: signupState.pseudo,
                password: signupState.password,
                jwtTime: Date.now(),
                isNewUser: true,
              },
            });
          }).then(() => history.push(ROUTE_PLAY));
        }
      }
    });
  };

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all?fields=alpha3Code;timezones;translations')
      .then((res) => res.json())
      .then((dat) => {
        let tArr = [];
        for (let i = 0; i < dat.length; i += 1) {
          if (dat[i].translations.fr) {
            tArr = [...tArr, [dat[i].alpha3Code, dat[i].timezones, dat[i].translations.fr]];
          } else {
            tArr = [...tArr, [dat[i].alpha3Code, dat[i].timezones, dat[i].translations.en]];
          }
        }
        dispatcherSignupState({
          type: SU_POST_SPREAD_OBJ,
          payload: { countryArr: tArr.sort(sortyBy3rdItemAsc) },
        });
      });
  }, []);

  return (
    <div className="signup-fr">
      <nav className="sitenav-su-fr">
        <ul className="sitenavul">
          <li>
            <a target="_blank" rel="noreferrer noopener" href={WWW_LINK_FORUM}>forum</a>
          </li>
          <li><NavLink exact to={ROUTE_HOME}>{t('t_001')}</NavLink></li>
        </ul>
      </nav>
      {!signupState.didSignUp && signupState.errorMessage === 0 ? (
        <form hidden={signupState.waitingForResponse} onSubmit={onSignup} className="signup-frm">
          <fieldset>
            <legend><h1>{t('t_082')}</h1></legend>

            <fieldset className="signup-grp">
              <legend>{t('t_081')}</legend>
              <label htmlFor="signupfirstname" className="rw2">
                {t('t_083')}
                <input
                  className={signupState.firstName ? 'isok' : ''}
                  id="signupfirstname"
                  required
                  type="text"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { firstName: e.target.value },
                  })}
                  autoComplete="given-name"
                />
              </label>
              <label htmlFor="signuplastname">
                {t('t_084')}
                <input
                  className={signupState.lastName ? 'isok' : ''}
                  required
                  id="signuplastname"
                  type="text"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { lastName: e.target.value },
                  })}
                  autoComplete="family-name"
                />
              </label>

              {/* nationality */}
              <label htmlFor="perdatnat" className="rw2">
                {t('t_085')}
                <select
                  className={signupState.nationality ? 'isok' : ''}
                  required
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { nationality: e.target.value },
                  })}
                  onBlur={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { nationality: e.target.value },
                  })}
                  id="perdatnat"
                  autoComplete="nationality"
                >
                  <option value="FRA">France</option>
                  {signupState.countryArr ? signupState.countryArr.map((it) => (
                    <React.Fragment key={it[0]}>
                      <option value={it[0]}>{it[2]}</option>
                    </React.Fragment>
                  )) : null}
                  <option value="XXA">{t('t_086')}</option>
                  <option value="XXB">{t('t_087')}</option>
                </select>
              </label>

              {/* residence */}
              <label htmlFor="signupresidence">
                {t('t_088')}
                <select
                  className={signupState.residence ? 'isok' : ''}
                  required
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { residence: e.target.value },
                  })}
                  onBlur={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { residence: e.target.value },
                  })}
                  id="signupresidence"
                  autoComplete="residence"
                >
                  <option className={signupState.residence ? 'isok' : ''} value="FRA">France</option>
                  {signupState.countryArr ? signupState.countryArr.map((it) => (
                    <React.Fragment key={it[0]}>
                      <option
                        className={signupState.residence ? 'isok' : ''}
                        value={it[0]}
                      >
                        {it[2]}
                      </option>
                    </React.Fragment>
                  )) : null}

                </select>
              </label>

              <label htmlFor="signuptimezone" className="rw2">
                {t('t_089')}
                <input
                  className={signupState.timeZone ? 'isok' : ''}
                  required
                  value={signupState.timeZone || ''}
                  id="signuptimezone"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { timeZone: e.target.value },
                  })}
                />
              </label>

            </fieldset>

            <fieldset className="signup-grp">
              <legend>{t('t_090')}</legend>
              <label htmlFor="signupemail" className="rw2">
                {t('t_091')}
                <input
                  className={signupState.emailValid ? 'isok' : ''}
                  required
                  id="signupemail"
                  type="email"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { email: e.target.value },
                  })}
                />
              </label>

              <label htmlFor="signuptel">
                {t('t_092')}
                <input
                  className={signupState.telephoneValid ? 'isok' : ''}
                  required
                  id="signuptel"
                  type="text"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { telephone: e.target.value },
                  })}
                  autoComplete="tel"
                />
              </label>
            </fieldset>

            <fieldset className="signup-grp">
              <legend>{t('t_093')}</legend>
              <label htmlFor="signupusername" className="rw2">
                {t('t_017')}
                <input
                  className={signupState.pseudo ? 'isok' : ''}
                  required
                  id="signupusername"
                  type="text"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { pseudo: e.target.value.replace(/ /g, '_') },
                  })}
                  autoComplete="username"
                />
              </label>

              <label htmlFor="signuppassword">
                <span className="signup-itemdtls-fr">
                  {t('t_018')}
                  <span className="signup-itemdtls">
                    {t('t_118')}
                  </span>
                </span>
                <input
                  className={signupState.passwordStrong ? 'isok' : ''}
                  required
                  id="signuppassword"
                  type="password"
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { password: e.target.value },
                  })}
                  autoComplete="new-password"
                />

              </label>

              <label htmlFor="perdatconf" className="rw2">
                {t('t_094')}
                <input
                  className={signupState.passwordMatch ? 'isok' : ''}
                  required
                  id="perdatconf"
                  type="password"
                  disabled={!signupState.passwordStrong}
                  onChange={(e) => dispatcherSignupState({
                    type: SU_POST_SPREAD_OBJ,
                    payload: { passwordConfirm: e.target.value },
                  })}
                  autoComplete="false"
                />

              </label>

            </fieldset>

            <fieldset className="signup-grp subm">
              <label htmlFor="signupsubmit">
                <input
                  className={`signup-subm-inp${
                    !signupState.pseudo
                      && signupState.passwordMatch
                      && signupState.passwordStrong
                      && signupState.emailValid
                      && signupState.telephoneValid
                      && signupState.firstName
                      && signupState.lastName
                      && signupState.timeZone
                      && signupState.nationality
                      && signupState.residence ? ' isready' : ''}`}
                  id="signupsubmit"
                  type="submit"
                  value={t('t_019')}
                  disabled={
                    !signupState.pseudo
                      || !signupState.passwordMatch
                      || !signupState.passwordStrong
                      || !signupState.emailValid
                      || !signupState.telephoneValid
                      || !signupState.firstName
                      || !signupState.lastName
                      || !signupState.timeZone
                      || !signupState.nationality
                      || !signupState.residence
                  }
                />
              </label>
            </fieldset>
          </fieldset>

        </form>

      ) : null}
      {!signupState.waitingForResponse
      && signupState.didSignUp && signupState.errorMessage === 0 ? (

        <form hidden={signupState.waitingForResponse} onSubmit={onVerifyEmail} className="signup-verycode-frm">
          <fieldset className="signup-verycode signup-grp">
            <legend>enter the verification sent you by mail</legend>
            <input className={signupState.verificationCode.length === 4 ? 'isok' : ''} id="veryemcd" type="number" onChange={(e) => dispatcherSignupState({ type: SU_POST_SPREAD_OBJ, payload: { verificationCode: e.target.value } })} />
            <input className={signupState.verificationCode.length === 4 ? 'isok' : ''} disabled={signupState.verificationCode.length !== 4} id="verysub" value={t('t_019')} type="submit" />
          </fieldset>
        </form>

        ) : null}
      {signupState.waitingForResponse ? <Loader /> : null}
      <div>
        {!signupState.waitingForResponse && signupState.errorMessage !== 0 ? (
          <div className="signup-errmsg-fr">
            <div>
              {`failed to send email to ${signupState.email}`}
              {!signupState.waitingForResponse && signupState.errorMessage === 1 ? ' - a user with this pseudo already exists' : null}
            </div>
            <button type="button" onClick={() => dispatcherSignupState({ type: SU_POST_SPREAD_OBJ, payload: intialSignupState })}>
              ok
            </button>
          </div>
        ) : null}

      </div>

      {console.log(signupState)}
    </div>
  );
};

export default SignupComp;
