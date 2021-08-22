import React from 'react';
import { useRootDispatch } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';

const Logout = () => {
  const rd = useRootDispatch();

  const onLogOut = () => {
    rd({
      type: RS_POST_SPREAD_OBJ,
      payload: {
        isAuth: false,
        jwtToken: null,
        password: null,
        jwtTime: null,
      },
    });
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('tokexp');
    window.location.reload();
  };

  return (
    <button type="button" onClick={() => onLogOut()}>
      logout
    </button>
  );
};

export default Logout;
