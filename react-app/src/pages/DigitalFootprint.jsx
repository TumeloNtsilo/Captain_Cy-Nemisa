import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Network } from 'vis-network';
import axios from 'axios';
import './DigitalFootprint.css';

function DigitalFootprint() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [footprintData, setFootprintData] = useState(null);
  const [exposureScore, setExposureScore] = useState(0);
  const networkRef = useRef(null);
  const networkInstance = useRef(null);

  useEffect(() => {
    const query = searchParams.get('q');
    const type = searchParams.get('type');
    
    if (query && type) {
      fetchFootprintData(query, type);
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (footprintData && networkRef.current) {
      renderNetwork();
    }
  }, [footprintData]);

  const fetchFootprintData = async (query, type) => {
    setLoading(true);
    try {
      let breachData = [];
      
      // Fetch from Have I Been Pwned API (if email)
      if (type === 'email') {
        try {
          // HIBP API v3 requires API key in header
          // For demo, we'll use mock data. To use real API:
          // const response = await axios.get(
          //   `https://haveibeenpwned.com/api/v3/breachedaccount/${query}`,
          //   { headers: { 'hibp-api-key': 'YOUR_API_KEY' } }
          // );
          // breachData = response.data;
          
          // Mock breach data for demo
          breachData = generateMockBreaches(query);
        } catch (error) {
          console.log('No breaches found or API error');
        }
      }

      // Simulate fetching social media and public records
      await new Promise(resolve => setTimeout(resolve, 2000));

      const data = {
        query,
        type,
        breaches: breachData,
        socialMedia: generateMockSocialMedia(query, type),
        publicRecords: generateMockPublicRecords(query, type),
        timestamp: new Date().toISOString()
      };

      setFootprintData(data);
      calculateExposureScore(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching footprint data:', error);
      setLoading(false);
    }
  };

  const generateMockBreaches = (email) => {
    const possibleBreaches = [
      { name: 'LinkedIn', date: '2021-06-22', records: 700000000, dataClasses: ['Email', 'Name', 'Phone', 'Job Title'] },
      { name: 'Adobe', date: '2013-10-04', records: 153000000, dataClasses: ['Email', 'Password', 'Username'] },
      { name: 'Dropbox', date: '2012-07-01', records: 68000000, dataClasses: ['Email', 'Password'] },
      { name: 'MyFitnessPal', date: '2018-02-01', records: 144000000, dataClasses: ['Email', 'Username', 'Password'] },
      { name: 'Canva', date: '2019-05-24', records: 137000000, dataClasses: ['Email', 'Name', 'Username', 'City', 'Country'] }
    ];

    // Randomly select 0-3 breaches for demo
    const numBreaches = Math.floor(Math.random() * 4);
    return possibleBreaches.slice(0, numBreaches).map(breach => ({
      ...breach,
      impactScore: calculateBreachImpact(breach)
    }));
  };

  const calculateBreachImpact = (breach) => {
    let score = 30; // Base score
    if (breach.dataClasses.includes('Password')) score += 30;
    if (breach.dataClasses.includes('Phone')) score += 15;
    if (breach.dataClasses.includes('SSN') || breach.dataClasses.includes('Credit Card')) score += 25;
    return Math.min(score, 100);
  };

  const generateMockSocialMedia = (query, type) => {
    const platforms = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'TikTok'];
    const numPlatforms = Math.floor(Math.random() * 3) + 1;
    
    return platforms.slice(0, numPlatforms).map(platform => ({
      platform,
      profileUrl: `https://${platform.toLowerCase()}.com/user`,
      visibility: Math.random() > 0.5 ? 'Public' : 'Private',
      dataExposed: ['Profile Picture', 'Bio', 'Posts', 'Friends List'].slice(0, Math.floor(Math.random() * 4) + 1),
      impactScore: Math.random() > 0.5 ? 60 : 30
    }));
  };

  const generateMockPublicRecords = (query, type) => {
    const records = [];
    if (Math.random() > 0.3) {
      records.push({
        type: 'Voter Registration',
        source: 'Public Records Database',
        dataExposed: ['Name', 'Address', 'Age'],
        impactScore: 40
      });
    }
    if (Math.random() > 0.5) {
      records.push({
        type: 'Property Records',
        source: 'County Records',
        dataExposed: ['Name', 'Address', 'Property Value'],
        impactScore: 35
      });
    }
    return records;
  };

  const calculateExposureScore = (data) => {
    let score = 0;
    
    // Breaches contribute heavily
    score += data.breaches.length * 25;
    
    // Social media exposure
    const publicSocial = data.socialMedia.filter(s => s.visibility === 'Public').length;
    score += publicSocial * 15;
    
    // Public records
    score += data.publicRecords.length * 10;
    
    setExposureScore(Math.min(score, 100));
  };

  const renderNetwork = () => {
    if (!networkRef.current || !footprintData) return;

    const nodes = [];
    const edges = [];
    let nodeId = 1;

    // Central node (user)
    nodes.push({
      id: 0,
      label: footprintData.query,
      shape: 'circle',
      size: 40,
      color: { background: '#6eeb83', border: '#489fb5' },
      font: { color: '#001c55', size: 16, bold: true }
    });

    // Breach nodes
    footprintData.breaches.forEach(breach => {
      nodes.push({
        id: nodeId,
        label: `🔓 ${breach.name}`,
        shape: 'box',
        color: { background: '#ff4444', border: '#cc0000' },
        font: { color: '#ffffff' },
        title: `Breach: ${breach.name}\nDate: ${breach.date}\nRecords: ${breach.records.toLocaleString()}`
      });
      edges.push({
        from: 0,
        to: nodeId,
        color: { color: '#ff4444' },
        width: 2,
        label: `Impact: ${breach.impactScore}`
      });
      nodeId++;
    });

    // Social Media nodes
    footprintData.socialMedia.forEach(social => {
      const color = social.visibility === 'Public' ? '#ff8800' : '#88cc00';
      nodes.push({
        id: nodeId,
        label: `🌐 ${social.platform}`,
        shape: 'box',
        color: { background: color, border: color },
        font: { color: '#ffffff' },
        title: `Platform: ${social.platform}\nVisibility: ${social.visibility}`
      });
      edges.push({
        from: 0,
        to: nodeId,
        color: { color: color },
        width: 2,
        label: social.visibility
      });
      nodeId++;
    });

    // Public Records nodes
    footprintData.publicRecords.forEach(record => {
      nodes.push({
        id: nodeId,
        label: `📄 ${record.type}`,
        shape: 'box',
        color: { background: '#489fb5', border: '#003366' },
        font: { color: '#ffffff' },
        title: `Type: ${record.type}\nSource: ${record.source}`
      });
      edges.push({
        from: 0,
        to: nodeId,
        color: { color: '#489fb5' },
        width: 2,
        label: `Impact: ${record.impactScore}`
      });
      nodeId++;
    });

    const data = { nodes, edges };
    const options = {
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -8000,
          springLength: 200,
          springConstant: 0.04
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 100
      },
      nodes: {
        font: { size: 14 }
      }
    };

    if (networkInstance.current) {
      networkInstance.current.destroy();
    }

    networkInstance.current = new Network(networkRef.current, data, options);
  };

  const getExposureLevel = (score) => {
    if (score >= 80) return { level: 'Critical', color: '#ff4444', icon: '🚨' };
    if (score >= 60) return { level: 'High', color: '#ff8800', icon: '⚠️' };
    if (score >= 40) return { level: 'Medium', color: '#ffaa00', icon: '⚡' };
    if (score >= 20) return { level: 'Low', color: '#88cc00', icon: '✓' };
    return { level: 'Minimal', color: '#00cc44', icon: '✓✓' };
  };

  if (loading) {
    return (
      <div className="digital-footprint-page">
        <div className="loading-container">
          <div className="ghost-loading">👻</div>
          <h2>Hunting Your Digital Footprint...</h2>
          <p>Scanning data breaches, social media, and public records</p>
          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!footprintData) {
    return (
      <div className="digital-footprint-page">
        <div className="error-container">
          <h2>No data found</h2>
          <button onClick={() => navigate('/')}>Go Back</button>
        </div>
      </div>
    );
  }

  const exposureInfo = getExposureLevel(exposureScore);

  return (
    <div className="digital-footprint-page">
      <div className="footprint-header">
        <h1>👻 Your Digital Footprint</h1>
        <p className="search-info">
          Searched: <strong>{footprintData.query}</strong> ({footprintData.type})
        </p>
      </div>

      {/* Exposure Score */}
      <div className="exposure-score-card">
        <h2>Exposure Score</h2>
        <div className="score-display" style={{ borderColor: exposureInfo.color }}>
          <div className="score-icon">{exposureInfo.icon}</div>
          <div className="score-number" style={{ color: exposureInfo.color }}>
            {exposureScore}
          </div>
          <div className="score-level" style={{ color: exposureInfo.color }}>
            {exposureInfo.level} Risk
          </div>
        </div>
        <div className="score-bar">
          <div
            className="score-fill"
            style={{
              width: `${exposureScore}%`,
              backgroundColor: exposureInfo.color
            }}
          ></div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="network-card">
        <h2>🕸️ Footprint Map</h2>
        <p className="network-description">
          Interactive visualization of your digital exposure. Click and drag nodes to explore connections.
        </p>
        <div ref={networkRef} className="network-container"></div>
        <div className="network-legend">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff4444' }}></span>
            <span>Data Breaches</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff8800' }}></span>
            <span>Public Social Media</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#489fb5' }}></span>
            <span>Public Records</span>
          </div>
        </div>
      </div>

      {/* Detailed Findings */}
      <div className="findings-section">
        <h2>📊 Detailed Findings</h2>

        {/* Data Breaches */}
        {footprintData.breaches.length > 0 && (
          <div className="finding-category">
            <h3>🔓 Data Breaches ({footprintData.breaches.length})</h3>
            {footprintData.breaches.map((breach, index) => (
              <div key={index} className="finding-card breach-card">
                <div className="finding-header">
                  <h4>{breach.name}</h4>
                  <span className="impact-badge" style={{ backgroundColor: breach.impactScore >= 70 ? '#ff4444' : '#ff8800' }}>
                    Impact: {breach.impactScore}/100
                  </span>
                </div>
                <div className="finding-details">
                  <p><strong>Date:</strong> {breach.date}</p>
                  <p><strong>Records Affected:</strong> {breach.records.toLocaleString()}</p>
                  <p><strong>Data Exposed:</strong> {breach.dataClasses.join(', ')}</p>
                </div>
                <div className="remediation-section">
                  <h5>🛡️ How to Protect Yourself:</h5>
                  <ul>
                    <li>Change your password for {breach.name} immediately</li>
                    <li>Enable two-factor authentication if available</li>
                    {breach.dataClasses.includes('Password') && (
                      <li>Change passwords on any other accounts using the same password</li>
                    )}
                    <li>Monitor your accounts for suspicious activity</li>
                  </ul>
                  <button className="action-btn" onClick={() => window.open(`https://haveibeenpwned.com/`, '_blank')}>
                    Learn More About This Breach
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Social Media */}
        {footprintData.socialMedia.length > 0 && (
          <div className="finding-category">
            <h3>🌐 Social Media Presence ({footprintData.socialMedia.length})</h3>
            {footprintData.socialMedia.map((social, index) => (
              <div key={index} className="finding-card social-card">
                <div className="finding-header">
                  <h4>{social.platform}</h4>
                  <span className={`visibility-badge ${social.visibility.toLowerCase()}`}>
                    {social.visibility}
                  </span>
                  <span className="impact-badge" style={{ backgroundColor: social.impactScore >= 50 ? '#ff8800' : '#88cc00' }}>
                    Impact: {social.impactScore}/100
                  </span>
                </div>
                <div className="finding-details">
                  <p><strong>Data Exposed:</strong> {social.dataExposed.join(', ')}</p>
                  <p><strong>Profile URL:</strong> <a href={social.profileUrl} target="_blank" rel="noopener noreferrer">{social.profileUrl}</a></p>
                </div>
                <div className="remediation-section">
                  <h5>🛡️ How to Reduce Exposure:</h5>
                  <ul>
                    <li>Review and update your privacy settings to "Friends Only"</li>
                    <li>Remove personal information like phone numbers and addresses</li>
                    <li>Limit who can see your posts and profile information</li>
                    <li>Be cautious about accepting friend requests from strangers</li>
                  </ul>
                  <button className="action-btn" onClick={() => window.open(social.profileUrl, '_blank')}>
                    Update Privacy Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Public Records */}
        {footprintData.publicRecords.length > 0 && (
          <div className="finding-category">
            <h3>📄 Public Records ({footprintData.publicRecords.length})</h3>
            {footprintData.publicRecords.map((record, index) => (
              <div key={index} className="finding-card record-card">
                <div className="finding-header">
                  <h4>{record.type}</h4>
                  <span className="impact-badge" style={{ backgroundColor: '#489fb5' }}>
                    Impact: {record.impactScore}/100
                  </span>
                </div>
                <div className="finding-details">
                  <p><strong>Source:</strong> {record.source}</p>
                  <p><strong>Data Exposed:</strong> {record.dataExposed.join(', ')}</p>
                </div>
                <div className="remediation-section">
                  <h5>🛡️ What You Can Do:</h5>
                  <ul>
                    <li>Public records are often legally required and difficult to remove</li>
                    <li>Contact data brokers to request removal from their databases</li>
                    <li>Use services like DeleteMe or PrivacyDuck for automated removal</li>
                    <li>Be aware of what information is publicly available about you</li>
                  </ul>
                  <button className="action-btn" onClick={() => window.open('https://www.consumer.ftc.gov/articles/removing-your-personal-information-websites', '_blank')}>
                    Learn About Data Removal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No findings */}
        {footprintData.breaches.length === 0 &&
         footprintData.socialMedia.length === 0 &&
         footprintData.publicRecords.length === 0 && (
          <div className="no-findings">
            <div className="success-icon">✅</div>
            <h3>Great News!</h3>
            <p>We didn't find any significant digital footprint for this search.</p>
            <p>This could mean:</p>
            <ul>
              <li>Your information hasn't been involved in known data breaches</li>
              <li>Your social media profiles are private or don't exist</li>
              <li>Limited public records are available</li>
            </ul>
            <p className="note">Keep practicing good cybersecurity habits to maintain this status!</p>
          </div>
        )}
      </div>

      {/* API Integration Note */}
      <div className="api-note">
        <h3>🔌 About This Feature</h3>
        <p>
          This feature uses <strong>demo data</strong> for demonstration purposes.
          To enable real-time scanning:
        </p>
        <ul>
          <li><strong>Have I Been Pwned API:</strong> Get an API key from <a href="https://haveibeenpwned.com/API/Key" target="_blank" rel="noopener noreferrer">haveibeenpwned.com</a></li>
          <li><strong>Social Media APIs:</strong> Integrate with platform APIs for real profile scanning</li>
          <li><strong>Public Records:</strong> Use services like Pipl, Spokeo, or BeenVerified APIs</li>
        </ul>
        <p className="privacy-note">
          🔒 <strong>Privacy:</strong> All searches are performed client-side when possible.
          No data is stored on our servers.
        </p>
      </div>
    </div>
  );
}

export default DigitalFootprint;



