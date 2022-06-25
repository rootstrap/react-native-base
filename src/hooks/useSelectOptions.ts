import { useMemo } from 'react';

export default (items: { [x: string]: any }[], labelAttribute = 'name', valueAttribute = 'id') =>
    useMemo(
        () =>
            items.map((item: { [x: string]: any }) => ({
                label: item[labelAttribute],
                value: item[valueAttribute],
            })),
        [items, labelAttribute, valueAttribute],
    );
