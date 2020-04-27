
export interface AuthState {
  user: any | null;
  loading: boolean;
  loginError: any;
  registerError: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  loginError: null,
  registerError: null
};
