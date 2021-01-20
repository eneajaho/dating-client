import * as fromRegisterPage from './register-page.actions';
import { Register } from '@auth/models';

describe('Register Page Actions', () => {

  describe('Register', () => {
    it('should create a Register action with credentials', () => {
      const credentials: Register = {
        username: 'test', birthday: new Date(),
        city: 'T', country: 'T', gender: 'Male',
        knownAs: 'T', password: 'TTTTT'
      };
      const action = fromRegisterPage.register({ credentials });
      expect(action.type).toEqual('[Register Page] Register');
      expect(action.credentials).toEqual(credentials);
      expect(action.credentials).not.toBeNull();
    });
  });

  describe('Clear Register Error', () => {
    it('should create a Clear Register Page Error action', () => {
      const action = fromRegisterPage.clearRegisterError();
      expect(action.type).toEqual('[Register Page] Clear Register Page Error');
    });
  });

});
