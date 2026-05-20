# KhelQuest

KhelQuest is a React and TypeScript sports talent platform built with Vite. It helps athletes create a profile, choose sports, track training progress, upload achievements, view rankings, and run exercise analysis flows for pushups, squats, and high jumps.

**#Live At vercel**
https://khelquest-frontend.vercel.app

## Features

- Athlete onboarding and profile creation
- Sport selection across team, individual, and strength categories
- Dashboard with progress metrics, targets, badges, and milestone tracking
- Exercise runners for pushups, squats, and high jump analysis
- Achievement uploads, feedback, rankings, and local board sections
- Responsive interface built with Tailwind CSS and Lucide icons

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- MediaPipe Pose
- Supabase client
- Lucide React

## Project Structure

```text
KhelQuest/
  khelquest-frontend/
    src/
      components/
      main.tsx
      App.tsx
    package.json
    vite.config.ts
    tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
cd khelquest-frontend
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a local `.env` file inside `khelquest-frontend/` if the app needs environment-specific values. Do not commit `.env` files.

## Notes

The app currently uses mock and client-side data in several sections. Connect the flows to backend services as needed for production authentication, persistent athlete profiles, rankings, and uploaded achievements.
