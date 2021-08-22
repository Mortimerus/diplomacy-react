import React from 'react';
import { useRootState } from '../../../../states/rootState';
import PageTemplateOne from '../../../templates/pageTemplateOne/PageTemplateOne';
import './home.css';

const Home = () => {
  const rs = useRootState();
  const { uiProcLoginIsSending } = rs;
  return (
    <PageTemplateOne>
      {!uiProcLoginIsSending ? (
        <div className="homefr">
          ...hello world
          <p>v_07/26</p>
        </div>
      ) : null}

    </PageTemplateOne>
  );
};

export default Home;
