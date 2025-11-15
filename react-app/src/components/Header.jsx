import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo-icon-light-transparent.png" alt="Captain Cy" />
        <span className="logo-text">Captain Cy</span>
      </div>
      <nav className="nav-bar">
        <Link to="/">HOME</Link>
        <Link to="/assessment">ASSESSMENT</Link>
        <Link to="/news">CYBER NEWS</Link>
        <Link to="/dashboard">DASHBOARD</Link>
      </nav>
    </header>
  );
}

export default Header;

