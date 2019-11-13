import { useCallback } from 'react';

export default (handleValueChange, handleBlur, values) =>
  useCallback(
    fieldKey => ({
      value: values[fieldKey] || '',
      onChangeText: text => handleValueChange(fieldKey, text),
      onBlur: () => handleBlur(fieldKey),
    }),
    [handleBlur, handleValueChange, values],
  );
