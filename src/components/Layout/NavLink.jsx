import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import clsx from 'clsx';

export default function NavLink({ children, to, icon: Icon, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={clsx(
        match
          ? 'bg-gray-300 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
      )}
      aria-current={match ? 'page' : undefined}
      {...props}
    >
      {Icon && (
        <Icon
          className={clsx(
            match ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
            'mr-3 h-6 w-6 flex-shrink-0'
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </Link>
  );
}
