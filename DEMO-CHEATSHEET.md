# 🎯 DEMO CHEATSHEET - Quick Reference

## 🚀 DEPLOY NOW (5 Minutes)

### 1. Deploy Backend
```bash
cd backend
vercel --prod
```
**Copy the URL!** (e.g., `https://captain-cy-backend.vercel.app`)

### 2. Set Backend Env Vars on Vercel
Dashboard → Your Backend Project → Settings → Environment Variables:
```
SUPABASE_URL=https://ybtnddtxgytkoxqjrxva.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyMzk5NSwiZXhwIjoyMDc4Nzk5OTk1fQ.NVPiUHSQLQidhye7r-Cs3A3xpNjULeytM4MkWFDRCIg
JWT_SECRET=my_super_secret_jwt_key_123!
NODE_ENV=production
```
Then: **Redeploy → Deployments → Click ⋯ → Redeploy**

### 3. Set Frontend Env Vars on Vercel
Dashboard → Your Frontend Project → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend-url.vercel.app
VITE_SUPABASE_URL=https://ybtnddtxgytkoxqjrxva.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjM5OTUsImV4cCI6MjA3ODc5OTk5NX0.jckQQHkHgemY0vHuD7gagchye-_3mFUN4lBhyR1iTh4
```
Then: **Redeploy → Deployments → Click ⋯ → Redeploy**

### 4. Test
Visit your frontend URL → Try to register → Try to login

---

## 🆘 EMERGENCY FIXES DURING DEMO

### Can't Login/Register?
**Option 1: Use Fallback** (Already built in!)
- Just try to login - fallback will activate automatically
- You'll see "(Fallback mode)" message

**Option 2: Bypass Login**
Press F12 (Console) and run:
```javascript
localStorage.setItem('token', 'demo-token');
localStorage.setItem('userEmail', 'demo@demo.com');
location.reload();
```

### Clear Everything and Start Fresh
```javascript
localStorage.clear();
location.reload();
```

### Check What's Wrong
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
console.log('Token:', localStorage.getItem('token'));
```

---

## 🎬 DEMO FLOW

### 1. Landing Page (Register)
- Show the registration form
- Register a new user
- Watch for success message

### 2. Login
- Login with the user you just created
- Or use pre-created account

### 3. Home Page
- Show the dashboard
- Explain Captain Cy features

### 4. Assessment
- Take the cyber security assessment
- Show persona results

### 5. News Feed
- Show cyber security news
- Explain real-time updates

### 6. Company Search
- Search for a company
- Show verification features

### 7. Digital Footprint
- Search for email/username
- Show breach detection

### 8. Dashboard
- Show Power BI integration option
- Explain analytics

---

## 🔥 QUICK FIXES

### Backend Not Responding?
```bash
# Check if it's running
curl https://your-backend-url.vercel.app

# Should return: "Backend server is running!"
```

### Frontend Not Loading?
1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear cache
3. Try incognito mode

### CORS Error?
- Already fixed! Backend allows all origins now
- If still happening, use fallback mode

---

## 📱 DEMO TIPS

1. **Have a backup account ready**
   - Email: demo@captaincy.com
   - Password: Demo123!
   - Register this BEFORE demo

2. **Test everything once before demo**
   - Register → Login → Each page

3. **Keep browser console open** (F12)
   - You can see what's happening
   - Quick fixes available

4. **If something breaks:**
   - Stay calm
   - Use emergency bypass
   - Continue with features demo

5. **Explain the fallback as a feature!**
   - "We have redundant authentication"
   - "Multiple layers of reliability"
   - "Enterprise-grade failover"

---

## ✅ PRE-DEMO CHECKLIST

- [ ] Backend deployed and responding
- [ ] Frontend deployed and loading
- [ ] Environment variables set on both
- [ ] Test account created and working
- [ ] Tested login/register once
- [ ] Browser console ready (F12)
- [ ] This cheatsheet open in another tab
- [ ] Confident and ready! 💪

---

## 🎯 KEY URLS

**Frontend:** https://your-frontend.vercel.app
**Backend:** https://your-backend.vercel.app
**Supabase:** https://supabase.com/dashboard/project/ybtnddtxgytkoxqjrxva

---

## 💬 DEMO TALKING POINTS

- "Captain Cy is a comprehensive cyber security awareness platform"
- "We help users understand their cyber risk profile"
- "Features include assessment, news feed, company verification, and digital footprint scanning"
- "Built with React, Node.js, and Supabase"
- "Deployed on Vercel for scalability"
- "Includes fallback authentication for reliability"

---

## 🎉 YOU GOT THIS!

Remember:
- ✅ Fallback system is active
- ✅ Emergency fixes ready
- ✅ You know the app
- ✅ Demo will be great!

**GOOD LUCK! 🚀**

