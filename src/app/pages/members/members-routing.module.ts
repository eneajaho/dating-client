import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from "./containers/members/members.component";
import { MembersGuard } from "@pages/members/guards/members.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    canActivate: [ MembersGuard ],
    component: MembersComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MembersRoutingModule {}
