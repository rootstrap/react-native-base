import validate from 'validate.js';

export const login = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  }
};

export const signUp = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true
  },
  passwordConfirmation: {
    presence: true,
    equality: { attribute: 'password' }
  }
};

validate.validators.presence.options = { allowEmpty: false };

export const validations = constraints =>
  data => validate(data, constraints) || {};
