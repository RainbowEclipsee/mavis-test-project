'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.css';

export default function Header() {
  const path = usePathname();

  const navItems = [
    { href: '/schedule',label: 'График работы'   },
    { href: '/employees', label: 'Сотрудники' },
    { href: '/about',   label: 'О приложении' }
  ];

  return (
    <header className="app-header">
      <div className="logo"> МАВИС</div>
      <nav className="main-nav">
        <ul>
          {navItems.map((item) => {
            const isActive = path === item.href || path.startsWith(item.href + '/');
            return (
              <li key={item.href}>
                <Link href={item.href} className={isActive ? 'nav-link active' : 'nav-link'}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
