import { User } from "../models/User.model";

export interface State {
  user: User | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  user: null,
  loading: false,
  error: null
};
