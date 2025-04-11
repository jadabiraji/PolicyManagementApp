import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyFormComponent } from './policy-form/policy-form.component';
import { PolicyListComponent } from './policy-list/policy-list.component';

const routes: Routes = [
  { path: '', component: PolicyListComponent },
  { path: 'new', component: PolicyFormComponent },
  { path: 'edit/:id', component: PolicyFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyManagementRoutingModule {}
