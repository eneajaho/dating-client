import { ActionReducer, MetaReducer, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { environment } from "../../../environments/environment";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "@store/reducers/custom-route-serializer";

export { CustomSerializer } from './custom-route-serializer';

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const ROOT_REDUCERS: ActionReducerMap<State> = {
  router: routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [ logger ]
  : [];


export const selectRouter = createFeatureSelector<State, RouterReducerState<RouterStateUrl>>(
  'router'
);



