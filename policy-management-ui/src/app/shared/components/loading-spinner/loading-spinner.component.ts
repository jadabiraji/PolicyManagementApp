import { Component, OnInit } from '@angular/core';
import { GenericLoadingService } from 'src/app/shared/services/generic-loading.service'; // Adjust the path

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  constructor(public loadingService: GenericLoadingService) {}

  ngOnInit(): void {}
}
