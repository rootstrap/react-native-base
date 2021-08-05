import React from 'react';
import { Controller } from 'react-hook-form';

import { object, string } from 'prop-types';

const withController = WrappedComponent => {
  const ComponentWithController = ({
    name,
    label,
    control,
    rules = {},
    defaultValue,
    errors = {},
    ...props
  }) => (
    <Controller
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <WrappedComponent
          ref={ref}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={errors[name]}
          {...props}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  );

  ComponentWithController.propTypes = {
    name: string.isRequired,
    label: string.isRequired,
    control: object.isRequired,
    rules: object,
    errors: object,
    defaultValue: string,
  };

  return ComponentWithController;
};

export default withController;
