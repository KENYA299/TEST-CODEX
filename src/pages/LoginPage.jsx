import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      login(email, password);
      setError('');
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="pill">VIROX</p>
        <h1>Welcome back</h1>
        <p>Login to control campaigns, ad view pacing, and monetization insights.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

          {error ? <p className="error">{error}</p> : null}

          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
