import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, setToken } from '../api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ secretKey })
      });
      setToken(data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-slate-900">Asa Admin Login</h1>
        <p className="mt-2 text-sm text-slate-500">Private admin-only access by secret key.</p>

        <label className="mt-6 block text-sm font-medium text-slate-700">Secret Key</label>
        <input
          type="password"
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter admin secret key"
          required
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
