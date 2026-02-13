# Numeo – High-Volume Users Dashboard

A performant React dashboard that displays 10,000+ users in a virtualized table with search, filter, sort, and an editable details modal with optimistic updates and simulated failure/rollback.

## Run instructions

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (e.g. http://localhost:5173).

**Build for production:**

```bash
npm run build
npm run preview
```

## Features

- **Dataset**: 10,500 users with unique IDs, loaded asynchronously (mock data).
- **Table**: Virtualized rows (TanStack Virtual), sorting by name/email/age, debounced search (400 ms), role filter.
- **Performance**: Row virtualization, per-row memoized “activity score” computation, memoized row component and stable callbacks.
- **Interaction**: Row click opens details modal; name, email, and age are editable; save applies optimistic update with ~20% simulated random failure and rollback on failure.
- **UI states**: Loading, error (with retry), and empty state when no users match filters.
