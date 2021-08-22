import React from 'react';
// import BeforeExpire from '../auth/beforeExpire/BeforeExpire';
// import TokenHandler from '../auth/tokenHandler/TokenHandler';
import SiteSettingsBtn from '../controls/siteSettings/menBtn/SiteSettingsBtn';
import SiteSettingsMain from '../controls/siteSettings/siteSettingsMain/SiteSetingsMain';
import HttpErrorMsg from './errors/http/HttpErrorMsg';
import LoginErrorMsg from './errors/login/LoginErrorMsg';
import LoginToExpire from './errors/login/LoginToExpire';

const GlobalComps = () => (
  <>
    <SiteSettingsBtn />
    <SiteSettingsMain />
    <HttpErrorMsg />
    <LoginErrorMsg />
    <LoginToExpire />
  </>
);

export default GlobalComps;
