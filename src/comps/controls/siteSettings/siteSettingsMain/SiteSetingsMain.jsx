import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { siteSettingsPropsArr } from '../../../../constants/defaults/uiConfig';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import { RS_UI_POST_TOOGLE_SITE_SETTINGS_SUBMENUES } from '../../../../states/selectors/uiSelectors';
import Logout from '../../../auth/logout/Logout';
import { hasWindow } from '../../../startUp/uAgent';
import AuthTimer from '../authTimer/AuthTimer';
import SiteSettingsBtn from '../menBtn/SiteSettingsBtn';
import SettingsBackground from '../uiSettings/background/SettingsBackground';
import SettingsHelp from '../uiSettings/help/SettingsHelp';
import Language from '../uiSettings/language/Language';
import Theme from '../uiSettings/theme/Theme';
import './siteSettingsMain.css';

const SiteSettingsMain = () => {
  const rs = useRootState();
  const [colorSettings, setColorSettings] = useState('');
  const [importedSettings, setImportedSettings] = useState('');
  const [didCopyToClipboard, setDidCopytoClipboard] = useState(false);
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const {
    uiMenSiteSettings, uiSubMenUIColors, uiSubMenMemory, uiSubMenLanguage,
    isAuth, username, jwtToken, jwtTime, uiSubSubMenCustomTheme, uiSubMenHelp,
    uiSubMenBackgroundPattern, themeColor,
  } = rs;

  const onGetColorsFromLocalStorage = () => {
    if (hasWindow) {
      const colsSets = window.localStorage.getItem('customTheme');
      if (colsSets) {
        setColorSettings(colsSets);
      }
    }
  };

  const onImportColorSettings = () => {
    if (hasWindow) {
      window.localStorage.setItem('customTheme', importedSettings);
      window.localStorage.setItem('themeColor', 'custom');
      window.location.reload();
    }
  };

  const onCopytoClipBoard = () => {
    navigator.clipboard.writeText(colorSettings);
    setDidCopytoClipboard(true);
  };

  return (
    <div className={`ssmnfr${uiMenSiteSettings ? ' ssmnfropen' : ''}${uiSubSubMenCustomTheme || uiSubMenLanguage || uiSubMenBackgroundPattern || uiSubMenMemory || uiSubMenBackgroundPattern || uiSubMenHelp || uiSubMenUIColors ? ' scrl' : ''}`}>

      {uiMenSiteSettings ? (
        <div>

          <SiteSettingsBtn />

          <div className="ssmn-hdr">{t('t_007')}</div>

          {isAuth && username ? (
            <div>
              {jwtToken === 3 && jwtTime ? <AuthTimer /> : null}
            </div>
          ) : null}

          <div className="ssmn-tbl-fr">
            <table>
              <tbody>
                {isAuth && username ? (
                  <>
                    <tr>
                      <td>
                        <Logout />
                      </td>
                      <td />
                    </tr>
                    <tr className="ssmn-acc-tr">
                      <td />
                      <td>
                        {username ? username.replace(/_/, ' ') : ''}
                      </td>
                      {jwtToken === 3 && jwtTime ? <AuthTimer /> : null}
                    </tr>
                  </>
                ) : null}
                {siteSettingsPropsArr ? siteSettingsPropsArr.map((it) => (
                  <tr key={`sspar${it[1]}`}>
                    <td>
                      <span>
                        {t(it[2])}
                      </span>
                    </td>
                    <td>
                      <button className={rs[it[1]] ? 'btnactive' : ''} name={it[1]} type="button" onClick={(e) => rd({ type: RS_UI_POST_TOOGLE_SITE_SETTINGS_SUBMENUES, payload: e.target.name })}>
                        {t(it[0])}
                      </button>
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>

          {uiSubMenUIColors ? <Theme /> : null}

          {uiSubMenLanguage ? <Language /> : null}

          {uiSubMenMemory ? (
            <div>
              <div className="ssmn-subinfo-fr">
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="2">
                        {t('t_214')}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {t('t_212')}
                      </td>
                      <td>
                        <button disabled={themeColor !== 'custom'} type="button" onClick={() => onGetColorsFromLocalStorage()}>
                          {/** export */}
                          {themeColor === 'custom' ? t('t_211') : t('t_219')}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {t('t_213')}
                      </td>
                      <td>
                        <button disabled={!importedSettings} type="button" onClick={() => onImportColorSettings()}>
                          {/** import */}
                          {importedSettings ? t('t_210') : t('t_220')}
                        </button>
                      </td>
                    </tr>
                    {colorSettings ? (
                      <>
                        <tr>
                          <td colSpan="2">
                            <div className={`ssmn-colcode${didCopyToClipboard ? ' didcopy' : ''}`}><code>{colorSettings}</code></div>

                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            <button type="button" onClick={() => onCopytoClipBoard()}>
                              {/* save to clipboard */}
                              {t('t_221')}
                            </button>
                          </td>

                        </tr>
                      </>
                    ) : null}
                    <tr>
                      <td colSpan="2">
                        <input className={importedSettings ? 'hasinput' : ''} type="text" placeholder={t('t_222')} onChange={(e) => setImportedSettings(e.target.value)} />
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>

            </div>
          ) : null}

          {uiSubMenHelp ? (
            <SettingsHelp />
          ) : null}

          {uiSubMenBackgroundPattern ? <SettingsBackground /> : null}

        </div>
      ) : null}
      {console.log('rs in SiteSettingsMain \n', rs)}
    </div>
  );
};

export default SiteSettingsMain;
