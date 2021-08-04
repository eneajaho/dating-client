import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '@store/reducers/custom-route-serializer';
import * as fromAuth from '@store/auth/auth.reducer';

export { CustomSerializer } from './custom-route-serializer';

export interface RootState {
  router: RouterReducerState<RouterStateUrl>;
  [ fromAuth.authStateKey ]: fromAuth.AuthState;
}

export const ROOT_REDUCERS: ActionReducerMap<RootState> = {
  router: routerReducer,
  [ fromAuth.authStateKey ]: fromAuth.reducer
};

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return (state, action) => {
    const result = reducer(state, action);
    /* console.groupCollapsed(action.type);
     console.log('Previous state', state);
     console.log('Action', action);
     console.log('Next state', result);
     console.groupEnd(); */
    return result;
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [ logger ] : [];

export const selectRouter = createFeatureSelector<RootState, RouterReducerState<RouterStateUrl>>(
  'router'
);

export const selectAuthState = createFeatureSelector<RootState, fromAuth.AuthState>(
  fromAuth.authStateKey
);




