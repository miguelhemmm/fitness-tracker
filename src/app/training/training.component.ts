import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit{

ongoingTraining: boolean;

  constructor(private trainingService: TrainingService, private store$: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store$.select(fromTraining.getIsTraining).subscribe(exercise => {
      exercise ? this.ongoingTraining = true : this.ongoingTraining = false;
    });
  };


}
