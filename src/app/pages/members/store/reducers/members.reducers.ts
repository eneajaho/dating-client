import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from "@ngrx/store";
import { MemberActions, MembersApiActions, MembersPageActions, } from "@members/store/actions";
import { MembersFilter, Pagination, Status, User } from "@core/models";

export const membersEntityFeatureKey = 'membersEntity';

export interface State extends EntityState<User & Status>, Status {
  selectedMemberId: number;
  pagination: Pagination & Status;
  filters: Partial<MembersFilter>;
}

export const adapter: EntityAdapter<User & Status> = createEntityAdapter<User & Status>({
  selectId: (user: User) => user.id
});

export const initialState: State = adapter.getInitialState({
  selectedMemberId: -1,
  pagination: {
    currentPage: NaN,
    itemsPerPage: NaN,
    totalItems: NaN,
    totalPages: NaN,
    loading: false,
    loaded: false,
    error: undefined,
  },
  filters: {
    gender: undefined,
    maxAge: undefined,
    minAge: undefined,
    lastActive: ''
  },
  error: undefined,
  loaded: false,
  loading: false
});


export const reducer = createReducer(initialState,

  /** Set Members Filter */
  on(MembersPageActions.setMembersFilter, (state, { filters }) => ({
    ...state, filters: { ...state.filters, ...filters }
  })),

  /** Load Members **/
  on(MembersPageActions.loadMembers, state => ({
    ...state,
    error: undefined, loaded: false, loading: true
  })),

  on(MembersApiActions.loadMembersSuccess, (state, { members, pagination }) => {
    return adapter.setAll(members, {
        ...state, error: undefined, loaded: true, loading: false,
        pagination: { ...state.pagination, ...pagination, loading: false, loaded: true }
      }
    )
  }),

  on(MembersApiActions.loadMembersFailure, (state, { error }) => ({
    ...state, loaded: false, loading: false, error
  })),


  /** Load more members pagination */
  on(MembersPageActions.loadMoreMembers, state => ({
    ...state,
    pagination: { ...state.pagination, error: undefined, loading: true }
  })),

  on(MembersApiActions.loadMoreMembersSuccess, (state, { members, pagination }) => {
    return adapter.upsertMany(members, {
      ...state,
      pagination: { ...state.pagination, ...pagination, loading: false, loaded: true }
    })
  }),

  on(MembersApiActions.loadMoreMembersFailure, (state, { error }) => ({
    ...state, pagination: { ...state.pagination, error, loading: false, loaded: true }
  })),

  /** Selected Member reducers **/
  on(MemberActions.loadMember, (state, { id }) => {
    return adapter.upsertOne(
      { photos: [], id, loading: true, error: undefined },
      { ...state, selectedMemberId: id }
    );
  }),

  on(MembersApiActions.loadMemberSuccess, (state, { user }) => {
    return adapter.upsertOne(
      { ...user, loading: false, loaded: true, error: undefined },
      state
    );
  }),

  on(MembersApiActions.loadMemberFailure, (state, { error, id }) => {
    return adapter.updateOne({
      id: id, changes: { error: error, loaded: false, loading: false }
    }, state);
  })
);


export const getMemberId = (state: State) => state.selectedMemberId;
export const getFilters = (state: State) => state.filters;
export const getPagination = (state: State) => state.pagination;
export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;
export const getError = (state: State) => state.error;






