import React, { Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route,
} from 'react-router-dom';
import Home from '../comps/mainViews/pub/home/Home';
import SignUp from '../comps/mainViews/pub/signUp/SignUp';
import Play from '../comps/mainViews/auth/play/Play';
import {
  ROUTE_GAME,
  ROUTE_GAME_DESCRIPTION,
  ROUTE_HOME, ROUTE_PLAY, ROUTE_SIGN_UP,
} from '../constants/paths/appRoutes';
import { useRootState } from '../states/rootState';
import Game from '../comps/mainViews/shared/game/Game';
import GlobalComps from '../comps/globalComps/GlobalComps';
import GameDescription from '../comps/mainViews/shared/gameDescription/GameDescription';

const Routes = () => {
  const rs = useRootState();
  const { isAuth } = rs;

  return (
    <>
      <GlobalComps />
      <BrowserRouter>
        {/* shard routes, auth / non-auth */}
        <Route exact path={`${ROUTE_GAME}/:variant/:gameName`}>
          <Game />
        </Route>

        <Route exact path={`${ROUTE_GAME_DESCRIPTION}/:gameName`}>
          <GameDescription />
        </Route>

        {/* authorized routes */}
        <Route exact path={ROUTE_PLAY}>
          {isAuth ? (
            <Suspense fallback="loading">
              <Play />
            </Suspense>
          ) : null}
        </Route>
        <Route exact path={ROUTE_HOME}>
          {isAuth ? <Redirect to={ROUTE_PLAY} /> : null}
        </Route>

        <Route exact path={ROUTE_SIGN_UP}>
          {isAuth ? <Redirect to={ROUTE_PLAY} /> : null}
        </Route>

        {/* non authorized routes */}
        <Route exact path={ROUTE_HOME}>
          {!isAuth
            ? (
              <Suspense fallback="loading">
                <Home />
              </Suspense>
            ) : null}
        </Route>
        <Route exact path={ROUTE_PLAY}>
          {!isAuth ? <Redirect to={ROUTE_HOME} /> : null}
        </Route>
        <Route exact path={ROUTE_SIGN_UP}>
          <Suspense fallback="loading">
            <SignUp />
          </Suspense>
        </Route>

      </BrowserRouter>
    </>
  );
};

export default Routes;
