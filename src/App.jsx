import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppShell from './layout/AppShell';
import ProtectedRoute from './layout/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CampaignBuilderPage from './pages/CampaignBuilderPage';
import PromotionEnginePage from './pages/PromotionEnginePage';
import LivePulsePage from './pages/LivePulsePage';
import GuidancePage from './pages/GuidancePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MonetizationPage from './pages/MonetizationPage';

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/app/dashboard" replace /> : <LoginPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="campaign-builder" element={<CampaignBuilderPage />} />
        <Route path="promotion-engine" element={<PromotionEnginePage />} />
        <Route path="livepulse" element={<LivePulsePage />} />
        <Route path="guidance" element={<GuidancePage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="monetization" element={<MonetizationPage />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/app/dashboard' : '/login'} replace />} />
    </Routes>
  );
}
