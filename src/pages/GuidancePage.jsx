import SectionHeader from '../components/SectionHeader';
import { guidance } from '../data/blueprintData';

export default function GuidancePage() {
  return (
    <section>
      <SectionHeader
        title="Guidance & Coaching"
        description="Step-by-step growth and monetization tips tailored to each platform and content category."
      />

      <article className="panel">
        <h3>Daily Recommendations</h3>
        <ul>
          {guidance.map((item) => (
            <li key={item.channel}>
              <strong>{item.channel}:</strong> {item.tip}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
