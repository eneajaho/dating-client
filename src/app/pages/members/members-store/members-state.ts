import { User } from "@models/User";

export interface MembersState {
  members: User[] | null;
  loading: boolean;
  error: any;
}

export const initialMembersState: MembersState = {
  members: null,
  loading: null,
  error: null
};
