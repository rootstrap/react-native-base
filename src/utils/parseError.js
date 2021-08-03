import strings from 'localization';

const parseErrors = errors => {
  if (errors) {
    const { fullMessages, base } = errors;

    if (fullMessages) {
      const [firstMessage] = fullMessages;
      return firstMessage;
    }

    if (base) {
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

  return strings.COMMON.somethingWentWrong;
};

/**
 * Parses the body of an error response.
 *
 * First, it checks for `error`, and `errors` presence.
 * If error is present, that will be returned as is.
 *
 * Otherwise, errors will be checked, first for `fullMessages` and `base`.
 *
 * If one of those keys is present, the first message on the array will be returned
 * in other case, the first key-value pair is returned as a string.
 * Lastly, if `errors` is an array, the first value will be returned.
 *
 * ## Examples:
 *
 * 1- `{ error: "Unauthorized"' }` returns `"Unauthorized"`
 *
 * 2- `{ errors: { fullMessages: ["User not found"]}}` returns `"User not found"`
 *
 * 3- `{ errors: { base: ["User not found"]}}` returns `"User not found"`
 *
 * 4- `{ errors: { firstName: ["can't be blank"]}}` returns `"firstName can't be blank"`
 *
 * 5- `{ errors: ['Some error'] }` returns `"Some error"`
 */
export default err => {
  if (!err) return strings.COMMON.somethingWentWrong;

  const { error, errors } = err.data;

  if (error) return error;

  return parseErrors(errors);
};
