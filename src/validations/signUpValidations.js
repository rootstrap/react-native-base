import { equals } from 'utils/helpers';
import commonsValidations from './commonsValidations';

export default Object.freeze({
  ...commonsValidations,
  passwordConfirmation: confirmation => ({
    validate: value => equals(value, confirmation) || 'Passwords do not match',
  }),
});
