import { createFeatureSelector, createSelector, MemoizedSelector } from "@ngrx/store";
import * as fromRouter from '@root-store/router-store/custom-serializer';
import { MembersState } from "../members-state";
import { User } from "@models/User";
import { selectAuthUser } from "@root-store/auth-store/selectors/auth.selectors";


const getMembers = (state: MembersState): any => state.members;
const getLoading = (state: MembersState): boolean => state.loading;
const getMembersError = (state: MembersState): any => state.error;

