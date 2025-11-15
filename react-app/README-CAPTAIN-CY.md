# Captain Cy - Your Digital Safety Guide

A comprehensive cybersecurity awareness platform built with React that helps users understand their cyber risk through assessments, stay informed about threats, and visualize security trends.

## 🚀 Features

### 1. **Persona Assessment**
- Interactive 10-question cybersecurity assessment
- Real-time scoring and persona calculation
- Five distinct cyber personas:
  - 🔴 The Password Recycler
  - 🟠 The Risky WiFi User
  - 🟡 The Oversharer
  - 🟢 The Cautious Clicker
  - 🟢 The Cyber Guardian
- Personalized vulnerability analysis
- Actionable security recommendations

### 2. **Live Cyber News Feed**
- Real-time cybersecurity news and threat updates
- Category filtering (Phishing, Data Breaches, SIM Swap, Ransomware, Malware, Social Engineering)
- Ready for integration with news APIs (NewsAPI, GNews, Mediastack)
- South African and global threat coverage

### 3. **Company Verification** 🆕
- Search and verify company legitimacy
- Trust score system (0-100)
- CIPC registration verification
- Director information
- Online presence analysis
- Warning system for suspicious companies
- Ready for CIPC BizPortal and Google API integration

### 4. **Digital Footprint Search - "The Ghost Hunter"** 👻 🆕
- Discover your digital exposure across the internet
- Interactive graph visualization with Vis.js
- Have I Been Pwned API integration for breach data
- Social media presence analysis
- Public records discovery
- Exposure score (0-100) with risk levels
- Impact scores for each finding
- Remediation guides with action buttons
- Multi-type search (Email/Name/Phone)

### 5. **Risk Dashboard**
- Power BI dashboard integration
- Comprehensive analytics on:
  - User persona distribution
  - Common vulnerabilities
  - Attack trends over time
  - Geographic threat heatmaps
  - Risk score tracking
- Easy embed setup with instructions

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** CSS3 with CSS Variables
- **Dashboard:** Power BI Embed

## 📦 Installation

1. Navigate to the project directory:
```bash
cd react-app
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 🎨 Brand Colors

- **Primary Dark:** `#001c55`
- **Secondary Dark:** `#003366`
- **Accent Blue:** `#489fb5`
- **Accent Green:** `#6eeb83`
- **Text Light:** `#ffffff`

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   └── Header.css
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Home.css
│   │   ├── Assessment.jsx      # Persona assessment
│   │   ├── Assessment.css
│   │   ├── NewsFeed.jsx        # Cyber news feed
│   │   ├── NewsFeed.css
│   │   ├── Dashboard.jsx       # Power BI dashboard
│   │   └── Dashboard.css
│   ├── data/
│   │   └── assessmentQuestions.js  # Questions & persona logic
│   ├── App.jsx                 # Main app with routing
│   ├── App.css
│   ├── index.css               # Global styles
│   └── main.jsx
├── public/
│   └── logo-icon-light-transparent.png
└── package.json
```

## 🔌 API Integration

### News Feed API Setup

1. Choose a news API provider:
   - [NewsAPI](https://newsapi.org/) - Free tier available
   - [GNews](https://gnews.io/) - Free tier available
   - [Mediastack](https://mediastack.com/) - Free tier available

2. Get your API key

3. Update `src/pages/NewsFeed.jsx`:
```javascript
const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=cybersecurity+OR+cyber+attack&apiKey=YOUR_API_KEY`
  );
  const data = await response.json();
  setNews(data.articles);
};
```

### Power BI Dashboard Setup

1. Create your Power BI report with visualizations
2. Go to File → Embed report → Publish to web
3. Copy the embed URL
4. Paste it in the Dashboard page input field

## 🎯 Data Sources for Dashboard

- **Assessment Data:** User responses, persona types, risk scores
- **News Feed Data:** Attack categories, frequency, sources
- **User Behavior:** Completion rates, return visits
- **External APIs:** Real-time threat intelligence

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Options
- **Vercel:** `vercel deploy`
- **Netlify:** Drag & drop the `dist` folder
- **GitHub Pages:** Use `gh-pages` package

## 📝 Future Enhancements

- [ ] User authentication and profile storage
- [ ] Save assessment results to database
- [ ] Email reports with security tips
- [ ] Integration with threat intelligence APIs
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Gamification with badges and achievements
- [ ] Social sharing of security tips

## 🤝 Contributing

This is a hackathon project. Feel free to fork and enhance!

## 📄 License

MIT License - feel free to use for educational purposes

## 👥 Team

Captain Cy - Hackathon Project 2025

---

**Stay informed, stay safe! 🛡️**

