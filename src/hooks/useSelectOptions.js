import { useMemo } from 'react';

export default (items, labelAttribute = 'name', valueAttribute = 'id') =>
  useMemo(() => items.map(item => ({ label: item[labelAttribute], value: item[valueAttribute] })), [
    items,
    labelAttribute,
    valueAttribute,
  ]);
