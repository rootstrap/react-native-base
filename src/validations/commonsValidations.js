export default {
  email: {
    required: {
      value: true,
      message: "Email can't be blank",
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Entered value does not match email format',
    },
  },
  password: {
    required: {
      value: true,
      message: "Password can't be blank",
    },
  },
};
