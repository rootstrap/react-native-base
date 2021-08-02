import { useState, useCallback } from 'react';
import { isEmpty, pickBy, mapValues } from 'lodash';

const useForm = (
  {
    onSubmit, // Callback for when the form submits
    initialValues = {}, // Initial values that the form should load with
    validator = () => {}, // validation function that already contains the appropriate constraints
    validateOnChange = false, // should validate on change?
    validateOnBlur = false, // should validate on blur?
    validateAll = false, // should validate all when one field changes? Set it to true for forms with fields that depend on other fields
  },
  ...dependencies
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [activeFields, setActiveFields] = useState({});
  const [touched, setTouched] = useState({});

  const handleSubmit = useCallback(() => {
    const newErrors = validator(values) || {};

    setTouched(mapValues(newErrors, () => true));

    const valid = !Object.values(newErrors)
      .filter(error => !!error)
      .reduce((acc, error) => {
        error.forEach(e => acc.push(e));
        return acc;
      }, []).length;
    if (valid) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, setErrors, validator, onSubmit, ...dependencies]);

  const runValidations = useCallback(
    (newValues, key) => {
      const result = validator(newValues) || {};
      if (!validateAll && key) {
        setErrors({ ...errors, [key]: result[key] });
      } else {
        setErrors(result);
      }
    },
    [validator, errors, setErrors, validateAll],
  );

  const handleValueChange = useCallback(
    (key, value, isInitialSetup = false) => {
      const newValues = {
        ...values,
        [key]: value,
      };
      setValues(newValues);
      if (validateOnChange) {
        runValidations(newValues, !isInitialSetup && key);
      }
    },
    [values, setValues, runValidations, validateOnChange],
  );

  const handleFocus = useCallback(
    key => {
      setActiveFields({
        ...activeFields,
        [key]: true,
      });
    },
    [activeFields, setActiveFields],
  );

  const handleBlur = useCallback(
    key => {
      setActiveFields({
        ...activeFields,
        [key]: false,
      });
      if (validateOnBlur) runValidations(values, key);
      setTouched({ ...touched, [key]: true });
    },
    [activeFields, setActiveFields, runValidations, values, validateOnBlur, setTouched, touched],
  );

  const formHasErrors = !isEmpty(pickBy(errors));

  return {
    values,
    setValues,
    errors,
    setErrors,
    activeFields,
    setActiveFields,
    handleValueChange,
    handleSubmit,
    handleFocus,
    handleBlur,
    touched,
    formHasErrors,
  };
};

export default useForm;
