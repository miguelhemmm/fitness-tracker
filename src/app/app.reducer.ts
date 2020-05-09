import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';


export interface State {
  ui: fromUI.UiState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
};
// create a functions that brings the state from our reducers
export const getUiState = createFeatureSelector<fromUI.UiState>('ui');
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
// select the state and then do something with that, in this case this is a function that we create in the ui component
export const getisLoading = createSelector(getUiState, fromUI.getIsLoading);
export const getisAuthenticated = createSelector(getAuthState, fromAuth.getIsAuth);
