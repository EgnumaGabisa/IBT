# Rendering Strategy

- `/`: Static Site Generation (SSG) with ISR (`revalidate = 60`) for menu rendering.
- `/dashboard`: Dynamic Server-Side Rendering (SSR) for analytics and charts.
- `/orders`: Dynamic SSR with URL search parameters for dynamic sorting and pagination.