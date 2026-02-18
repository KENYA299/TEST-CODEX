import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/campaign-builder', label: 'Campaign Builder' },
  { to: '/app/promotion-engine', label: 'Promotion Engine' },
  { to: '/app/livepulse', label: 'LivePulse' },
  { to: '/app/guidance', label: 'Guidance' },
  { to: '/app/analytics', label: 'Analytics' },
  { to: '/app/monetization', label: 'Monetization' }
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <h1 className="logo">VIROX</h1>
        <p className="tagline">Free-for-Life, Multi-Platform Growth & Monetization Platform</p>

        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>{user.displayName}</p>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
