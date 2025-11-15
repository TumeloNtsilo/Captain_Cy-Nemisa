import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './CompanySearch.css';

function CompanySearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      fetchCompanyData(query);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchCompanyData = async (query) => {
    setLoading(true);
    try {
      // TODO: Replace with actual CIPC API call
      // const cipcResponse = await fetch(`CIPC_API_ENDPOINT?query=${query}`);
      // const cipcData = await cipcResponse.json();
      
      // TODO: Replace with actual Google Custom Search API
      // const googleResponse = await fetch(`GOOGLE_API_ENDPOINT?q=${query}`);
      // const googleData = await googleResponse.json();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data for demonstration
      const mockData = generateMockCompanyData(query);
      setCompanyData(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company data:', error);
      setLoading(false);
    }
  };

  const generateMockCompanyData = (query) => {
    // Generate mock data based on query
    const trustScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const isRegistered = Math.random() > 0.2; // 80% chance registered
    
    return {
      name: query,
      registrationNumber: isRegistered ? `${Math.floor(Math.random() * 9000000000) + 1000000000}` : null,
      status: isRegistered ? 'Active' : 'Not Found',
      registrationDate: isRegistered ? '2018-03-15' : null,
      trustScore: isRegistered ? trustScore : 0,
      category: isRegistered ? 'Private Company' : 'Unknown',
      directors: isRegistered ? [
        { name: 'John Doe', idNumber: '****5678' },
        { name: 'Jane Smith', idNumber: '****9012' }
      ] : [],
      address: isRegistered ? '123 Business Street, Johannesburg, 2000' : 'N/A',
      website: isRegistered && Math.random() > 0.3 ? `www.${query.toLowerCase().replace(/\s+/g, '')}.co.za` : null,
      onlinePresence: {
        hasWebsite: isRegistered && Math.random() > 0.3,
        socialMedia: isRegistered && Math.random() > 0.4,
        reviews: isRegistered ? Math.floor(Math.random() * 50) : 0
      },
      warnings: !isRegistered || trustScore < 70 ? [
        trustScore < 70 ? 'Low trust score - proceed with caution' : null,
        !isRegistered ? 'Company not found in CIPC registry' : null,
        Math.random() > 0.7 ? 'Limited online presence' : null
      ].filter(Boolean) : []
    };
  };

  const handleNewSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/company-search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getTrustLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: '#00cc44', icon: '✓✓✓' };
    if (score >= 75) return { level: 'Good', color: '#6eeb83', icon: '✓✓' };
    if (score >= 60) return { level: 'Fair', color: '#ffaa00', icon: '✓' };
    if (score >= 40) return { level: 'Poor', color: '#ff8800', icon: '⚠' };
    return { level: 'Very Poor', color: '#ff4444', icon: '✗' };
  };

  if (loading) {
    return (
      <div className="company-search-page">
        <div className="search-header-section">
          <h1>Company Verification</h1>
          <form onSubmit={handleNewSearch} className="search-form-inline">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search another company..."
              className="search-input-inline"
            />
            <button type="submit" className="search-btn-inline">Search</button>
          </form>
        </div>
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Verifying company information...</p>
          <p className="loading-subtext">Checking CIPC registry and online presence</p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="company-search-page">
        <div className="search-header-section">
          <h1>Company Verification</h1>
          <form onSubmit={handleNewSearch} className="search-form-inline">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter company name or registration number..."
              className="search-input-inline"
            />
            <button type="submit" className="search-btn-inline">Search</button>
          </form>
        </div>
        <div className="no-results">
          <p>Enter a company name to verify its legitimacy</p>
        </div>
      </div>
    );
  }

  const trustInfo = getTrustLevel(companyData.trustScore);

  return (
    <div className="company-search-page">
      <div className="search-header-section">
        <h1>Company Verification</h1>
        <form onSubmit={handleNewSearch} className="search-form-inline">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search another company..."
            className="search-input-inline"
          />
          <button type="submit" className="search-btn-inline">Search</button>
        </form>
      </div>

      <div className="company-results">
        {/* Trust Score Card */}
        <div className="trust-score-card">
          <h2>Trust Score</h2>
          <div className="trust-score-display" style={{ borderColor: trustInfo.color }}>
            <div className="score-number" style={{ color: trustInfo.color }}>
              {companyData.trustScore}
            </div>
            <div className="score-label" style={{ color: trustInfo.color }}>
              {trustInfo.icon} {trustInfo.level}
            </div>
          </div>
          <div className="trust-bar">
            <div 
              className="trust-fill" 
              style={{ 
                width: `${companyData.trustScore}%`,
                backgroundColor: trustInfo.color 
              }}
            ></div>
          </div>
        </div>

        {/* Company Details */}
        <div className="company-details-card">
          <h2>{companyData.name}</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Registration Number:</span>
              <span className="detail-value">
                {companyData.registrationNumber || 'Not Found'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`detail-value status-${companyData.status.toLowerCase()}`}>
                {companyData.status}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Registration Date:</span>
              <span className="detail-value">
                {companyData.registrationDate || 'N/A'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{companyData.category}</span>
            </div>
          </div>
        </div>

        {/* Directors */}
        {companyData.directors.length > 0 && (
          <div className="directors-card">
            <h3>Directors</h3>
            <div className="directors-list">
              {companyData.directors.map((director, index) => (
                <div key={index} className="director-item">
                  <span className="director-name">{director.name}</span>
                  <span className="director-id">ID: {director.idNumber}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Address */}
        <div className="address-card">
          <h3>Registered Address</h3>
          <p>{companyData.address}</p>
        </div>

        {/* Online Presence */}
        <div className="online-presence-card">
          <h3>Online Presence</h3>
          <div className="presence-grid">
            <div className="presence-item">
              <span className="presence-icon">
                {companyData.onlinePresence.hasWebsite ? '✓' : '✗'}
              </span>
              <span>Website</span>
              {companyData.website && (
                <a href={`https://${companyData.website}`} target="_blank" rel="noopener noreferrer" className="website-link">
                  {companyData.website}
                </a>
              )}
            </div>
            <div className="presence-item">
              <span className="presence-icon">
                {companyData.onlinePresence.socialMedia ? '✓' : '✗'}
              </span>
              <span>Social Media</span>
            </div>
            <div className="presence-item">
              <span className="presence-icon">📊</span>
              <span>{companyData.onlinePresence.reviews} Online Reviews</span>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {companyData.warnings.length > 0 && (
          <div className="warnings-card">
            <h3>⚠️ Warnings</h3>
            <ul>
              {companyData.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* API Integration Note */}
        <div className="api-integration-note">
          <h3>🔌 API Integration Instructions</h3>
          <p><strong>This is demo data.</strong> To integrate real verification:</p>
          <div className="integration-steps">
            <div className="integration-step">
              <h4>1. CIPC BizPortal API</h4>
              <ul>
                <li>Register at <a href="https://eservices.cipc.co.za/" target="_blank" rel="noopener noreferrer">CIPC eServices</a></li>
                <li>Get API credentials for company searches</li>
                <li>Update the <code>fetchCompanyData</code> function</li>
              </ul>
            </div>
            <div className="integration-step">
              <h4>2. Google Custom Search API</h4>
              <ul>
                <li>Create a project in <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                <li>Enable Custom Search API</li>
                <li>Get API key and Search Engine ID</li>
                <li>Use for online presence verification</li>
              </ul>
            </div>
            <div className="integration-step">
              <h4>3. Additional Data Sources</h4>
              <ul>
                <li>Business reviews (Google Places API)</li>
                <li>Social media presence (Social APIs)</li>
                <li>Domain registration (WHOIS API)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanySearch;
