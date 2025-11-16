import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import NewsFeed from './pages/NewsFeed';
import Dashboard from './pages/Dashboard';
import CompanySearch from './pages/CompanySearch';
import DigitalFootprint from './pages/DigitalFootprint';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from "./components/PrivateRoute";
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Register />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />

            <Route path="/home" element={<PrivateRoute><Home /> </PrivateRoute>} />
            <Route path="/assessment" element={<PrivateRoute><Assessment /></PrivateRoute>} />
            <Route path="/news" element={<PrivateRoute><NewsFeed /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/company-search" element={<PrivateRoute><CompanySearch /></PrivateRoute>} />
            <Route path="/digital-footprint" element={<PrivateRoute><DigitalFootprint /></PrivateRoute>} />
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
