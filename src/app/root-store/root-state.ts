import { AuthState } from "./auth-store";
import { MembersState } from "@pages/members/members-store";

export interface AppState {
  auth: AuthState,
  members: MembersState
}
