export default function SectionHeader({ title, description }) {
  return (
    <header className="section-header">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}
