import * as fromAuth from './auth.actions';
import { LoginResponse } from '@auth/models';

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
      const action = fromAuth.authRedirect();
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
