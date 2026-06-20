# KhelQuest — AI-Based Sports Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?logo=vercel)](https://khelquest-frontend.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

KhelQuest is a responsive sports-talent discovery and training platform. Athletes can build profiles, explore sports opportunities, track progress, and analyse push-ups, squats, and high jumps using browser-based pose detection.

## Live at Vercel

**[Open KhelQuest](https://khelquest-frontend.vercel.app/)**

**#Live At vercel**
https://khelquest-frontend.vercel.app

## Features

- Athlete onboarding, sport selection, and profile creation
- Live-camera and uploaded-video exercise analysis
- MediaPipe pose tracking for push-ups, squats, and high jumps
- Training plans, daily targets, weekly progress, and achievement badges
- Athlete rankings and performance milestones
- Achievement uploads and athlete feedback
- Finder for athletes, coaches, and nearby sports venues
- Local sports board and SAI-focused opportunity views
- Responsive navigation and layouts for desktop and mobile

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Pose analysis:** MediaPipe Pose
- **Icons:** Lucide React
- **Deployment:** Vercel

## Project Structure

```text
KhelQuest/
├── khelquest-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── counters/
│   │   │   └── utils/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```

## Run Locally

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

```bash
git clone https://github.com/Spandana2012/KhelQuest---AI-based-Sports-Platform.git
cd KhelQuest---AI-based-Sports-Platform/khelquest-frontend
npm install
npm run dev
```

Open the local URL displayed by Vite. Camera-based analysis requires browser camera permission; uploaded-video analysis can be used without it.

## Available Scripts

Run these commands from `khelquest-frontend/`:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview the production build locally |

## Current Project Status

KhelQuest is currently a frontend prototype. Authentication, athlete profiles, rankings, bookings, messages, and several dashboard values use mock or client-side data. A production release would require persistent backend services, secure authentication, storage, and server-side validation.

## Project Documents

PDF versions open directly in GitHub. The editable source files can be downloaded and opened in Microsoft Word or PowerPoint.

| Document | GitHub preview | Editable source |
| --- | --- | --- |
| Project abstract | — | [Word document](Abstract.doc) |
| Mini Project Review 1 | [PDF](Mini%20Project%20Review-1.pdf) | [PowerPoint](Mini%20Project%20Review-1.pptx) |
| Mini Project Review 2 | [PDF](Mini%20Project%20Review-2.pdf) | [PowerPoint](Mini%20Project%20Review-2.pptx) |
| Mini Project Review SEE | [PDF](Mini%20project%20Review%20template%20SEE.pdf) | [PowerPoint](Mini%20project%20Review%20template%20SEE.pptx) |
| Mini-project report | [PDF](KhelQuest_Miniproject_H10_Report.pdf) | — |
| Research paper | [PDF](KHELQUEST_RESEARCH_PAPER.pdf) | — |

## Repository

[Spandana2012/KhelQuest---AI-based-Sports-Platform](https://github.com/Spandana2012/KhelQuest---AI-based-Sports-Platform)
