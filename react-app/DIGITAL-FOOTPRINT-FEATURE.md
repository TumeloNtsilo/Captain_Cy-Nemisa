# Digital Footprint Search - "The Ghost Hunter" 👻

## 🎯 Overview

The Digital Footprint Search feature (nicknamed "The Ghost Hunter") allows users to discover their digital exposure across the internet, including data breaches, social media presence, and public records. This highly visual feature uses graph visualization to show connections between the user and their exposed data.

## ✨ Key Features

### 1. **Multi-Type Search**
- **Email Search:** Find data breaches and compromised accounts
- **Name Search:** Discover social media profiles and public records
- **Phone Search:** Identify exposed phone number data

### 2. **Interactive Graph Visualization**
- **Central Node:** User's search query (email/name/phone)
- **Connected Nodes:**
  - 🔓 **Data Breaches** (Red) - Known security incidents
  - 🌐 **Social Media** (Orange/Green) - Public/Private profiles
  - 📄 **Public Records** (Blue) - Available public data
- **Edges:** Show connections with impact scores
- **Interactive:** Click and drag nodes to explore

### 3. **Exposure Score System**
- **0-100 Score** based on:
  - Number of data breaches (25 points each)
  - Public social media profiles (15 points each)
  - Public records (10 points each)
- **Risk Levels:**
  - 🚨 **80-100:** Critical Risk
  - ⚠️ **60-79:** High Risk
  - ⚡ **40-59:** Medium Risk
  - ✓ **20-39:** Low Risk
  - ✓✓ **0-19:** Minimal Risk

### 4. **Detailed Findings with Impact Scores**

Each finding includes:
- **Impact Score (0-100):** Quantifiable risk rating
- **Data Exposed:** What information was compromised
- **Date/Source:** When and where the exposure occurred
- **Remediation Guide:** Step-by-step instructions to fix

### 5. **Remediation Buttons**
Direct action buttons for each finding:
- "Learn More About This Breach"
- "Update Privacy Settings"
- "Learn About Data Removal"

## 🔌 API Integration

### Current Status: **Demo Mode**
The feature uses mock data for demonstration. To enable real scanning:

### 1. Have I Been Pwned (HIBP) API

