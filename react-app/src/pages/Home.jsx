import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Captain Cy – Your Digital Safety Guide</h1>
        <p className="hero-description">
          In today's world, online threats are everywhere. Captain Cy helps you understand 
          your cybersecurity risk through an easy assessment, provides personalized advice, 
          and keeps you updated with the latest cyber attacks. Stay informed, stay safe.
        </p>
        <Link to="/assessment" className="cta-button">
          Take Assessment Now
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Persona Assessment</h3>
          <p>
            Answer 10 questions about your digital habits and discover your cyber persona. 
            Get personalized risk analysis and actionable security tips.
          </p>
          <Link to="/assessment" className="feature-link">Start Assessment →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📰</div>
          <h3>Live Cyber News</h3>
          <p>
            Stay updated with the latest cybercrime incidents happening in South Africa 
            and globally. Real-time feed of phishing, breaches, and scams.
          </p>
          <Link to="/news" className="feature-link">View News Feed →</Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Risk Dashboard</h3>
          <p>
            Explore comprehensive analytics on cyber threats, common vulnerabilities, 
            and trending attack patterns through interactive visualizations.
          </p>
          <Link to="/dashboard" className="feature-link">View Dashboard →</Link>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <h2>80%</h2>
          <p>of breaches involve weak passwords</p>
        </div>
        <div className="stat-item">
          <h2>43%</h2>
          <p>of cyber attacks target small businesses</p>
        </div>
        <div className="stat-item">
          <h2>$4.45M</h2>
          <p>average cost of a data breach in 2023</p>
        </div>
      </section>
    </div>
  );
}

export default Home;

