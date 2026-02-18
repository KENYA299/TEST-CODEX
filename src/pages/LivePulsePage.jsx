import SectionHeader from '../components/SectionHeader';

const prompts = [
  'Highlight comments automatically every 45 seconds.',
  'Ask a monetization CTA: tips, merch, or subscription.',
  'Shout out new followers and supporters.',
  'Pin gift and subscription prompts for peak windows.'
];

export default function LivePulsePage() {
  return (
    <section>
      <SectionHeader
        title="LivePulse Chat"
        description="Real-time stream engagement assistant for Twitch, YouTube, and TikTok live sessions."
      />

      <div className="grid cards-2">
        <article className="panel">
          <h3>Overlay Controls</h3>
          <ul>
            <li>Comment highlights</li>
            <li>Q&A prompts</li>
            <li>Follower shoutouts</li>
            <li>Subscription reminders</li>
            <li>Gift management cues</li>
          </ul>
        </article>

        <article className="panel">
          <h3>Smart Prompt Queue</h3>
          <ul>
            {prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
