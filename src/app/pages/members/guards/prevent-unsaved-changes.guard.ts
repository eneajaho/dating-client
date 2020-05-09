import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditAccountComponent, MemberEditProfileComponent } from "@members/components";

@Injectable({ providedIn: 'root' })
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditProfileComponent | MemberEditAccountComponent,
                currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot) {

    if (component.form.dirty) {
      return confirm('Are you sure you want to continue? \nAny unsaved changes will be lost!')
    }
    return true;
  }

}
