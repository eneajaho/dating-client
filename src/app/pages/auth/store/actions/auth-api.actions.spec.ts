import * as fromAuthApi from './auth-api.actions';
import { LoginResponse } from '@auth/models';

describe('Auth Api Actions', () => {

  describe('Login Success', () => {
    it('should create a Login Success action with user', () => {
      const user: LoginResponse = { id: 1, name: 'test', token: 'testtesttest' };
      const action = fromAuthApi.loginSuccess({ user });
      expect(action.type).toEqual('[Auth/API] Login Success');
      expect(action.user).toEqual(user);
      expect(action.user).not.toBeNull();
    });
  });

  describe('Login Failure', () => {
    it('should create a Login Failure action with error', () => {
      const action = fromAuthApi.loginFailure({ error: 'ErrorTest' });
      expect(action.type).toEqual('[Auth/API] Login Failure');
      expect(action.error).toEqual('ErrorTest');
      expect(action.error).not.toBeNull();
    });
  });

  describe('Register Success', () => {
    it('should create a Register Success action', () => {
      const action = fromAuthApi.registerSuccess();
      expect(action.type).toEqual('[Auth/API] Register Success');
    });
  });

  describe('Register Failure', () => {
    it('should create a Register Failure action with error', () => {
      const action = fromAuthApi.registerFailure({ error: 'ErrorTest' });
      expect(action.type).toEqual('[Auth/API] Register Failure');
      expect(action.error).toEqual('ErrorTest');
      expect(action.error).not.toBeNull();
    });
  });

});
