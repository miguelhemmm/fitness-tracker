import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService, private database: AngularFirestore) { }

  ngOnInit() {
    this.trainingService.avaliableChanged.pipe(take(1)).subscribe((data: Exercise[]) => {
     this.exercises = data;
    });
    this.trainingService.fetchAvailableExercises();
  }
 onStartTraining(form: NgForm) {
  this.trainingService.startExercise(form.value.pose);
  }
}
