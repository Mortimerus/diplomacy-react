import React, { Suspense } from 'react';
import StartUp from './comps/startUp/StartUp';
import Routes from './routes/Routes';
import { ProvideRootState } from './states/rootState';
import './i18n';
import './css/gobals/btns.css';
import './css/gobals/fontface.css';
import Spinner from './comps/spinner/Spinner';

const App = () => (
  <ProvideRootState>
    <Suspense fallback={<Spinner />}>
      <StartUp>
        <Routes />
      </StartUp>
    </Suspense>
  </ProvideRootState>
);

export default App;
