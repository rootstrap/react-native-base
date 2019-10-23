import { useCallback } from 'react';
import validate from 'validate.js';

validate.validators.presence.options = { allowEmpty: false };

export default (constraints, options = {}) =>
  useCallback(values => validate(values, constraints, options), [constraints, options]);
