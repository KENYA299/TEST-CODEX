import SectionHeader from '../components/SectionHeader';
import { useAppState } from '../context/AppContext';

export default function PromotionEnginePage() {
  const { campaigns, offlineQueue, queueOfflineTask, taskTemplates, batonEnabled } = useAppState();

  return (
    <section>
      <SectionHeader
        title="Promotion Engine (Safe Automation Core)"
        description="Rotational exposure, paced delivery, offline queue, and multi-task baton orchestration."
      />

      <div className="grid cards-2">
        <article className="panel">
          <h3>Automation Controls</h3>
          <ul>
            <li>Rotational exposure pools</li>
            <li>Time-based algorithm-friendly pacing</li>
            <li>Monetization optimization with RPM tracking</li>
            <li>Offline queue execution on reconnect</li>
            <li>Baton status: {batonEnabled ? 'Enabled' : 'Disabled'}</li>
          </ul>

          <button type="button" onClick={() => queueOfflineTask('Run queued promotion cycle safely')}>
            Queue Offline Task
          </button>
        </article>

        <article className="panel">
          <h3>Campaigns</h3>
          <ul>
            {campaigns.map((campaign) => (
              <li key={campaign.id}>
                <strong>{campaign.name || 'Untitled Campaign'}</strong> — {campaign.platform} / {campaign.contentType} / {campaign.intent}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <article className="panel">
        <h3>Template Tasks</h3>
        <ul>
          {taskTemplates.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </article>

      <article className="panel">
        <h3>Offline Queue</h3>
        {offlineQueue.length ? (
          <ul>
            {offlineQueue.map((task) => (
              <li key={task.id}>
                {task.taskName} — {task.state} — {new Date(task.queuedAt).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No queued tasks yet.</p>
        )}
      </article>
    </section>
  );
}
