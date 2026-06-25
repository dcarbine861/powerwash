# 🚀 Deployment Guide — ProWash

This guide deploys your backend to **Render** (free) and your frontend to **Vercel** (free).

---

## Before you start

You need your project on GitHub. If it's not there yet:

1. Go to https://github.com and create a new repository called `powerwash`
2. Open a terminal in your `powerwash/` folder and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/powerwash.git
git push -u origin main
```

---

## Step 1 — Deploy the backend to Render

1. Go to https://render.com and sign up with your GitHub account
2. Click **New → Web Service**
3. Connect your `powerwash` GitHub repo
4. Fill in these settings:
   - **Name:** `prowash-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Scroll down to **Environment Variables** and add these three:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | your MongoDB connection string |
   | `JWT_SECRET` | your secret string (same as your .env) |
   | `ANTHROPIC_API_KEY` | your Anthropic API key |

6. Click **Create Web Service**
7. Wait 2–3 minutes for it to build
8. Copy your backend URL — it looks like: `https://prowash-backend.onrender.com`

---

## Step 2 — Add your frontend URL to Render

Once you know your Vercel URL (after Step 3), come back to Render and add one more environment variable:

| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://your-app.vercel.app` |

Then click **Manual Deploy → Deploy latest commit** to restart with the new variable.

---

## Step 3 — Deploy the frontend to Vercel

1. Go to https://vercel.com and sign up with your GitHub account
2. Click **Add New → Project**
3. Import your `powerwash` GitHub repo
4. Fill in these settings:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App (auto-detected)
5. Scroll down to **Environment Variables** and add:

   | Key | Value |
   |-----|-------|
   | `REACT_APP_API_URL` | `https://prowash-backend.onrender.com` |

6. Click **Deploy**
7. Wait 1–2 minutes — Vercel gives you a URL like `https://prowash.vercel.app`

---

## Step 4 — Update the frontend to use the live backend URL

In your frontend, API calls currently use `/api/...` which works locally via the proxy.
In production, you need to point to your Render URL.

Update `frontend/src/` — anywhere you call `fetch("/api/...")`, change it to use the environment variable:

```js
const API = process.env.REACT_APP_API_URL || "";

// Example — instead of:
fetch("/api/bookings")

// Use:
fetch(`${API}/api/bookings`)
```

Files to update:
- `src/pages/BookingPage.js` — booking form submit
- `src/pages/DashboardPage.js` — fetch bookings + cancel
- `src/pages/LoginPage.js` — login fetch
- `src/pages/RegisterPage.js` — register fetch
- `src/components/AIAssistant.js` — AI suggest fetch
- `src/components/Reviews.js` — reviews fetch

After updating, push to GitHub and Vercel redeploys automatically:

```bash
git add .
git commit -m "Point frontend to production API"
git push
```

---

## Step 5 — Test your live app

1. Open your Vercel URL in the browser
2. Register a new account
3. Use the AI assistant and book a service
4. Check your dashboard

🎉 Your app is live!

---

## Troubleshooting

**Backend crashes on Render:**
- Check the Render logs tab for error messages
- Make sure all 3 environment variables are set correctly
- Double-check your MongoDB URI allows connections from anywhere (Atlas → Network Access → 0.0.0.0/0)

**Frontend shows blank page:**
- Make sure `vercel.json` is in your `frontend/` folder
- Check that `REACT_APP_API_URL` is set in Vercel environment variables

**CORS errors in browser console:**
- Make sure `FRONTEND_URL` is set in Render with your exact Vercel URL (no trailing slash)
- Redeploy the backend after adding it
