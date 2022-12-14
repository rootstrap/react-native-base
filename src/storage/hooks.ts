import { useCallback, useMemo } from 'react';
import { StorageInstance } from 'storage';

type StoredValueHookParams<TKeys extends string> = {
  key: TKeys;
  instance: StorageInstance<TKeys>;
};

export const useStoredValue = <T, TKeys extends string>({
  key,
  instance,
}: StoredValueHookParams<TKeys>): T | undefined =>
  useMemo(() => {
    try {
      const _value = instance.get(key);
      return _value ? (JSON.parse(_value) as T) : undefined;
    } catch (error) {
      return undefined;
    }
  }, [key, instance]);

export const useStoredValueListener = <T, TKeys extends string>({
  key,
  instance,
}: StoredValueHookParams<TKeys>): [value: T | undefined, setValue: (newValue?: T) => void] => {
  const [value, setValue] = instance.useValueListener(key);

  const parsedValue = useMemo(() => {
    try {
      return value ? (JSON.parse(value) as T) : undefined;
    } catch (error) {
      return undefined;
    }
  }, [value]);

  const setParsedValue = useCallback(
    (newValue?: T) => {
      try {
        const _value = JSON.stringify(newValue);
        setValue(_value);
      } catch (error) {
        setValue(undefined);
      }
    },
    [setValue],
  );

  return [parsedValue, setParsedValue];
};
