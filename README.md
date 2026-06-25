# 💧 ProWash — AI-Powered Service Booking Platform

A full-stack, AI-powered web application for a professional power washing business. Built as a capstone project demonstrating end-to-end software engineering across planning, design, implementation, testing, and deployment.

---

## 📌 Project Overview

ProWash allows customers to browse available services, view detailed service information, book appointments online, and manage their bookings through a personal dashboard. The platform includes an AI booking assistant powered by the Anthropic Claude API that recommends the most suitable service based on the customer's situation in plain English.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Context API |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Authentication | JWT (jsonwebtoken), bcryptjs |
| Validation | express-validator |
| AI Feature | Anthropic Claude API (claude-haiku) |
| Styling | Pure CSS, Google Fonts (Inter) |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## ✨ Key Features

- **User Authentication** — register, log in, and log out with secure JWT-based auth. Passwords are hashed with bcrypt.
- **Service Browsing** — homepage with service cards and dedicated detail pages per service, including description, what's included, duration, pricing, and FAQs.
- **Online Booking** — validated booking form with name, email, phone, service selection, preferred date, and address. Guest and logged-in bookings both supported.
- **Bookings Dashboard** — logged-in users can view all their bookings with color-coded status badges (Pending / Confirmed / Completed / Cancelled) and cancel active bookings.
- **Customer Reviews** — live reviews fetched from MongoDB, with a submission form.
- **Responsive Design** — fully responsive across desktop, tablet, and mobile with a hamburger navigation menu.

---

## 🤖 AI-Powered Feature

The **AI Booking Assistant** is integrated directly into the booking page.

**How it works:**
1. The user clicks the "✨ Not sure what to book? Ask AI" button on the booking page
2. They describe their situation in plain English (e.g. *"My driveway has a big oil stain and my deck looks green with mildew"*)
3. The description is sent to the backend which calls the Anthropic Claude API with a structured system prompt
4. Claude analyzes the situation and returns a JSON response with a recommended service, a reason, and a preparation tip
5. The user clicks **Apply this to my booking** and the service dropdown is pre-filled automatically

**Why it adds value:** Many customers don't know which service fits their needs. The AI removes that uncertainty and reduces friction in the booking flow.

---

## 📁 Project Structure

```
powerwash/
├── backend/
│   ├── controllers/        ← Business logic
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   ├── auth.js         ← JWT protect middleware
│   │   └── validate.js     ← express-validator error handler
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── reviews.js
│   │   └── ai.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.js / Navbar.css
        │   ├── Footer.js / Footer.css
        │   ├── Reviews.js / Reviews.css
        │   └── AIAssistant.js / AIAssistant.css
        ├── context/
        │   └── AuthContext.js
        ├── data/
        │   └── services.js
        ├── pages/
        │   ├── Home.js / Home.css
        │   ├── BookingPage.js / BookingPage.css
        │   ├── LoginPage.js
        │   ├── RegisterPage.js
        │   ├── DashboardPage.js / DashboardPage.css
        │   ├── ServiceDetailPage.js / ServiceDetailPage.css
        │   └── AuthPages.css
        ├── App.js
        └── index.js
```

---

## ⚙️ Environment Variables

### Backend — create `backend/.env` (copy from `.env.example`)

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/powerwash
PORT=5000
JWT_SECRET=replace_this_with_a_long_random_string
ANTHROPIC_API_KEY=sk-ant-your-key-here
FRONTEND_URL=http://localhost:3000
```

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Port for the Express server (default 5000) |
| `JWT_SECRET` | Secret string used to sign JWTs — keep this private |
| `ANTHROPIC_API_KEY` | API key from [console.anthropic.com](https://console.anthropic.com) |
| `FRONTEND_URL` | Allowed CORS origin — set to your Vercel URL in production |

### Frontend — create `frontend/.env` (only needed for production)

```env
REACT_APP_API_URL=https://your-render-backend-url.onrender.com
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas account (free tier works)
- An Anthropic API key (free trial available)

### Step 1 — Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/powerwash.git
cd powerwash
```

### Step 2 — Set up the backend

```bash
cd backend
npm install
cp .env.example .env
# Open .env and fill in your MONGODB_URI, JWT_SECRET, and ANTHROPIC_API_KEY
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 3 — Set up the frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

The app opens at **http://localhost:3000**

---

## 🌐 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://powerwash-one.vercel.app/ |
| Backend | Render | https://powerwash-8u9f.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

### Deploy backend to Render
1. Connect your GitHub repo on [render.com](https://render.com)
2. Set root directory to `backend/`, build command `npm install`, start command `npm start`
3. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `ANTHROPIC_API_KEY`, `FRONTEND_URL`

### Deploy frontend to Vercel
1. Connect your GitHub repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend/`
3. Add environment variable: `REACT_APP_API_URL` = your Render backend URL

---

## 🔗 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | — | Register a new user |
| POST | /api/auth/login | — | Log in, returns JWT |
| GET | /api/auth/me | ✅ | Get current user |
| POST | /api/bookings | — | Create a booking |
| GET | /api/bookings/mine | ✅ | Get logged-in user's bookings |
| PATCH | /api/bookings/:id/cancel | ✅ | Cancel a booking |
| GET | /api/reviews | — | Get approved reviews |
| POST | /api/reviews | — | Submit a review |
| POST | /api/ai/suggest | — | Get AI service recommendation |

---

## 🤝 AI Usage During Development

AI (Claude) was used throughout this project as a development assistant:

- **Planning** — brainstorming the feature set and user stories
- **Code generation** — generating starter code for models, routes, controllers, and React components
- **Architecture** — designing the folder structure and separation of concerns
- **Debugging** — diagnosing errors (port conflicts, missing modules, CORS issues)
- **Refactoring** — extracting business logic from routes into controllers
- **Documentation** — generating the SDLC document and this README
- **AI feature implementation** — designing the prompt and JSON response structure for the booking assistant

All AI-generated code was reviewed, tested, and validated before being included in the final submission. Final technical decisions and testing were performed independently.

---

## 👨‍💻 Author

Built as a Software Engineering capstone project · 2026
