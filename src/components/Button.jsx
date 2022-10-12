import clsx from 'clsx';

export default function Button({ variant = 'normal', className, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm',
        className,
        {
          'bg-brand': variant === 'normal',
          'bg-red-700': variant === 'danger',
          'bg-green-700': variant === 'success',
          'bg-gray-500': variant === 'secondary',
          'bg-yellow-600': variant === 'warning',
        }
      )}
      {...props}
    />
  );
}
