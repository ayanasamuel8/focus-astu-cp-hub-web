# Pages & Routes

All routes are defined in `frontend/src/app/router.tsx`.

## Public routes (no auth required)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LandingPage` | Public landing with stats and announcements |
| `/login` | `LoginPage` | Email + password sign-in |
| `/signup` | `SignupPage` | Registration (requires invitation if open signup is off) |
| `/invite` | `InvitePage` | Reads `?token=` from URL and pre-fills email on signup |

## Protected routes (active account required)

Wrapped in `<ProtectedRoute>` → redirects to `/login` if unauthenticated.
Wrapped in `<AppShell>` → renders the sidebar + header.

| Path | Component | Min role |
|------|-----------|----------|
| `/dashboard` | `DashboardPage` | SQUAD_MEMBER |
| `/problems` | `ProblemsPage` | SQUAD_MEMBER |
| `/problems/:id/editorial` | `EditorialPage` | SQUAD_MEMBER |
| `/submissions/:id` | `SubmissionViewPage` | SQUAD_MEMBER |
| `/editorials` | `EditorialsListPage` | SQUAD_MEMBER |
| `/contests` | `ContestsPage` | SQUAD_MEMBER |
| `/contests/:id` | `ContestDetailPage` | SQUAD_MEMBER |
| `/announcements` | `AnnouncementsPage` | SQUAD_MEMBER |
| `/squads/:squadID` | `SquadPage` | SQUAD_MEMBER |
| `/profile/:userID` | `ProfilePage` | SQUAD_MEMBER |
| `/settings` | `SettingsPage` | SQUAD_MEMBER |
| `/admin` | `AdminPage` | ADMIN |

## Semi-protected routes

| Path | Component | Notes |
|------|-----------|-------|
| `/complete-profile` | `CompleteProfilePage` | JWT required but account may be inactive |
