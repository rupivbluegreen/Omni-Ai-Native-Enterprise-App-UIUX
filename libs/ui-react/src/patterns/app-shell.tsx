import type { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import './app-shell.css';

export interface SidebarItemData {
  key: string;
  label: string;
  icon: ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarNavGroup {
  key: string;
  label: string;
  items: SidebarItemData[];
}

export interface AppShellProps {
  logo: ReactNode;
  navItems?: SidebarItemData[];
  navGroups?: SidebarNavGroup[];
  footerNav?: SidebarItemData[];
  user: { name: string; role: string; initials: string };
  tagline?: string;
  /** Replaces the topbar's search box. Omit for the static placeholder. */
  search?: ReactNode;
  /** Rendered in the topbar before the bell/user block — the company selector, for instance. */
  headerExtra?: ReactNode;
  children: ReactNode;
}

/** The desktop shell: fixed sidebar, top search/notifications/user bar, scrollable content. */
export function AppShell({ logo, navItems, navGroups, footerNav, user, tagline, search, headerExtra, children }: AppShellProps) {
  return (
    <div className="omni-shell">
      <aside className="omni-shell-sidebar">
        <div className="omni-shell-logo">{logo}</div>
        <div className="omni-shell-scroll">
          {navItems && navItems.length > 0 ? (
            <nav className="omni-shell-nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <SidebarItem key={item.key} item={item} />
              ))}
            </nav>
          ) : null}

          {navGroups?.map((group) => (
            <nav key={group.key} className="omni-shell-nav omni-shell-nav--group" aria-label={group.label}>
              <p className="omni-shell-group-label">{group.label}</p>
              {group.items.map((item) => (
                <SidebarItem key={item.key} item={item} />
              ))}
            </nav>
          ))}
        </div>
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
          {search ?? (
            <div className="omni-shell-search">
              <input type="text" placeholder="Search…" aria-label="Global search" disabled />
            </div>
          )}
          <div className="omni-shell-topbar-actions">
            {headerExtra}
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
