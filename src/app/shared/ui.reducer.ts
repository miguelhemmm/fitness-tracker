import * as uiActions from './ui.actions';

export interface UiState {
  isLoading: boolean;
}


export const initialState: UiState = {
  isLoading: false
};

export function uiReducer(state = initialState, action: uiActions.UIActions) {
  switch (action.type) {
    case uiActions.START_LOADING:
      return {
        isLoading: true
      };
    case uiActions.STOP_LOADING:
      return {
        isLoading: false
      };
    default:
      return state;
   }
  }

export const getIsLoading = ((state: UiState)  => state.isLoading);
