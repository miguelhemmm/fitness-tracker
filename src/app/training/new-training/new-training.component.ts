import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIServiceService } from 'src/app/shared/ui-service.service';
import * as fromTraining from 'src/app/training/training.reducer';
import * as fromApp from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit{

exercises: Exercise[];
isLoading: boolean;

  constructor(
    private trainingService: TrainingService,
    private database: AngularFirestore,
    private uiService: UIServiceService,
    private store$: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store$.select(fromApp.getisLoading).subscribe(isloading => this.isLoading = isloading);
    this.store$.select(fromTraining.getAvailableExercises).subscribe((data: Exercise[]) => {
    this.exercises = data;
    });
    this.fetchAgain();
  }
 onStartTraining(form: NgForm) {
  this.trainingService.startExercise(form.value.pose);
  }

  fetchAgain() {
    this.trainingService.fetchAvailableExercises();
  }

}
