import { useCallback } from 'react';

export default (
    handleValueChange: (arg0: any, arg1: any, arg2: any) => any, // callback for when the value changes
    handleFocus: (arg0: any) => any, // callback after focus
    handleBlur: (arg0: any) => any, // callback after blur
    values: { [x: string]: any }, // all values, it returns the correct one given the key
    errors: { [x: string]: any }, // all errors, it returns the correct one given the key
    activeFields: { [x: string]: any }, // all fields active state, it returns the correct one given the key
    touchedFields: { [x: string]: any }, // all fields touched state, it returns the correct one given the key
) =>
    useCallback(
        (fieldKey) => ({
            value: values[fieldKey] || '',
            error: Array.isArray(errors[fieldKey]) ? errors[fieldKey][0] : errors[fieldKey] || '',
            // Is currently active?
            active: activeFields[fieldKey] || false,
            // Has been touched?
            touched: touchedFields[fieldKey] || false,
            onChangeText: (text: string, isInitialSetup: boolean) =>
                handleValueChange(fieldKey, text, isInitialSetup),
            onFocus: () => handleFocus(fieldKey),
            onBlur: () => handleBlur(fieldKey),
        }),
        [handleFocus, handleBlur, handleValueChange, values, errors, activeFields, touchedFields],
    );
