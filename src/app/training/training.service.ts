import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable, Subscription, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { UIServiceService } from '../shared/ui-service.service';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/training/training.reducer';
import * as ui from 'src/app/shared/ui.actions';
import * as training from '../training/training.actions';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {



private subs: Subscription[] = [];

private currentExercise: Exercise;
public poseChange = new Subject<Exercise>();

  constructor(private database: AngularFirestore, private uiService: UIServiceService, private store$: Store<fromTraining.State>) { }

  fetchAvailableExercises() {
    // this.uiService.responseChange.next(true);
    this.store$.dispatch(new ui.StartLoading());
    this.subs.push(this.database
    .collection('availableExercises')
    .snapshotChanges().pipe(
    map(dataArray => {
      return dataArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories'],
        };
      });
    }))
    .subscribe((data: Exercise[]) => {
    // this.uiService.responseChange.next(false);
    this.store$.dispatch(new ui.StopLoading());
    this.store$.dispatch(new training.SetAvailableTrainings(data));
    // this.availableExercises = data;
    // this.avaliableChanged.next([...this.availableExercises]);
    }, error => {
      // this.uiService.responseChange.next(false);
      this.store$.dispatch(new ui.StopLoading());
      this.uiService.showSnackBar('Fetching failed, please try again later', null, {duration: 500});
    }));

  }

  startExercise(selectedId: string) {
    // const selectedExercise = this.availableExercises.find(exercise => exercise.id === selecedId);
    // this.currentExercise = selectedExercise;
    // this.poseChange.next({...this.currentExercise});
    this.store$.dispatch(new training.StartTraining(selectedId));
  }

  completedExercise() {
    this.store$.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
      this.addDataToDatabase({...exercise, date: moment().format('DD/MM/YYYY'), state: 'completed' });
    });
    // this.currentExercise = null;
    // this.poseChange.next(null);
    this.store$.dispatch(new training.StopTraining());
  }

  cancelledExercise(progress: number) {
    this.store$.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(exercise => {
    this.addDataToDatabase({
      ...exercise,
      duration: exercise.duration * (progress / 100),
      calories: exercise.calories * (progress / 100),
      date: moment().format('DD/MM/YYYY'),
      state: 'cancelled' });
    });
    // this.currentExercise = null;
    // this.poseChange.next(null);
    this.store$.dispatch(new training.StopTraining());
  }
  getCurrentExercise() {
    return {...this.currentExercise};
  }

  fetchCompletedOrCancelled() {
    this.subs.push(this.database
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercise: Exercise[]) => {
    this.store$.dispatch(new training.SetFinishedTrainings(exercise));
      // this.finishedChanged.next(exercise);
    }, error => {
      console.log(error);
    }));
  }

  private addDataToDatabase(exercise: Exercise) {
    this.database
    .collection('finishedExercises')
    .add(exercise);
  }

  public cancelSubscriptions() {
    this.subs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
