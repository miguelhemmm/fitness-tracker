import { Action, StateObservable, createFeatureSelector, createSelector } from '@ngrx/store';
import * as trainingActions from '../training/training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from 'src/app/app.reducer';


export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}
// we use this approach because this is a lazy loaded module
export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
};


export function trainingReducer(state = initialState, action: trainingActions.TrainingActions) {
  switch (action.type) {
    case trainingActions.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case trainingActions.SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case trainingActions.START_TRAINING:
      return {
        ...state,
        activeTraining: state.availableExercises.find(exercise => exercise.id === action.payload)
      };

    case trainingActions.STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
      default: {
        return state;
      }
  }
}


export const getTrainignState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainignState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainignState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainignState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainignState, (state: TrainingState) => state.activeTraining != null);
