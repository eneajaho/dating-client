import * as fromLoginPage from './login-page.actions';
import { Credentials } from '@auth/models';

describe('Login Page Actions', () => {

  describe('Login Request', () => {
    it('should create a Login action with credentials', () => {
      const credentials: Credentials = { username: 'test', password: 'test' };
      const action = fromLoginPage.login({ credentials });
      expect(action.type).toEqual('[Login Page] Login Request');
      expect(action.credentials).toEqual(credentials);
      expect(action.credentials).not.toBeNull();
    });
  });

  describe('Clear Login Error', () => {
    it('should create a Clear Login Error action', () => {
      const action = fromLoginPage.clearLoginError();
      expect(action.type).toEqual('[Login Page] Clear Login Error');
    });
  });

});
