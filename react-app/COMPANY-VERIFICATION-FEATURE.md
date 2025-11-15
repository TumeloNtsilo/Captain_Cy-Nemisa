# Company Verification Feature

## 🔍 Overview

The Company Verification feature allows users to check if a company is legitimate before doing business with them. This helps prevent fraud and scams by verifying company registration and online presence.

## ✨ Features

### 1. **Search Bar on Home Page**
- Prominent search section after the assessment card
- Clean, user-friendly interface
- Quick access to company verification

### 2. **Trust Score System**
- Visual trust score (0-100)
- Color-coded trust levels:
  - 🟢 **90-100:** Excellent (Green)
  - 🟢 **75-89:** Good (Light Green)
  - 🟡 **60-74:** Fair (Yellow)
  - 🟠 **40-59:** Poor (Orange)
  - 🔴 **0-39:** Very Poor (Red)

### 3. **Company Information Display**
- **CIPC Registration Details:**
  - Registration number
  - Company status (Active/Inactive)
  - Registration date
  - Company category

- **Directors Information:**
  - Names of directors
  - Partial ID numbers (for privacy)

- **Registered Address:**
  - Full business address

- **Online Presence:**
  - Website verification
  - Social media presence
  - Number of online reviews

- **Warnings:**
  - Low trust score alerts
  - Missing registration
  - Limited online presence

## 🔌 API Integration

### Current Status: **Demo Mode**
The feature currently uses mock data for demonstration purposes.

### Integration Steps:

#### 1. CIPC BizPortal API

**Registration:**
1. Visit [CIPC eServices](https://eservices.cipc.co.za/)
2. Create an account
3. Apply for API access
4. Get your API credentials

**Implementation:**
```javascript
// In src/pages/CompanySearch.jsx, update fetchCompanyData function:

const fetchCompanyData = async (query) => {
  setLoading(true);
  try {
    // CIPC API call
    const cipcResponse = await fetch(
      `https://api.cipc.co.za/v1/companies/search?name=${query}`,
      {
        headers: {
          'Authorization': `Bearer ${YOUR_CIPC_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const cipcData = await cipcResponse.json();
    
    // Process and set company data
    setCompanyData(processCIPCData(cipcData));
    setLoading(false);
  } catch (error) {
    console.error('Error:', error);
    setLoading(false);
  }
};
```

#### 2. Google Custom Search API

**Setup:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Custom Search API
4. Create credentials (API Key)
5. Set up a Custom Search Engine at [Programmable Search Engine](https://programmablesearchengine.google.com/)

**Implementation:**
```javascript
// Add to fetchCompanyData function:

const googleResponse = await fetch(
  `https://www.googleapis.com/customsearch/v1?key=${YOUR_GOOGLE_API_KEY}&cx=${YOUR_SEARCH_ENGINE_ID}&q=${query}`
);
const googleData = await googleResponse.json();

// Use googleData to verify online presence
```

#### 3. Additional Data Sources

**Google Places API** (for reviews):
```javascript
const placesResponse = await fetch(
  `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=rating,user_ratings_total&key=${YOUR_GOOGLE_API_KEY}`
);
```

**WHOIS API** (for domain verification):
```javascript
const whoisResponse = await fetch(
  `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${YOUR_WHOIS_API_KEY}&domainName=${domain}`
);
```

## 📊 Trust Score Calculation

The trust score is calculated based on multiple factors:

```javascript
function calculateTrustScore(companyData) {
  let score = 0;
  
  // CIPC Registration (40 points)
  if (companyData.isRegistered) score += 40;
  if (companyData.status === 'Active') score += 10;
  
  // Online Presence (30 points)
  if (companyData.hasWebsite) score += 15;
  if (companyData.hasSocialMedia) score += 10;
  if (companyData.reviews > 10) score += 5;
  
  // Company Age (20 points)
  const yearsActive = calculateYears(companyData.registrationDate);
  if (yearsActive > 5) score += 20;
  else if (yearsActive > 2) score += 10;
  else if (yearsActive > 0) score += 5;
  
  // Additional Verification (10 points)
  if (companyData.hasVerifiedAddress) score += 5;
  if (companyData.hasDirectors) score += 5;
  
  return Math.min(score, 100);
}
```

## 🎨 UI Components

### Files Created:
1. **`src/components/CompanySearchBar.jsx`** - Search bar component
2. **`src/components/CompanySearchBar.css`** - Search bar styles
3. **`src/pages/CompanySearch.jsx`** - Search results page
4. **`src/pages/CompanySearch.css`** - Results page styles

### Updated Files:
1. **`src/pages/Home.jsx`** - Added search bar
2. **`src/App.jsx`** - Added route for company search

## 🚀 Usage

### For Users:
1. Navigate to the home page
2. Scroll to the "Verify Company Legitimacy" section
3. Enter company name or registration number
4. Click "Search Company"
5. View trust score and company details

### For Developers:
```bash
# The feature is already integrated
# Just navigate to http://localhost:5173
# and test the search functionality
```

## 🔒 Security Considerations

1. **API Keys:** Store API keys in environment variables
2. **Rate Limiting:** Implement rate limiting to prevent abuse
3. **Data Privacy:** Mask sensitive information (ID numbers, etc.)
4. **HTTPS:** Always use HTTPS for API calls
5. **Input Validation:** Sanitize user input to prevent injection attacks

## 📝 Environment Variables

Create a `.env` file in the `react-app` directory:

```env
VITE_CIPC_API_KEY=your_cipc_api_key_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
VITE_GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
VITE_WHOIS_API_KEY=your_whois_api_key_here
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_CIPC_API_KEY;
```

## 🎯 Future Enhancements

- [ ] Save search history
- [ ] Compare multiple companies
- [ ] Export verification reports
- [ ] Email alerts for company status changes
- [ ] Integration with more data sources
- [ ] User reviews and ratings
- [ ] Scam reporting feature
- [ ] Company watchlist

## 📚 Resources

- [CIPC Official Website](https://www.cipc.co.za/)
- [Google Custom Search API Docs](https://developers.google.com/custom-search/v1/overview)
- [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service/overview)
- [WHOIS API Documentation](https://www.whoisxmlapi.com/whois-api-documentation)

---

**Status:** ✅ Feature Complete (Demo Mode)
**Next Step:** Integrate real APIs for production use

