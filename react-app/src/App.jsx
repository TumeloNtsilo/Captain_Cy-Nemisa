import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import NewsFeed from './pages/NewsFeed';
import Dashboard from './pages/Dashboard';
import CompanySearch from './pages/CompanySearch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/news" element={<NewsFeed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company-search" element={<CompanySearch />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 Captain Cy | Hackathon Project | Your Digital Safety Guide</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
