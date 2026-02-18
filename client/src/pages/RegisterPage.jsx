import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    adminCreationKey: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = { ...formData };
      if (payload.role !== 'admin') {
        delete payload.adminCreationKey;
      }

      const response = await api.post('/auth/register', payload);
      login(response.data.token, response.data.user);
      navigate(response.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-12 max-w-md rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded border border-slate-300 p-2"
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border border-slate-300 p-2"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full rounded border border-slate-300 p-2"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          className="w-full rounded border border-slate-300 p-2"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {formData.role === 'admin' && (
          <input
            className="w-full rounded border border-slate-300 p-2"
            type="password"
            name="adminCreationKey"
            placeholder="Admin creation key"
            value={formData.adminCreationKey}
            onChange={handleChange}
            required
          />
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded bg-slate-900 p-2 font-semibold text-white hover:bg-slate-800"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already registered?{' '}
        <Link className="font-semibold text-blue-600 hover:underline" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
