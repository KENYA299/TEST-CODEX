import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-lg bg-white p-8 text-center shadow">
      <h1 className="text-3xl font-bold text-slate-900">SaaS Starter Template</h1>
      <p className="mt-4 text-slate-600">
        Full stack starter with React + Vite, Express, MongoDB, JWT authentication, and
        role-based access control.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Link to="/register" className="rounded bg-slate-900 px-4 py-2 font-semibold text-white">
          Get Started
        </Link>
        <Link to="/login" className="rounded border border-slate-300 px-4 py-2 font-semibold text-slate-700">
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
