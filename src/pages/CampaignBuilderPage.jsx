import { useMemo, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { useAppState } from '../context/AppContext';
import { contentTypes, defaultCampaign, engagementTypes, intents, platforms } from '../data/blueprintData';
import { detectFromLink } from '../utils/linkDetection';

const platformList = Object.values(platforms).flat();

export default function CampaignBuilderPage() {
  const { createCampaign, batonEnabled, setBatonEnabled } = useAppState();
  const [form, setForm] = useState(defaultCampaign);
  const [detected, setDetected] = useState({ platform: '-', contentType: '-' });

  const summary = useMemo(
    () => `${form.quantity} ${form.intent.toLowerCase()} with ${form.engagementTypes.join(', ')} on ${form.platform}`,
    [form]
  );

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleDetect = () => {
    const found = detectFromLink(form.link);
    setDetected(found);
    if (found.platform !== 'Unknown') {
      update('platform', found.platform);
      update('contentType', found.contentType);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCampaign(form);
    setForm(defaultCampaign);
  };

  return (
    <section>
      <SectionHeader
        title="Platform & Content Selection"
        description="Paste Link → Auto Detect → Promote. Configure quantity, intent, RPM, service level, and ad view schedule."
      />

      <form className="panel form-grid" onSubmit={handleSubmit}>
        <label>
          Campaign Name
          <input value={form.name} onChange={(event) => update('name', event.target.value)} required />
        </label>

        <label className="full-width">
          Content Link
          <div className="inline">
            <input value={form.link} onChange={(event) => update('link', event.target.value)} placeholder="Paste TikTok / YouTube / Spotify / website link" />
            <button type="button" onClick={handleDetect}>
              Auto Detect
            </button>
          </div>
          <small>Detected: {detected.platform} / {detected.contentType}</small>
        </label>

        <label>
          Platform
          <select value={form.platform} onChange={(event) => update('platform', event.target.value)}>
            {platformList.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Content Type
          <select value={form.contentType} onChange={(event) => update('contentType', event.target.value)}>
            {contentTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Goal / Intent
          <select value={form.intent} onChange={(event) => update('intent', event.target.value)}>
            {intents.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Engagement Type
          <select
            value={form.engagementTypes[0]}
            onChange={(event) => update('engagementTypes', [event.target.value])}
          >
            {engagementTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          Quantity
          <input type="number" min="1" value={form.quantity} onChange={(event) => update('quantity', Number(event.target.value))} />
        </label>

        <label>
          RPM Target
          <input type="number" min="0" step="0.1" value={form.rpmTarget} onChange={(event) => update('rpmTarget', Number(event.target.value))} />
        </label>

        <label>
          Service Level
          <select value={form.serviceLevel} onChange={(event) => update('serviceLevel', event.target.value)}>
            <option value="slow-safe">Slow Safe</option>
            <option value="balanced">Balanced</option>
            <option value="accelerated">Accelerated</option>
          </select>
        </label>

        <label>
          Ad Views / Day
          <input
            type="number"
            min="0"
            value={form.adViewPlan.dailyViews}
            onChange={(event) =>
              update('adViewPlan', { ...form.adViewPlan, dailyViews: Number(event.target.value) })
            }
          />
        </label>

        <label>
          Duration (days)
          <input
            type="number"
            min="1"
            value={form.adViewPlan.totalDays}
            onChange={(event) =>
              update('adViewPlan', { ...form.adViewPlan, totalDays: Number(event.target.value) })
            }
          />
        </label>

        <label className="checkbox">
          <input checked={batonEnabled} type="checkbox" onChange={(event) => setBatonEnabled(event.target.checked)} />
          Baton Multi-Task Campaigns
        </label>

        <label className="full-width">
          Notes
          <textarea value={form.notes} onChange={(event) => update('notes', event.target.value)} rows="3" />
        </label>

        <p className="full-width summary">Plan summary: {summary}</p>

        <button type="submit">Create Campaign</button>
      </form>
    </section>
  );
}
