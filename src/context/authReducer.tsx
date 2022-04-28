import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'cheking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: action.payload,
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'signUp':
      return {
        ...state,
        user: action.payload.user,
        status: 'authenticated',
        token: action.payload.token,
        errorMessage: '',
      };
    case 'logOut':
    case 'notAuthenticated':
      return {
        ...state,
        user: null,
        status: 'not-authenticated',
        token: null,
        errorMessage: '',
      };
    default:
      return state;
  }
};
