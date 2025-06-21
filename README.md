# ⚡ CaptionJet — AI-Powered Social Caption Generator

> Gen-Z SaaS for viral captions. Built with Next.js 15, Gemini API, and Tailwind/shadcn.

---

## 🧠 Tech Stack

- ✅ Next.js 15 (App Router + Turbopack)  
- ✅ TypeScript  
- ✅ TailwindCSS + shadcn/ui  
- ✅ Google Gemini 1.5 Flash (free LLM API)  
- ✅ Responsive UI + copy-to-clipboard  

---

## 🔥 File Structure

\```
captionjet/
├── app/
│   ├── api/
│   │   └── response/route.ts        # Server route hitting Gemini API
│   └── page.tsx                     # Main UI page (Client Component)
├── components/                      # shadcn/ui components
├── lib/
│   └── gemini.ts                    # LLM wrapper
├── public/
├── .env.local                       # Your Gemini API key
└── README.md
\```

---

## 📦 Install & Run

### 1. Clone the Repo

\```bash
git clone https://github.com/your-user/captionjet.git
cd captionjet
\```

### 2. Install dependencies

\```bash
npm install
\```

### 3. Create `.env.local`

\```env
GOOGLE_API_KEY=your_gemini_api_key
\```

> 🔑 Get your API key from 👉 [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### 4. Run it locally

\```bash
npm run dev
\```

---

## 🧪 License

MIT — Steal it, fork it, clone it, pimp it.
