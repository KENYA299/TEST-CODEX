import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold">
          SaaS Starter
        </Link>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link className="hover:text-slate-200" to="/login">
                Login
              </Link>
              <Link className="hover:text-slate-200" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="hover:text-slate-200" to="/dashboard">
                Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link className="hover:text-slate-200" to="/admin">
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-red-500 px-3 py-1 text-sm font-semibold hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
