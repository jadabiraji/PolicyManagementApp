import { Component } from '@angular/core';
import { GenericLoadingService } from './shared/services/generic-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public loadingService: GenericLoadingService) {}
  
  title = 'policy-management-ui';
}
