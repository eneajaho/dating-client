import { AuthUser } from '../../pages/auth/models/AuthUser';
import * as fromAuth from './auth.actions';
import { loginSuccess, registerUserSuccess } from './auth.actions';

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
      const user: AuthUser = { id: 1, name: 'test', token: 'testtesttest' };
      const action = fromAuth.getUserLocal({ user });
      expect(action.type).toEqual('[INIT] Get User From LocalStorage');
      expect(action.user).toBe(user);
    });
  });
});

describe('Auth Api Actions', () => {

  describe('Login Success', () => {
    it('should create a Login Success action with user', () => {
      const user: AuthUser = { id: 1, name: 'test', token: 'testtesttest' };
      const action = loginSuccess({ user });
      expect(action.type).toEqual('[Auth/API] Login Success');
      expect(action.user).toEqual(user);
      expect(action.user).not.toBeNull();
    });
  });

  describe('Register Success', () => {
    it('should create a Register Success action', () => {
      const user: AuthUser = { id: 1, name: 'test', token: 'testtesttest' };
      const action = registerUserSuccess({ user });
      expect(action.user).toEqual(user);
      expect(action.user).not.toBeNull();
      expect(action.type).toEqual('[Auth/API] Register User Success');
    });
  });

});
