import { createContext, useContext, useMemo, useState } from 'react';
import { defaultCampaign, sampleAnalytics, sampleRevenue, taskTemplates } from '../data/blueprintData';

const AppContext = createContext(null);

function getSeededCampaigns() {
  return [
    {
      id: crypto.randomUUID(),
      ...defaultCampaign,
      name: 'TikTok Discovery Boost',
      platform: 'TikTok',
      contentType: 'Video Post',
      quantity: 1200,
      rpmTarget: 4.8,
      adViewPlan: {
        mode: '90-day',
        dailyViews: 250,
        totalDays: 90
      },
      status: 'queued',
      createdAt: new Date().toISOString(),
      safeAutomation: true,
      notes: 'Algorithm-friendly paced rollout with comments + shares + ad views.'
    }
  ];
}

export function AppProvider({ children }) {
  const [campaigns, setCampaigns] = useState(getSeededCampaigns);
  const [offlineQueue, setOfflineQueue] = useState([]);
  const [batonEnabled, setBatonEnabled] = useState(false);

  const createCampaign = (payload) => {
    const campaign = {
      id: crypto.randomUUID(),
      ...payload,
      status: 'queued',
      createdAt: new Date().toISOString()
    };
    setCampaigns((prev) => [campaign, ...prev]);
  };

  const queueOfflineTask = (taskName) => {
    setOfflineQueue((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        taskName,
        queuedAt: new Date().toISOString(),
        state: 'pending'
      }
    ]);
  };

  const markTaskCompleted = (taskId) => {
    setOfflineQueue((prev) => prev.map((task) => (task.id === taskId ? { ...task, state: 'done' } : task)));
  };

  const value = useMemo(
    () => ({
      campaigns,
      createCampaign,
      offlineQueue,
      queueOfflineTask,
      markTaskCompleted,
      batonEnabled,
      setBatonEnabled,
      analytics: sampleAnalytics,
      revenue: sampleRevenue,
      taskTemplates
    }),
    [campaigns, offlineQueue, batonEnabled]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used inside AppProvider');
  }
  return context;
}
