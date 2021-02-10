import * as fromAuth from './auth.actions';
import {
  clearLoginError,
  clearRegisterError,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess
} from './auth.actions';
import { Credentials, LoginResponse, Register } from '@auth/models';

describe('Auth Actions', () => {

  describe('Guard Logout', () => {
    it('should create a Guard Logout action', () => {
      const action = fromAuth.guardLogout();
      expect(action.type).toEqual('[Auth Guard] Logout');
    });
  });

  describe('User Logout', () => {
    it('should create an User Logout action', () => {
      const action = fromAuth.logout();
      expect(action.type).toEqual('[User Logout] Logout');
    });
  });

  describe('Auth Redirect', () => {
    it('should create an Auth Redirect action', () => {
      const action = fromAuth.redirectToAuth();
      expect(action.type).toEqual('[Auth Guard] Auth Redirect');
    });
  });

  describe('Get User From LocalStorage', () => {
    it('should create a Get User From LocalStorage action with empty user', () => {
      const user: LoginResponse = { id: 1, name: 'test', token: 'testtesttest' };
      const action = fromAuth.getUserLocal({ user });
      expect(action.type).toEqual('[INIT] Get User From LocalStorage');
      expect(action.user).toBe(user);
    });
  });
});

describe('Login Page Actions', () => {

  describe('Login Request', () => {
    it('should create a Login action with credentials', () => {
      const credentials: Credentials = { username: 'test', password: 'test' };
      const action = login({ credentials });
      expect(action.type).toEqual('[Login Page] Login Request');
      expect(action.credentials).toEqual(credentials);
      expect(action.credentials).not.toBeNull();
    });
  });

  describe('Clear Login Error', () => {
    it('should create a Clear Login Error action', () => {
      const action = clearLoginError();
      expect(action.type).toEqual('[Login Page] Clear Login Error');
    });
  });

});

describe('Register Page Actions', () => {

  describe('Register', () => {
    it('should create a Register action with credentials', () => {
      const credentials: Register = {
        username: 'test', birthday: new Date(),
        city: 'T', country: 'T', gender: 'Male',
        knownAs: 'T', password: 'TTTTT'
      };
      const action = register({ credentials });
      expect(action.type).toEqual('[Register Page] Register');
      expect(action.credentials).toEqual(credentials);
      expect(action.credentials).not.toBeNull();
    });
  });

  describe('Clear Register Error', () => {
    it('should create a Clear Register Page Error action', () => {
      const action = clearRegisterError();
      expect(action.type).toEqual('[Register Page] Clear Register Page Error');
    });
  });

});

describe('Auth Api Actions', () => {

  describe('Login Success', () => {
    it('should create a Login Success action with user', () => {
      const user: LoginResponse = { id: 1, name: 'test', token: 'testtesttest' };
      const action = loginSuccess({ user });
      expect(action.type).toEqual('[Auth/API] Login Success');
      expect(action.user).toEqual(user);
      expect(action.user).not.toBeNull();
    });
  });

  describe('Login Failure', () => {
    it('should create a Login Failure action with error', () => {
      const action = loginFailure({ error: 'ErrorTest' });
      expect(action.type).toEqual('[Auth/API] Login Failure');
      expect(action.error).toEqual('ErrorTest');
      expect(action.error).not.toBeNull();
    });
  });

  describe('Register Success', () => {
    it('should create a Register Success action', () => {
      const action = registerSuccess();
      expect(action.type).toEqual('[Auth/API] Register Success');
    });
  });

  describe('Register Failure', () => {
    it('should create a Register Failure action with error', () => {
      const action = registerFailure({ error: 'ErrorTest' });
      expect(action.type).toEqual('[Auth/API] Register Failure');
      expect(action.error).toEqual('ErrorTest');
      expect(action.error).not.toBeNull();
    });
  });

});
