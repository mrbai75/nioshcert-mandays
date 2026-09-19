import { NavLink } from 'react-router-dom';
import { useRoleStore, type Role } from '@/lib/roleStore';

interface NavItem {
  to: string;
  label: string;
  roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Dashboard',
    roles: ['PIC', 'BD', 'ATD_OFFICER', 'ATD_MANAGER', 'SUPER_ADMIN'],
  },
  { to: '/questionnaire/new', label: 'New Application', roles: ['PIC'] },
  {
    to: '/review',
    label: 'Review Queue',
    roles: ['BD', 'ATD_OFFICER', 'ATD_MANAGER'],
  },
  { to: '/health', label: 'System Health', roles: ['SUPER_ADMIN'] },
];

export function Sidebar() {
  const role = useRoleStore((s) => s.role);
  const items = NAV_ITEMS.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-screen shrink-0">
      <nav className="p-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
