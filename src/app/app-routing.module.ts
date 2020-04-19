import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./layout/containers/main-layout/main-layout.component";
import { EmptyLayoutComponent } from "./layout/containers/empty-layout/empty-layout.component";
import { AuthGuard } from "./core/guards/auth.guard";


const ROUTES: Routes = [
  {
    path: '', canActivate: [ AuthGuard ], component: MainLayoutComponent, children: []
  },
  {
    path: '', component: EmptyLayoutComponent, children: [
      {
        path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
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
