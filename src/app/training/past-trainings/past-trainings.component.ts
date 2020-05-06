import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator: MatPaginator;

displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.finishedChanged.pipe(take(1)).subscribe((data: Exercise[]) => {
      this.dataSource.data = data;
    });
    this.trainingService.fetchCompletedOrCancelled();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

}
