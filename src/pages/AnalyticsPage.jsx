import SectionHeader from '../components/SectionHeader';
import StatCard from '../components/StatCard';
import { useAppState } from '../context/AppContext';

export default function AnalyticsPage() {
  const { analytics } = useAppState();

  const cards = [
    { label: 'Social Likes', value: analytics.social.likes.toLocaleString(), helper: `${analytics.social.comments.toLocaleString()} comments` },
    { label: 'Music Streams', value: analytics.music.streams.toLocaleString(), helper: `${analytics.music.playlistAdds.toLocaleString()} playlist adds` },
    { label: 'Video Subscribers', value: analytics.video.subscribers.toLocaleString(), helper: `${analytics.video.joinClicks.toLocaleString()} join clicks` },
    { label: 'Website CTR', value: `${analytics.web.ctr}%`, helper: `${analytics.web.backlinks.toLocaleString()} backlinks` },
    { label: 'RPM', value: `$${analytics.revenue.rpm}`, helper: `Retention ${analytics.revenue.retention}%` },
    { label: 'Business Promo', value: `$${analytics.revenue.businessPromo.toLocaleString()}`, helper: 'Cross-platform campaign earnings' }
  ];

  return (
    <section>
      <SectionHeader
        title="Analytics & Insights"
        description="Cross-channel performance, ad views, RPM trends, retention, and campaign scaling insights."
      />

      <div className="grid cards-3">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>
    </section>
  );
}
