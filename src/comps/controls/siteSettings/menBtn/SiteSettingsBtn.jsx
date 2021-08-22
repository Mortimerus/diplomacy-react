import React from 'react';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import { RS_POST_TOGGLE_BOOL } from '../../../../states/selectors/sharedSelectors';
import './siteSettingsBtn.css';

const SiteSettingsBtn = () => {
  const rd = useRootDispatch();
  const rs = useRootState();
  const { uiMenSiteSettings } = rs;
  return (
    <div className="ss3dfr">
      <button type="button" onClick={() => rd({ type: RS_POST_TOGGLE_BOOL, payload: 'uiMenSiteSettings' })}>
        <div className={`ss3d${uiMenSiteSettings ? ' btnactive' : ''}`} />
        <div className={`ss3d${uiMenSiteSettings ? ' btnactive' : ''}`} />
        <div className={`ss3d${uiMenSiteSettings ? ' btnactive' : ''}`} />
      </button>
    </div>
  );
};

export default SiteSettingsBtn;
