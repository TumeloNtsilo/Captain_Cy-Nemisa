import { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [embedUrl, setEmbedUrl] = useState('');
  const [showInstructions, setShowInstructions] = useState(true);

  // Example Power BI embed URL format:
  // https://app.powerbi.com/view?r=REPORT_ID

  const handleEmbedUrlChange = (e) => {
    setEmbedUrl(e.target.value);
  };

  const handleLoadDashboard = () => {
    if (embedUrl) {
      setShowInstructions(false);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Cyber Risk Dashboard</h1>
      <p className="subtitle">
        Comprehensive analytics on cyber threats, vulnerabilities, and attack trends
      </p>

      {showInstructions && (
        <div className="dashboard-setup">
          <div className="setup-card">
            <h2>📊 Power BI Dashboard Integration</h2>
            <p>To display your Power BI dashboard, follow these steps:</p>
            
            <div className="instructions">
              <h3>Step 1: Create Your Power BI Dashboard</h3>
              <ul>
                <li>Log in to Power BI Service</li>
                <li>Create a new report with your data sources</li>
                <li>Add visualizations for:
                  <ul>
                    <li>Most common cyber personas from assessment data</li>
                    <li>Common weaknesses (passwords, oversharing, etc.)</li>
                    <li>Trends of recent attacks from news API</li>
                    <li>Heatmap of attack categories</li>
                    <li>Geographic distribution of threats</li>
                  </ul>
                </li>
              </ul>

              <h3>Step 2: Publish to Web</h3>
              <ul>
                <li>In Power BI, go to File → Embed report → Publish to web</li>
                <li>Click "Create embed code"</li>
                <li>Copy the embed URL (not the iframe code)</li>
              </ul>

              <h3>Step 3: Paste Your Embed URL Below</h3>
              <div className="url-input-section">
                <input
                  type="text"
                  placeholder="Paste your Power BI embed URL here..."
                  value={embedUrl}
                  onChange={handleEmbedUrlChange}
                  className="url-input"
                />
                <button onClick={handleLoadDashboard} className="load-button">
                  Load Dashboard
                </button>
              </div>
            </div>

            <div className="sample-metrics">
              <h3>📈 Suggested Dashboard Metrics</h3>
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon">👥</div>
                  <h4>User Personas</h4>
                  <p>Distribution of cyber personas from assessments</p>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">⚠️</div>
                  <h4>Top Vulnerabilities</h4>
                  <p>Most common security weaknesses identified</p>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">📊</div>
                  <h4>Attack Trends</h4>
                  <p>Time series of cyber attack categories</p>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🗺️</div>
                  <h4>Threat Heatmap</h4>
                  <p>Geographic and categorical threat distribution</p>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">📈</div>
                  <h4>Risk Scores</h4>
                  <p>Average risk levels over time</p>
                </div>
                <div className="metric-card">
                  <div className="metric-icon">🎯</div>
                  <h4>Action Completion</h4>
                  <p>User engagement with security recommendations</p>
                </div>
              </div>
            </div>

            <div className="data-sources">
              <h3>🔗 Data Sources for Your Dashboard</h3>
              <ul>
                <li><strong>Assessment Data:</strong> User responses, persona types, risk scores</li>
                <li><strong>News Feed Data:</strong> Attack categories, frequency, sources</li>
                <li><strong>User Behavior:</strong> Assessment completion rates, return visits</li>
                <li><strong>External APIs:</strong> Real-time threat intelligence feeds</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {!showInstructions && embedUrl && (
        <div className="dashboard-container">
          <button 
            onClick={() => setShowInstructions(true)} 
            className="back-to-setup"
          >
            ← Back to Setup
          </button>
          <iframe
            title="Power BI Dashboard"
            src={embedUrl}
            className="powerbi-iframe"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
      )}

      {!showInstructions && !embedUrl && (
        <div className="no-dashboard">
          <p>No dashboard URL provided. Please enter a valid Power BI embed URL.</p>
          <button onClick={() => setShowInstructions(true)} className="setup-button">
            Go to Setup
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

