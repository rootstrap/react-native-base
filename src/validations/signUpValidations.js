import { equals } from 'utils/helpers';
import commonsValidations from './commonsValidations';

export default Object.freeze({
  ...commonsValidations,
  passwordConfirmation: confirmation => ({
    required: {
      value: true,
      message: "Password confirmation can't be blank",
    },
    validate: value =>
      equals(value, confirmation) || 'Password confirmation is not equal to password',
  }),
});
