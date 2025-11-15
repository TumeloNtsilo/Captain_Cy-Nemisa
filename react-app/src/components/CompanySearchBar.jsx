import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanySearchBar.css';

function CompanySearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/company-search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="company-search-section">
      <div className="search-header">
        <div className="search-icon">🔍</div>
        <h2>Verify Company Legitimacy</h2>
        <p>Check if a company is registered and trustworthy before doing business</p>
      </div>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Enter company name or registration number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search Company
          </button>
        </div>
      </form>

      <div className="search-info">
        <div className="info-item">
          <span className="info-icon">✓</span>
          <span>CIPC Registration</span>
        </div>
        <div className="info-item">
          <span className="info-icon">✓</span>
          <span>Trust Score</span>
        </div>
        <div className="info-item">
          <span className="info-icon">✓</span>
          <span>Business Details</span>
        </div>
        <div className="info-item">
          <span className="info-icon">✓</span>
          <span>Online Presence</span>
        </div>
      </div>
    </div>
  );
}

export default CompanySearchBar;

