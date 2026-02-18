import SectionHeader from '../components/SectionHeader';
import { useAppState } from '../context/AppContext';

export default function MonetizationPage() {
  const { revenue, campaigns } = useAppState();

  return (
    <section>
      <SectionHeader
        title="Monetization"
        description="Track donations, tips, merch, business campaign earnings, per-video revenue, and next-campaign projections."
      />

      <div className="grid cards-2">
        <article className="panel">
          <h3>Earnings Snapshot</h3>
          <p>Last month: <strong>${revenue.lastMonth.toLocaleString()}</strong></p>
          <p>Estimated next campaign: <strong>${revenue.estimatedNextCampaign.toLocaleString()}</strong></p>

          <h4>Revenue Per Content</h4>
          <ul>
            {revenue.perContent.map((entry) => (
              <li key={entry.title}>
                {entry.title} — ${entry.earnings.toLocaleString()}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h3>Business Promotion Model</h3>
          <ul>
            <li>Creators: free-for-life core platform</li>
            <li>Businesses: paid multi-platform campaign distribution</li>
            <li>Optional sponsored recommendations + affiliates</li>
            <li>SEO and traffic partnership opportunities</li>
          </ul>

          <h4>Campaign Count</h4>
          <p>{campaigns.length} configured campaign(s)</p>
        </article>
      </div>
    </section>
  );
}
