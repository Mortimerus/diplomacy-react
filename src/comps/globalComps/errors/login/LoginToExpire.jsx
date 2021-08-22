import React from 'react';
import { useRootState } from '../../../../states/rootState';
import './loginErrorMsg.css';

const LoginToExpire = () => {
  const rs = useRootState();
  const { jwtExpireMsg } = rs;

  return (
    <div>
      {jwtExpireMsg ? (
        <div className="lgnerrmsgfr">
          session is about to expire
        </div>
      ) : null}
    </div>
  );
};

export default LoginToExpire;
