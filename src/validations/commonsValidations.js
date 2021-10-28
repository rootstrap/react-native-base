export default {
  email: {
    required: {
      value: true,
      message: "Email can't be blank",
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: 'Email is not a valid email',
    },
  },
  password: {
    required: {
      value: true,
      message: "Password can't be blank",
    },
  },
};
