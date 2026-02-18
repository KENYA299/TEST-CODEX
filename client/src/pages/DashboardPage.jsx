import { useEffect, useMemo, useState } from 'react';
import { apiRequest, clearToken } from '../api';
import StatCard from '../components/StatCard';

const COUNTRY_OPTIONS = ['US', 'CA', 'GB', 'DE', 'FR', 'IN', 'SG', 'BR'];

const defaultForm = {
  platform: '',
  countries: [],
  campaignType: '',
  goal: '',
  quantity: '',
  duration: '',
  dailyPacingControl: '',
  revenue: ''
};

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalCampaigns: 0,
    totalRevenue: 0,
    totalQuantity: 0,
    avgDailyPacing: 0
  });
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  async function loadData() {
    try {
      setError('');
      const [campaignList, summary] = await Promise.all([
        apiRequest('/campaigns'),
        apiRequest('/campaigns/analytics/summary')
      ]);
      setCampaigns(campaignList);
      setAnalytics(summary);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        clearToken();
        window.location.href = '/login';
      }
      setError(err.message);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleCountry(country) {
    setForm((prev) => {
      const hasCountry = prev.countries.includes(country);
      const countries = hasCountry
        ? prev.countries.filter((item) => item !== country)
        : [...prev.countries, country];
      return { ...prev, countries };
    });
  }

  function resetForm() {
    setForm(defaultForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError('');
      const payload = {
        ...form,
        quantity: Number(form.quantity),
        dailyPacingControl: Number(form.dailyPacingControl),
        revenue: Number(form.revenue || 0)
      };

      if (isEditing) {
        await apiRequest(`/campaigns/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest('/campaigns', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      resetForm();
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this campaign?')) {
      return;
    }

    try {
      await apiRequest(`/campaigns/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(campaign) {
    setEditingId(campaign._id);
    setForm({
      platform: campaign.platform,
      countries: campaign.countries,
      campaignType: campaign.campaignType,
      goal: campaign.goal,
      quantity: campaign.quantity,
      duration: campaign.duration,
      dailyPacingControl: campaign.dailyPacingControl,
      revenue: campaign.revenue
    });
  }

  function handleLogout() {
    clearToken();
    window.location.href = '/login';
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Asa Dashboard</h1>
            <p className="text-slate-600">Admin campaign control center</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-900"
          >
            Logout
          </button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Campaigns" value={analytics.totalCampaigns} />
          <StatCard label="Total Revenue" value={`$${analytics.totalRevenue}`} />
          <StatCard label="Total Quantity" value={analytics.totalQuantity} />
          <StatCard label="Avg Daily Pacing" value={analytics.avgDailyPacing} />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {isEditing ? 'Edit Campaign' : 'Create Campaign'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Platform"
              value={form.platform}
              onChange={(e) => updateField('platform', e.target.value)}
              required
            />

            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Campaign Type"
              value={form.campaignType}
              onChange={(e) => updateField('campaignType', e.target.value)}
              required
            />

            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Goal"
              value={form.goal}
              onChange={(e) => updateField('goal', e.target.value)}
              required
            />

            <input
              type="number"
              min="0"
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => updateField('quantity', e.target.value)}
              required
            />

            <input
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Duration (e.g. 30 days)"
              value={form.duration}
              onChange={(e) => updateField('duration', e.target.value)}
              required
            />

            <input
              type="number"
              min="0"
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Daily Pacing Control"
              value={form.dailyPacingControl}
              onChange={(e) => updateField('dailyPacingControl', e.target.value)}
              required
            />

            <input
              type="number"
              min="0"
              className="rounded-md border border-slate-300 px-3 py-2"
              placeholder="Revenue"
              value={form.revenue}
              onChange={(e) => updateField('revenue', e.target.value)}
            />

            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-medium text-slate-700">Countries</p>
              <div className="flex flex-wrap gap-2">
                {COUNTRY_OPTIONS.map((country) => {
                  const active = form.countries.includes(country);
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => toggleCountry(country)}
                      className={`rounded-full px-3 py-1 text-sm ${
                        active
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {country}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2 flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                {isEditing ? 'Update Campaign' : 'Create Campaign'}
              </button>
              {isEditing ? (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300"
                >
                  Cancel Edit
                </button>
              ) : null}
            </div>
          </form>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Campaign List</h2>

          <div className="mt-4 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-600">
                  <th className="px-2 py-2">Platform</th>
                  <th className="px-2 py-2">Countries</th>
                  <th className="px-2 py-2">Type</th>
                  <th className="px-2 py-2">Goal</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Duration</th>
                  <th className="px-2 py-2">Pacing</th>
                  <th className="px-2 py-2">Revenue</th>
                  <th className="px-2 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign._id} className="border-b border-slate-100">
                    <td className="px-2 py-2">{campaign.platform}</td>
                    <td className="px-2 py-2">{campaign.countries.join(', ')}</td>
                    <td className="px-2 py-2">{campaign.campaignType}</td>
                    <td className="px-2 py-2">{campaign.goal}</td>
                    <td className="px-2 py-2">{campaign.quantity}</td>
                    <td className="px-2 py-2">{campaign.duration}</td>
                    <td className="px-2 py-2">{campaign.dailyPacingControl}</td>
                    <td className="px-2 py-2">${campaign.revenue}</td>
                    <td className="px-2 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(campaign)}
                        className="rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(campaign._id)}
                        className="rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!campaigns.length ? (
                  <tr>
                    <td colSpan="9" className="px-2 py-4 text-center text-slate-500">
                      No campaigns yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