**Get API Key:**
1. Visit [haveibeenpwned.com/API/Key](https://haveibeenpwned.com/API/Key)
2. Purchase an API key ($3.50/month)
3. Add to environment variables

**Implementation:**
```javascript
// In .env file
VITE_HIBP_API_KEY=your_api_key_here

// In DigitalFootprint.jsx
const response = await axios.get(
  `https://haveibeenpwned.com/api/v3/breachedaccount/${email}`,
  {
    headers: {
      'hibp-api-key': import.meta.env.VITE_HIBP_API_KEY,
      'User-Agent': 'Captain-Cy-App'
    }
  }
);
```

**API Endpoints:**
- `/breachedaccount/{account}` - Check if email is in breaches
- `/breach/{name}` - Get details about specific breach
- `/pasteaccount/{account}` - Check for pastes

### 2. Social Media APIs

**Facebook Graph API:**
```javascript
const response = await axios.get(
  `https://graph.facebook.com/v12.0/search`,
  {
    params: {
      q: searchQuery,
      type: 'user',
      access_token: FACEBOOK_ACCESS_TOKEN
    }
  }
);
```

**Twitter API v2:**
```javascript
const response = await axios.get(
  `https://api.twitter.com/2/users/by/username/${username}`,
  {
    headers: {
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
    }
  }
);
```

**LinkedIn API:**
- Requires OAuth 2.0 authentication
- Use People Search API

### 3. Public Records APIs

**Pipl API:**
```javascript
const response = await axios.get(
  `https://api.pipl.com/search/`,
  {
    params: {
      email: searchQuery,
      key: PIPL_API_KEY
    }
  }
);
```

**Spokeo API:**
- Search by name, email, phone, or address
- Returns comprehensive public records

**BeenVerified API:**
- Background check data
- Public records aggregation

## 📊 Impact Score Calculation

### Breach Impact Score
```javascript
function calculateBreachImpact(breach) {
  let score = 30; // Base score
  
  // Add points based on data types
  if (breach.dataClasses.includes('Password')) score += 30;
  if (breach.dataClasses.includes('Phone')) score += 15;
  if (breach.dataClasses.includes('SSN')) score += 25;
  if (breach.dataClasses.includes('Credit Card')) score += 25;
  if (breach.dataClasses.includes('Email')) score += 10;
  
  return Math.min(score, 100);
}
```

### Social Media Impact Score
```javascript
function calculateSocialImpact(profile) {
  let score = 20; // Base score
  
  if (profile.visibility === 'Public') score += 40;
  if (profile.dataExposed.includes('Phone')) score += 15;
  if (profile.dataExposed.includes('Address')) score += 15;
  if (profile.dataExposed.includes('Birthday')) score += 10;
  
  return Math.min(score, 100);
}
```

### Overall Exposure Score
```javascript
function calculateExposureScore(data) {
  let score = 0;
  
  // Breaches (most critical)
  score += data.breaches.length * 25;
  
  // Public social media
  const publicProfiles = data.socialMedia.filter(
    s => s.visibility === 'Public'
  ).length;
  score += publicProfiles * 15;
  
  // Public records
  score += data.publicRecords.length * 10;
  
  return Math.min(score, 100);
}
```

## 🎨 Graph Visualization

### Technology: **Vis.js Network**

**Node Types:**
1. **Central Node** (User)
   - Shape: Circle
   - Size: 40
   - Color: Green (#6eeb83)

2. **Breach Nodes**
   - Shape: Box
   - Color: Red (#ff4444)
   - Label: 🔓 Breach Name

3. **Social Media Nodes**
   - Shape: Box
   - Color: Orange (#ff8800) for public, Green (#88cc00) for private
   - Label: 🌐 Platform Name

4. **Public Record Nodes**
   - Shape: Box
   - Color: Blue (#489fb5)
   - Label: 📄 Record Type

**Edge Properties:**
- Width: 2px
- Color: Matches node type
- Label: Impact score or visibility

**Physics:**
- Barnes-Hut simulation for natural layout
- Gravitational constant: -8000
- Spring length: 200
- Spring constant: 0.04

## 🛡️ Remediation Guides

### For Data Breaches:
1. Change password immediately
2. Enable two-factor authentication
3. Monitor account for suspicious activity
4. Check other accounts with same password
5. Consider identity theft protection

### For Social Media:
1. Review privacy settings
2. Change to "Friends Only" visibility
3. Remove personal information (phone, address)
4. Limit post visibility
5. Review tagged photos and posts

### For Public Records:
1. Contact data brokers for removal
2. Use opt-out services (DeleteMe, PrivacyDuck)
3. Monitor for new records
4. Be aware of what's publicly available
5. Consider privacy protection services

## 📁 Files Created

1. **`src/components/DigitalFootprintSearch.jsx`** - Search bar component
2. **`src/components/DigitalFootprintSearch.css`** - Search bar styles
3. **`src/pages/DigitalFootprint.jsx`** - Results page with visualization
4. **`src/pages/DigitalFootprint.css`** - Results page styles

## 📦 Dependencies Added

```json
{
  "vis-network": "^9.1.9",
  "axios": "^1.6.2"
}
```

## 🚀 Usage

### For Users:
1. Navigate to home page
2. Scroll to "The Ghost Hunter" section
3. Select search type (Email/Name/Phone)
4. Enter your information
5. Click "Hunt My Footprint"
6. View interactive graph and detailed findings
7. Follow remediation guides

### For Developers:
```bash
# Install dependencies (already done)
npm install vis-network axios

# Run the app
npm run dev

# Navigate to http://localhost:5173
```

## 🔒 Privacy & Security

- **No Data Storage:** Searches are not stored on servers
- **Client-Side Processing:** When possible, data is processed locally
- **Secure APIs:** All API calls use HTTPS
- **User Consent:** Clear privacy notice displayed
- **Transparency:** Users see exactly what data is found

## 🎯 Future Enhancements

- [ ] Real-time monitoring and alerts
- [ ] Export reports as PDF
- [ ] Historical tracking of exposure over time
- [ ] Dark web monitoring
- [ ] Credit monitoring integration
- [ ] Automated remediation tools
- [ ] Family account monitoring
- [ ] Mobile app version

## 📚 Resources

- [Have I Been Pwned API](https://haveibeenpwned.com/API/v3)
- [Vis.js Network Documentation](https://visjs.github.io/vis-network/docs/network/)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [FTC - Removing Personal Information](https://www.consumer.ftc.gov/articles/removing-your-personal-information-websites)

---

**Status:** ✅ Feature Complete (Demo Mode)
**Next Step:** Integrate real APIs for production use

