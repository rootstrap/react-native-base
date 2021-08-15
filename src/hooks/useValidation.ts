import { useCallback } from 'react';
import validate from '@rootstrap/validate';

export default (constraints: any, options = {}) =>
    useCallback(
        (values) => validate(values, constraints, { ...options, ...{ allowEmpty: false } }),
        [constraints, options],
    );
