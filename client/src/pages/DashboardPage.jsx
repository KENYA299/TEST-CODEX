import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const [message, setMessage] = useState('Loading dashboard...');
  const { user } = useAuth();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get('/protected/dashboard');
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Unable to load dashboard details.');
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p className="mt-2 text-slate-600">{message}</p>
      <div className="mt-6 rounded bg-slate-50 p-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p className="mt-1">Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
