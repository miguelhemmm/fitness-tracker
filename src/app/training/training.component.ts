import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

ongoingTraining = false;
exerciseSubscription: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.poseChange.subscribe(exercise => {
      exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
    });
  }

}
