import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training-dialog.component';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import * as fromTraining from 'src/app/training/training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
@Output() trainingExit = new EventEmitter();
progress = 0;
timer;
selectedExercise: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store$: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store$.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(availableTraining => {
      this.selectedExercise = availableTraining;
    })
    this.startResumeTimer();
  }

 startResumeTimer() {
  const step = this.selectedExercise.duration / 100 * 1000;
  this.timer = setInterval(() => {
    this.progress += 1;
    if (this.progress >= 100) {
      this.trainingService.completedExercise();
      clearInterval(this.timer);
      }
    }, step);
 }

  stopExercise() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(data => {
    data ? this.trainingService.cancelledExercise(this.progress) : this.startResumeTimer();
    });
  }

  setButtonName() {
    return this.progress === 100 ? 'Return' : 'Stop';
  }
}
