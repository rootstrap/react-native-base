const DEFAULT_ERROR = 'something went wrong';

// TODO: fix types definition based on the error response from the backend
const parseErrors = (errors: any) => {
  if (errors) {
    const { fullMessages, base } = errors;
    if (errors.fullMessages) {
      const [firstMessage] = fullMessages;
      return firstMessage;
    }

    if (errors.base) {
      const [firstMessage] = base;
      return firstMessage;
    }

    if (Array.isArray(errors)) {
      return errors[0];
    }

    const errorKey = Object.keys(errors)[0];
    const error = errors[errorKey][0];
    return `${errorKey} ${error}`;
  }

  return DEFAULT_ERROR;
};

// TODO: fix types definition based on the error response from the backend
export default ({ response }: any) => {
  if (!response) {
    return DEFAULT_ERROR;
  }

  const { error, errors } = response.data;

  if (error) {
    return error;
  }

  return parseErrors(errors);
};
