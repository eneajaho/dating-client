import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@layout/containers";
import { NotFoundComponent } from "@layout/components";
import { AuthGuard, NonAuthGuard } from "@core/guards";

const ROUTES: Routes = [
  {
    path: 'auth',
    canActivate: [ NonAuthGuard ],
    loadChildren: async () => (await import('@auth/auth.module')).AuthModule
  },
  {
    path: '', redirectTo: 'members', pathMatch: 'full'
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'members',
        canActivate: [ AuthGuard ],
        loadChildren: async () => (await import('@members/members.module')).MembersModule
      },
      {
        path: 'settings',
        canActivate: [ AuthGuard ],
        loadChildren: async () => (await import('@pages/settings/settings.module')).SettingsModule
      },
      {
        path: '**', component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
