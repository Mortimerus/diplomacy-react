import { regexPatternPassword, regexPatternPhone, regexpPatternEmail } from '../../../tools/inputChecks';
import { SU_POST_SPREAD_OBJ } from './selectorsSignup';

const reducerSignup = (state, action) => {
  switch (action.type) {
    case SU_POST_SPREAD_OBJ:
      // set residency on select nationality
      if (action.payload.nationality !== undefined) {
        return {
          ...state,
          ...action.payload,
          timeZone: (() => {
            for (let i = 0; i < state.countryArr.length; i += 1) {
              if (state.countryArr[i][0] === action.payload.nationality) {
                return state.countryArr[i][1][0];
              }
            }
            return { ...state };
          })(),
        };
      }
      if (action.payload.residence !== undefined) {
        return {
          ...state,
          ...action.payload,
          timeZone: (() => {
            for (let i = 0; i < state.countryArr.length; i += 1) {
              if (state.countryArr[i][0] === action.payload.residence) {
                return state.countryArr[i][1][0];
              }
            }
            return { ...state };
          })(),
        };
      }
      if (action.payload.email !== undefined) {
        if (action.payload.email.match(regexpPatternEmail)) {
          return {
            ...state,
            ...action.payload,
            emailValid: true,
          };
        }
        return {
          ...state,
          emailValid: false,
        };
      }
      if (action.payload.telephone !== undefined) {
        if (action.payload.telephone.match(regexPatternPhone)) {
          return {
            ...state,
            ...action.payload,
            telephoneValid: true,
          };
        }
        return {
          ...state,
          telephoneValid: false,
        };
      }

      if (action.payload.password !== undefined) {
        if (action.payload.password.match(regexPatternPassword)) {
          return {
            ...state,
            ...action.payload,
            passwordStrong: true,
          };
        }
        return {
          ...state,
          passwordStrong: false,
        };
      }

      if (action.payload.passwordConfirm !== undefined) {
        if (action.payload.passwordConfirm === state.password) {
          return {
            ...state,
            ...action.payload,
            passwordMatch: true,
          };
        }
        return {
          ...state,
          passwordMatch: false,
        };
      }

      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default reducerSignup;
