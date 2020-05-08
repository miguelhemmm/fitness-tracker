import { NgForm } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIServiceService } from 'src/app/shared/ui-service.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

exercises: Exercise[];
isLoading = true;
loadingSubscription: Subscription;
trainingSubscription: Subscription;

  constructor(private trainingService: TrainingService, private database: AngularFirestore, private uiService: UIServiceService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.responseChange.pipe().subscribe(response => {
    this.isLoading = response;
    });
    this.trainingService.avaliableChanged.pipe().subscribe((data: Exercise[]) => {
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

  ngOnDestroy() {
    this.loadingSubscription ? this.loadingSubscription.unsubscribe() : '';
    this.trainingSubscription ? this.trainingSubscription.unsubscribe() : '';
  }
}
