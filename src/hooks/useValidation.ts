import { useCallback } from 'react';
import validate from '@rootstrap/validate';

(validate as any).validators.presence.options = { allowEmpty: false };

export default (constraints: any, options = {}) =>
  useCallback(values => validate(values, constraints, options), [constraints, options]);
