import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {



private availableExercises: Exercise[] = [];
public avaliableChanged = new Subject();
public finishedChanged =  new Subject();
private subs: Subscription[] = [];

private currentExercise: Exercise;
public poseChange = new Subject<Exercise>();

  constructor(private database: AngularFirestore) { }

  fetchAvailableExercises() {
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
    this.availableExercises = data;
    this.avaliableChanged.next([...this.availableExercises]);
    }, error => {
      console.log(error);
    }));

  }

  startExercise(selecedId: string) {
    const selectedExercise = this.availableExercises.find(exercise => exercise.id === selecedId);
    this.currentExercise = selectedExercise;
    this.poseChange.next({...this.currentExercise});
  }

  completedExercise() {
    this.addDataToDatabase({...this.currentExercise, date: moment().format('DD/MM/YYYY'), state: 'completed' });
    this.currentExercise = null;
    this.poseChange.next(null);
  }

  cancelledExercise(progress: number) {
    this.addDataToDatabase({
      ...this.currentExercise,
      duration: this.currentExercise.duration * (progress / 100),
      calories: this.currentExercise.calories * (progress / 100),
      date: moment().format('DD/MM/YYYY'),
      state: 'cancelled' });
    this.currentExercise = null;
    this.poseChange.next(null);
  }
  getCurrentExercise() {
    return {...this.currentExercise};
  }

  fetchCompletedOrCancelled() {
    this.subs.push(this.database
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercise: Exercise[]) => {
      this.finishedChanged.next(exercise);
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
