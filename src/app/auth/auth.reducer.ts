import { Action } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';


export interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: authActions.AuthActions) {
  switch (action.type) {
    case authActions.SET_AUTH:
      return {
        isAuthenticated: true
      };
    case authActions.SET_UNAUTH:
      return {
        isAuthenticated: false
      };
      default: {
        return state;
      }
  }
}

export const getIsAuth = ((state: AuthState)  => state.isAuthenticated);
