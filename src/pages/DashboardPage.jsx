import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAppState } from '../context/AppContext';

export default function DashboardPage() {
  const { analytics, campaigns, revenue } = useAppState();

  const cards = [
    { label: 'Social Views', value: analytics.social.views.toLocaleString(), helper: `${analytics.social.followers.toLocaleString()} followers` },
    { label: 'Video Ad Views', value: analytics.video.adViews.toLocaleString(), helper: `${analytics.video.watchTimeHours.toLocaleString()} watch hours` },
    { label: 'Website Traffic', value: analytics.web.traffic.toLocaleString(), helper: `SEO ${analytics.web.seoScore}` },
    { label: 'Revenue (Last Month)', value: `$${revenue.lastMonth.toLocaleString()}`, helper: `Next est. $${revenue.estimatedNextCampaign.toLocaleString()}` }
  ];

  return (
    <section>
      <SectionHeader
        title="Dashboard"
        description="Metrics overview across social, video, music, website, and business campaign earnings with ad view control visibility."
      />

      <div className="grid cards-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid cards-2">
        <article className="panel">
          <h3>Quick Actions</h3>
          <ul>
            <li>Start Promotion</li>
            <li>LivePulse Chat</li>
            <li>Connect Platforms</li>
            <li>Guidance Tips</li>
            <li>Analytics Insights</li>
            <li>Business Campaigns (RPM & Revenue)</li>
            <li>Ad Views Control (90 days / weeks / months)</li>
          </ul>
        </article>

        <article className="panel">
          <h3>Active Campaigns</h3>
          <ul>
            {campaigns.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> • {item.platform} • {item.status} • {item.quantity} actions
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
