import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DigitalFootprintSearch.css';

function DigitalFootprintSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('email');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/digital-footprint?type=${searchType}&q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="digital-footprint-search">
      <div className="ghost-hunter-header">
        <div className="ghost-icon">👻</div>
        <h2>The Ghost Hunter</h2>
        <p className="ghost-subtitle">Discover Your Digital Footprint & Exposure</p>
      </div>

      <div className="search-container">
        <p className="search-description">
          Find out what information about you is exposed online, including data breaches, 
          social media presence, and public records. Take control of your digital identity.
        </p>

        <form onSubmit={handleSearch} className="footprint-search-form">
          <div className="search-type-selector">
            <button
              type="button"
              className={`type-btn ${searchType === 'email' ? 'active' : ''}`}
              onClick={() => setSearchType('email')}
            >
              📧 Email
            </button>
            <button
              type="button"
              className={`type-btn ${searchType === 'name' ? 'active' : ''}`}
              onClick={() => setSearchType('name')}
            >
              👤 Name
            </button>
            <button
              type="button"
              className={`type-btn ${searchType === 'phone' ? 'active' : ''}`}
              onClick={() => setSearchType('phone')}
            >
              📱 Phone
            </button>
          </div>

          <div className="search-input-group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                searchType === 'email' 
                  ? 'Enter your email address...' 
                  : searchType === 'name'
                  ? 'Enter your full name...'
                  : 'Enter your phone number...'
              }
              className="footprint-input"
              required
            />
            <button type="submit" className="hunt-btn">
              🔍 Hunt My Footprint
            </button>
          </div>
        </form>

        <div className="what-we-check">
          <h3>What We'll Discover:</h3>
          <div className="check-grid">
            <div className="check-item">
              <span className="check-icon">🔓</span>
              <span className="check-label">Data Breaches</span>
              <span className="check-desc">Known security incidents</span>
            </div>
            <div className="check-item">
              <span className="check-icon">🌐</span>
              <span className="check-label">Social Media</span>
              <span className="check-desc">Public profiles & posts</span>
            </div>
            <div className="check-item">
              <span className="check-icon">📄</span>
              <span className="check-label">Public Records</span>
              <span className="check-desc">Available public data</span>
            </div>
            <div className="check-item">
              <span className="check-icon">🎯</span>
              <span className="check-label">Exposure Score</span>
              <span className="check-desc">Your risk rating</span>
            </div>
          </div>
        </div>

        <div className="privacy-notice">
          <span className="lock-icon">🔒</span>
          <p>
            <strong>Privacy First:</strong> Your search is private and not stored. 
            We only show you what's already publicly available online.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DigitalFootprintSearch;

