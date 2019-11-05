export default {
  email: {
    presence: true,
    email: true,
  },
  password: {
    presence: true,
  },
  passwordConfirmation: {
    presence: true,
    equality: { attribute: 'password' },
  },
};
