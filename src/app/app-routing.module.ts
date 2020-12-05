import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@layout/containers";
import { AuthGuard, NonAuthGuard } from "@core/guards";
import { NotFoundComponent, NotFoundModule } from "@shared/components";

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
        loadChildren: async () => (await import('@members/members.module')).MembersModule,
        data: { animation: 'Members'}
      },
      {
        path: 'settings',
        canActivate: [ AuthGuard ],
        loadChildren: async () => (await import('@settings/settings.module')).SettingsModule,
        data: { animation: 'Settings'}
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: { animation: '404'}
      }
    ]
  }
];

@NgModule({
  imports: [
    NotFoundModule,
    RouterModule.forRoot(ROUTES,
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
