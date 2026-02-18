export default function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <h3>{label}</h3>
      <p>{value}</p>
      {helper ? <span>{helper}</span> : null}
    </article>
  );
}
