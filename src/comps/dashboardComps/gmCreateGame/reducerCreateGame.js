import { GMC_POST_ITEM } from './selectorsCreateGame';

const reducerCreateGame = (state, action) => {
  switch (action.type) {
    case GMC_POST_ITEM:
      return {
        ...state,
        [action.item]: action.payload,

      };
    default:
      return state;
  }
};

export default reducerCreateGame;
