import type { ReactNode } from 'react';
import { Bell, Search } from 'lucide-react';
import './app-shell.css';

export interface SidebarItemData {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

export interface AppShellProps {
  logo: ReactNode;
  navItems: SidebarItemData[];
  footerNav?: SidebarItemData[];
  user: { name: string; role: string; initials: string };
  tagline?: string;
  children: ReactNode;
}

/** The desktop shell: fixed sidebar, top search/notifications/user bar, scrollable content. */
export function AppShell({ logo, navItems, footerNav, user, tagline, children }: AppShellProps) {
  return (
    <div className="omni-shell">
      <aside className="omni-shell-sidebar">
        <div className="omni-shell-logo">{logo}</div>
        <nav className="omni-shell-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <SidebarItem key={item.key} item={item} />
          ))}
        </nav>
        <div className="omni-shell-sidebar-spacer" />
        {footerNav ? (
          <nav className="omni-shell-nav omni-shell-nav--footer" aria-label="Settings">
            {footerNav.map((item) => (
              <SidebarItem key={item.key} item={item} />
            ))}
          </nav>
        ) : null}
        {tagline ? <p className="omni-shell-tagline">{tagline}</p> : null}
      </aside>

      <div className="omni-shell-main">
        <header className="omni-shell-topbar">
          <div className="omni-shell-search">
            <Search size={18} aria-hidden="true" />
            <input type="text" placeholder="Search products, orders, customers…" aria-label="Global search" />
            <kbd className="omni-shell-kbd">⌘K</kbd>
          </div>
          <div className="omni-shell-topbar-actions">
            <button type="button" className="omni-shell-bell" aria-label="Notifications">
              <Bell size={18} />
              <span className="omni-shell-bell-dot" aria-hidden="true" />
            </button>
            <div className="omni-shell-user">
              <span className="omni-shell-avatar" aria-hidden="true">
                {user.initials}
              </span>
              <span className="omni-shell-user-meta">
                <span className="omni-shell-user-name">{user.name}</span>
                <span className="omni-shell-user-role">{user.role}</span>
              </span>
            </div>
          </div>
        </header>
        <main className="omni-shell-content">{children}</main>
      </div>
    </div>
  );
}

function SidebarItem({ item }: { item: SidebarItemData }) {
  return (
    <a href={item.href} className="omni-shell-nav-item" data-active={item.active ? 'true' : 'false'}>
      <span className="omni-shell-nav-icon">{item.icon}</span>
      <span>{item.label}</span>
    </a>
  );
}
