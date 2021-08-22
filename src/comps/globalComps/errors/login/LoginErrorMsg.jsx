import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootState } from '../../../../states/rootState';
import './loginErrorMsg.css';

const LoginErrorMsg = () => {
  const rs = useRootState();
  const { uiProcLoginError } = rs;
  const { t } = useTranslation();
  return (
    <>
      {uiProcLoginError > 0 ? (
        <div className="lgnerrmsgfr">
          {uiProcLoginError === 1 ? <div>{t('t_016')}</div> : null }
          {uiProcLoginError === 2 ? <div>{t('t_020')}</div> : null}
        </div>
      ) : null}
    </>
  );
};

export default LoginErrorMsg;
