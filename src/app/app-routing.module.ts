import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent, EmptyLayoutComponent } from "@layout/containers";
import { NotFoundComponent } from "@layout/components";
import { AuthGuard, NonAuthGuard } from "@core/guards";

const ROUTES: Routes = [
  {
    path: '', redirectTo: 'members', pathMatch: 'full'
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'members',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('@pages/members/members.module')
          .then(m => m.MembersModule)
      }
    ]
  },
  {
    path: '', component: EmptyLayoutComponent, children: [
      {
        path: 'auth',
        canActivate: [NonAuthGuard],
        loadChildren: () => import('@auth/auth.module')
          .then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**', component: MainLayoutComponent, children: [
      {
        path: '',  component: NotFoundComponent
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
