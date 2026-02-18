import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboardPage = () => {
  const [data, setData] = useState({ message: 'Loading admin panel...', stats: null });

  useEffect(() => {
    const loadAdminPanel = async () => {
      try {
        const response = await api.get('/protected/admin');
        setData(response.data);
      } catch (error) {
        setData({ message: 'Unable to load admin panel.', stats: null });
      }
    };

    loadAdminPanel();
  }, []);

  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-slate-600">{data.message}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded bg-indigo-50 p-4">
          <h2 className="font-semibold text-indigo-900">Users</h2>
          <p className="text-2xl font-bold text-indigo-700">{data.stats?.users ?? '-'}</p>
        </div>
        <div className="rounded bg-emerald-50 p-4">
          <h2 className="font-semibold text-emerald-900">MRR</h2>
          <p className="text-2xl font-bold text-emerald-700">{data.stats?.mrr ?? '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
