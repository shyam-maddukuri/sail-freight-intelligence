# SAIL Freight Intelligence 🚢
### AI-Powered Bulk Cargo Procurement & Vessel Chartering Decision Support

**Smart India Hackathon 2026 Problem Statement**: SIH26006  
*"Development of an Intelligent Freight Forecasting Model for Optimized Vessel Chartering and Bulk Cargo Procurement from Overseas to East Coast of India."*

---

## 🌐 Live Public Demo URL
- **Public HTTPS Link**: [https://travels-facial-attachment-browsers.trycloudflare.com](https://travels-facial-attachment-browsers.trycloudflare.com)
- **Local Dev Server**: `http://localhost:3000/`

---

## 📱 Mobile & Desktop Optimized
- **Responsive Layout**: Designed for mobile phones, tablets, and desktop workstations.
- **Mobile Navigation Drawer**: Tap the top-left menu icon on mobile to access all 8 modules.
- **Mobile Bottom Quick Tabs**: 1-tap switching between Dashboard, Sourcing, Forecast, Vessels, and Strategy.

---

## 🛠️ Tech Stack & Architecture
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS (Industrial PSU / Dark Navy & Steel Theme)
- **Charts & Forecasts**: Recharts (Historical actuals + 90-day predictive trajectory + 95% confidence intervals)
- **Interactive Maritime Maps**: Maritime Sea Lane Simulator with waypoints across Indian Ocean, Malacca Strait, and East Coast Indian Ports (Paradip, Vizag, Haldia, Chennai, Kamarajar)
- **State & Simulation Engine**: Dynamic calculation engine in `src/utils/calculationEngine.js` ready for connection to FastAPI / PyTorch ML backends.

---

## 🚀 1-Click Vercel / Netlify Deployment
This repository includes a pre-configured `vercel.json`:
1. Push this folder to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: SAIL Freight Intelligence SIH prototype"
   git remote add origin https://github.com/<your-username>/sail-freight-intelligence.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new), select your repo, and click **Deploy**.
