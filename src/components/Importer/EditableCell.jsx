import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function EditableCell({
  value: initialValue,
  row: { index },
  column: { id },
  updateData,
  editable,
}) {
  // update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // only update the external data when the cell is blurred
  const onBlur = () => {
    updateData(index, id, value);
  };

  // if the initialValue is changed externally, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }

  return (
    <input
      className={clsx(
        'block w-full truncate px-2 py-4 focus:border-brand focus:outline-brand focus:ring-brand',
        !value ? 'bg-red-700/40' : 'text-gray-900'
      )}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}
