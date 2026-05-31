# Frontend Overview

The frontend is a React + TypeScript single-page application built with Vite.

## Technology stack

| Concern | Library |
|---------|---------|
| Framework | React 18 |
| Language | TypeScript |
| Build tool | Vite |
| Routing | React Router v6 |
| Auth | Supabase JS client |
| State | Zustand (UI store) |
| Code highlighting | Custom `CodeViewer` component |
| Markdown rendering | Custom `MarkdownRenderer` component |

## Directory structure

```
frontend/src/
├── app/
│   └── router.tsx           # All route definitions
├── components/
│   ├── layout/              # AppShell, Header, Sidebar, LandingNavbar
│   └── ui/                  # Reusable atomic components
├── features/
│   ├── admin/               # Admin panel
│   ├── announcements/       # Announcements list
│   ├── auth/                # Login, Signup, CompleteProfile, InvitePage
│   ├── contests/            # Contest list + detail with standings
│   ├── dashboard/           # Dashboard page
│   ├── editorials/          # Editorials list
│   ├── landing/             # Public landing page
│   ├── problems/            # Problem library + submission view + editorial page
│   ├── profile/             # User profile page
│   ├── settings/            # Settings page (API key management)
│   └── squad/               # Squad curriculum
├── hooks/                   # Shared hooks (useAuth, useAppUser, useUserProfile, useWindowWidth)
├── lib/
│   ├── api.ts               # Typed fetch wrapper for the backend API
│   ├── supabase.ts          # Supabase client singleton
│   └── tokens.ts            # Token storage helpers
└── store/
    └── uiStore.ts           # Zustand store for sidebar / UI state
```

## Auth flow

1. User signs in with Supabase (email/password or magic link).
2. Supabase issues a JWT stored in `localStorage`.
3. `AuthContext` reads the session, fetches the backend user (`GET /api/users/me`).
4. If the profile is incomplete, the user is redirected to `/complete-profile`.
5. All authenticated API calls include `Authorization: Bearer <jwt>` via `lib/api.ts`.
