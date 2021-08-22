import { RS_DB_SYS_FETCH_ERROR } from '../selectors/dbSelectors';

const reducerDB = (state, action) => {
  switch (action.type) {
    case RS_DB_SYS_FETCH_ERROR:
      if (state.dbSysFetchErrors.length) {
        return {
          ...state,
          dbSysFetchErrors: [...state.dbSysFetchErrors, action.payload],
        };
      }
      return {
        ...state,
        dbSysFetchErrors: [action.payload],
      };
    case '___dummy':
      return {
        ...state,
        dataVal2: action.payload,
      };

    default:
      return state;
  }
};

export default reducerDB;
