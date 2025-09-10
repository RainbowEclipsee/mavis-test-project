'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './Header.css';

interface NavItems {
  href: string
  label: string
}

const Header: FC = () => {
  const path = usePathname();

  const navItems: NavItems[] = [
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

export default Header
