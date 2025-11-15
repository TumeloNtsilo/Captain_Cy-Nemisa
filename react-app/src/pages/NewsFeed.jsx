import { useState, useEffect } from 'react';
import './NewsFeed.css';

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  // Mock news data - Replace with actual API call
  const mockNews = [
    {
      id: 1,
      title: "Major Phishing Campaign Targets South African Banks",
      description: "Cybercriminals are using sophisticated phishing emails to steal banking credentials from South African customers.",
      category: "phishing",
      date: "2025-11-14",
      source: "Cyber Security News SA",
      url: "#"
    },
    {
      id: 2,
      title: "Data Breach Exposes 50,000 Customer Records",
      description: "A major retailer confirms data breach affecting customer personal information including emails and phone numbers.",
      category: "breach",
      date: "2025-11-13",
      source: "Tech Central",
      url: "#"
    },
    {
      id: 3,
      title: "SIM Swap Fraud Cases Rise by 40% in Q4",
      description: "South African police report significant increase in SIM swap attacks targeting mobile banking users.",
      category: "sim-swap",
      date: "2025-11-12",
      source: "ITWeb Security",
      url: "#"
    },
    {
      id: 4,
      title: "Ransomware Attack Hits Healthcare Provider",
      description: "Local healthcare provider falls victim to ransomware attack, patient data potentially compromised.",
      category: "ransomware",
      date: "2025-11-11",
      source: "MyBroadband",
      url: "#"
    },
    {
      id: 5,
      title: "New Banking Trojan Targets Android Users",
      description: "Security researchers discover new mobile malware specifically targeting South African banking apps.",
      category: "malware",
      date: "2025-11-10",
      source: "Security Week",
      url: "#"
    },
    {
      id: 6,
      title: "Social Engineering Scams Increase During Holiday Season",
      description: "Experts warn of increased social engineering attacks as criminals exploit holiday shopping season.",
      category: "social-engineering",
      date: "2025-11-09",
      source: "Cyber Defence Magazine",
      url: "#"
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await fetch('YOUR_NEWS_API_ENDPOINT');
        // const data = await response.json();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNews(mockNews);
        setLoading(false);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const categories = [
    { value: 'all', label: 'All News', icon: '📰' },
    { value: 'phishing', label: 'Phishing', icon: '🎣' },
    { value: 'breach', label: 'Data Breaches', icon: '🔓' },
    { value: 'sim-swap', label: 'SIM Swap', icon: '📱' },
    { value: 'ransomware', label: 'Ransomware', icon: '🔒' },
    { value: 'malware', label: 'Malware', icon: '🦠' },
    { value: 'social-engineering', label: 'Social Engineering', icon: '🎭' }
  ];

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter);

  const getCategoryColor = (category) => {
    const colors = {
      phishing: '#ff4444',
      breach: '#ff8800',
      'sim-swap': '#ffaa00',
      ransomware: '#cc0000',
      malware: '#ff0066',
      'social-engineering': '#ff6600'
    };
    return colors[category] || '#489fb5';
  };

  if (loading) {
    return (
      <div className="news-feed">
        <div className="loading">Loading latest cyber threats...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-feed">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="news-feed">
      <h1>Live Cyber Attack & Scam News</h1>
      <p className="subtitle">Stay informed about the latest cybersecurity threats in South Africa and globally</p>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`filter-button ${filter === cat.value ? 'active' : ''}`}
            onClick={() => setFilter(cat.value)}
          >
            <span className="filter-icon">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="news-grid">
        {filteredNews.map(article => (
          <div key={article.id} className="news-card">
            <div 
              className="category-badge" 
              style={{ backgroundColor: getCategoryColor(article.category) }}
            >
              {article.category.replace('-', ' ').toUpperCase()}
            </div>
            <h3>{article.title}</h3>
            <p className="news-description">{article.description}</p>
            <div className="news-meta">
              <span className="news-date">{article.date}</span>
              <span className="news-source">{article.source}</span>
            </div>
            <a href={article.url} className="read-more" target="_blank" rel="noopener noreferrer">
              Read More →
            </a>
          </div>
        ))}
      </div>

      <div className="api-note">
        <p>💡 <strong>Note:</strong> This is a demo with mock data. To integrate real news:</p>
        <ul>
          <li>Sign up for NewsAPI, GNews, or Mediastack</li>
          <li>Add your API key to the environment variables</li>
          <li>Update the fetch call in NewsFeed.jsx</li>
        </ul>
      </div>
    </div>
  );
}

export default NewsFeed;

