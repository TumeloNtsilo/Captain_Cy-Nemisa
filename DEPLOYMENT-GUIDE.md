# Captain Cy - Deployment Guide

## 🚀 Deploying Backend to Vercel

### Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed (optional but recommended)

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy Backend

#### Option A: Using Vercel CLI (Recommended)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **captain-cy-backend** (or your preferred name)
   - In which directory is your code located? **.**
   - Want to override the settings? **N**

5. Deploy to production:
```bash
vercel --prod
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
4. Click "Deploy"

### Step 3: Configure Environment Variables on Vercel

After deployment, add environment variables:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
SUPABASE_URL=https://ybtnddtxgytkoxqjrxva.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzIyMzk5NSwiZXhwIjoyMDc4Nzk5OTk1fQ.NVPiUHSQLQidhye7r-Cs3A3xpNjULeytM4MkWFDRCIg
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjM5OTUsImV4cCI6MjA3ODc5OTk5NX0.jckQQHkHgemY0vHuD7gagchye-_3mFUN4lBhyR1iTh4
JWT_SECRET=my_super_secret_jwt_key_123!
FRONTEND_URL=https://your-frontend-app.vercel.app
```

**Important**: Replace `FRONTEND_URL` with your actual frontend Vercel URL.

4. Click "Save"
5. Redeploy the backend for changes to take effect

### Step 4: Get Your Backend URL

After deployment, Vercel will provide you with a URL like:
```
https://captain-cy-backend.vercel.app
```

Copy this URL - you'll need it for the frontend configuration.

---

## 🎨 Updating Frontend Configuration

### Step 1: Update Production Environment Variables

1. Open `react-app/.env.production`
2. Update the `VITE_API_URL` with your backend URL:

```env
VITE_API_URL=https://captain-cy-backend.vercel.app
```

### Step 2: Configure Frontend Environment Variables on Vercel

1. Go to your frontend project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following:

```
VITE_API_URL=https://captain-cy-backend.vercel.app
VITE_SUPABASE_URL=https://ybtnddtxgytkoxqjrxva.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidG5kZHR4Z3l0a294cWpyeHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjM5OTUsImV4cCI6MjA3ODc5OTk5NX0.jckQQHkHgemY0vHuD7gagchye-_3mFUN4lBhyR1iTh4
```

4. Redeploy your frontend

### Step 3: Update Backend CORS

1. Go to your backend project on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Update or add `FRONTEND_URL` with your actual frontend URL:

```
FRONTEND_URL=https://your-actual-frontend.vercel.app
```

4. Redeploy the backend

---

## ✅ Testing Your Deployment

### Test Backend
Visit your backend URL in a browser:
```
https://captain-cy-backend.vercel.app
```

You should see: "Backend server is running!"

### Test Authentication Endpoints

Using curl or Postman:

**Register:**
```bash
curl -X POST https://captain-cy-backend.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123",
    "full_name": "Test User",
    "age": 25,
    "gender": "Other"
  }'
```

**Login:**
```bash
curl -X POST https://captain-cy-backend.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Test Frontend
1. Visit your frontend URL
2. Try registering a new user
3. Try logging in
4. Check browser console for any errors

---

## 🔧 Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` is set correctly in backend environment variables
- Ensure both URLs (frontend and backend) are using HTTPS in production
- Check that you've redeployed after changing environment variables

### 500 Internal Server Error
- Check Vercel function logs in the dashboard
- Verify all environment variables are set correctly
- Make sure Supabase credentials are valid

### Authentication Not Working
- Verify JWT_SECRET is set in backend environment variables
- Check that the backend URL in frontend matches the actual deployed URL
- Clear browser localStorage and try again

### Database Connection Issues
- Verify Supabase credentials in backend environment variables
- Check Supabase project is active and accessible
- Review Supabase logs for any errors

---

## 📝 Important Notes

1. **Environment Variables**: Always set environment variables in Vercel dashboard, not in code
2. **Redeploy**: After changing environment variables, you must redeploy for changes to take effect
3. **HTTPS**: Vercel automatically provides HTTPS for all deployments
4. **Logs**: Check Vercel function logs for debugging: Project → Deployments → Click deployment → Functions tab
5. **Cold Starts**: Serverless functions may have cold starts (1-2 second delay on first request)

---

## 🎉 Success!

Once everything is deployed and configured:
- ✅ Backend is running on Vercel
- ✅ Frontend is connected to backend
- ✅ CORS is properly configured
- ✅ Environment variables are set
- ✅ Authentication is working

Your Captain Cy application is now live! 🚀

