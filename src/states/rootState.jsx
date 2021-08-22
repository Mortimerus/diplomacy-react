import React, {
  createContext, useContext, useReducer, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import reducerDB from './reducers/reducerDB';
import reducerUI from './reducers/reducerUI';
import initialStateData from './init/initDB';
import initialStateUI from './init/initUI';

const dispatchContext = createContext();
const stateContext = createContext();

export const useRootState = () => useContext(stateContext);
export const useRootDispatch = () => useContext(dispatchContext);

const useProvideRootState = () => {
  const combineDispatches = (...dispatches) => (action) => {
    if (dispatches.length) {
      for (let i = 0; i < dispatches.length; i += 1) {
        dispatches[i](action);
      }
    }
  };

  const [rsData, rdData] = useReducer(reducerDB, initialStateData);
  const [rsUI, rdUI] = useReducer(reducerUI, initialStateUI);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const combinedDispatch = useCallback(combineDispatches(
    rdData, rdUI,
  ), [rdData, rdUI]);

  const combinedState = useMemo(() => ({
    ...rsData,
    ...rsUI,
  }), [rsData, rsUI]);

  return {
    combinedDispatch,
    combinedState,
  };
};

export const ProvideRootState = ({ children }) => {
  const base = useProvideRootState();

  return (
    <dispatchContext.Provider value={base.combinedDispatch}>
      <stateContext.Provider value={base.combinedState}>
        {children}
      </stateContext.Provider>
    </dispatchContext.Provider>
  );
};

ProvideRootState.propTypes = {
  children: PropTypes.element.isRequired,
};
