import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/containers/main-layout/main-layout.component";
import { EmptyLayoutComponent } from "./layout/containers/empty-layout/empty-layout.component";
import { AuthGuard } from "@core/guards/auth.guard";
import { NotFoundComponent } from "./layout/components/not-found/not-found.component";

const ROUTES: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'members',
        canActivate: [ AuthGuard ],
        loadChildren: () => import('./pages/members/members.module').then(m => m.MembersModule)
      }
    ]
  },
  {
    path: '', component: EmptyLayoutComponent, children: [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
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
