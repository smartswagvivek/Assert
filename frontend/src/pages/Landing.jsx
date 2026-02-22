import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/landing.css';

const highlights = [
  {
    title: 'Real-Time Visibility',
    description: 'Track equipment status, ownership, and lifecycle in one clear workspace.',
  },
  {
    title: 'Secure Access',
    description: 'Role-ready JWT-based authentication protects your organization data.',
  },
  {
    title: 'Fast Operations',
    description: 'Create, update, search, and audit assets with a performance-first interface.',
  },
];

export default function Landing() {
  return (
    <div className="landing-page">
      <ThemeToggle />

      <header className="landing-nav glass">
        <div className="landing-brand">Office Asset Management</div>
        <nav className="landing-links" aria-label="Authentication actions">
          <Link className="btn btn-secondary landing-btn" to="/login">
            Login
          </Link>
          <Link className="btn btn-primary landing-btn" to="/register">
            Start Free
          </Link>
        </nav>
      </header>

      <main className="landing-main container">
        <section className="hero">
          <p className="hero-kicker">Smart Ops Suite</p>
          <h1>Asset control built for modern teams</h1>
          <p className="hero-copy">
            Reduce asset chaos with structured tracking, reliable records, and a workflow your team can use
            immediately.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary landing-btn" to="/register">
              Create Account
            </Link>
            <Link className="btn btn-secondary landing-btn" to="/login">
              Access Dashboard
            </Link>
            <a className="btn btn-secondary landing-btn" href="#features">
              View Features
            </a>
          </div>
        </section>

        <section id="features" className="feature-grid" aria-label="Product highlights">
          {highlights.map((item) => (
            <article key={item.title} className="feature-card card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
