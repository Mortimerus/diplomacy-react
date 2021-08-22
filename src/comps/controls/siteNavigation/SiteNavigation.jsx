import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  WWW_LINK_FORUM, ROUTE_HOME, ROUTE_PLAY, ROUTE_SIGN_UP,
} from '../../../constants/paths/appRoutes';
import { useRootState } from '../../../states/rootState';
import './siteNavigation.css';
import Login from '../../auth/login/Login';
import { UI_STATE_BOARDVIEW_COMM, UI_STATE_BOARDVIEW_DEFAULT, UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import HomeIcon from '../../icons/home/HomeIcon';

const SiteNavigation = () => {
  const rs = useRootState();
  const {
    isAuth, uiMenSiteNav, uiBoardLayout, uiProcLoginIsSending,
  } = rs;
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const { t } = useTranslation();

  return (
    <div className={`flexframe ${uiBoardLayout === UI_STATE_BOARDVIEW_COMM ? ' iscomm' : ''}`}>
      {uiMenSiteNav ? (
        <nav className="sitenavfr">
          {!uiProcLoginIsSending ? (
            <ul className="sitenavul">
              {/** non auth routes */}
              {uiBoardLayout !== UI_STATE_BOARDVIEW_DEFAULT
              || uiBoardLayout !== UI_STATE_BOARDVIEW_FULLMAP ? (
                <li>
                  <a target="_blank" rel="noreferrer noopener" href={WWW_LINK_FORUM}>{t('t_233')}</a>
                </li>
                ) : null}
              {!isAuth ? (
                <>

                  {pathname !== ROUTE_HOME
                    ? (
                      <li>
                        <NavLink exact to={ROUTE_HOME}>
                          <HomeIcon />
                        </NavLink>
                      </li>
                    ) : null}
                  {pathname !== ROUTE_SIGN_UP
                    ? <li className="navlink-signup-li"><NavLink to={ROUTE_SIGN_UP}>{t('t_002')}</NavLink></li> : null}
                </>
              ) : (
                <>
                  {/** auth routes */}
                  {pathname !== ROUTE_PLAY
                    ? <li><NavLink exact to={ROUTE_PLAY}><HomeIcon /></NavLink></li> : null}
                </>
              )}
              {/** shared routes */}
            </ul>
          ) : null}

        </nav>
      ) : null}

      {!isAuth ? <Login /> : null}
      {console.log(uiBoardLayout)}
    </div>
  );
};

export default SiteNavigation;
