import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@layout/containers';
import { NonAuthGuard } from '@core/guards/non-auth.guard';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotFoundComponent } from '@layout/components/not-found.component';

export const routes: Routes = [
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
    RouterModule.forRoot(routes,
      { relativeLinkResolution: 'legacy' }
    ),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
