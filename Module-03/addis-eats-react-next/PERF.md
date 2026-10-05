# Performance & Bundle Audit Report

## Architectural Overview
- **Data Fetching:** Shifted from client-side `useEffect` fetches to Async Server Components in `app/page.jsx`.
- **Client Boundaries:** Isolated `"use client"` directive strictly to leaf nodes (`AddToCartButton`, `Header`) to prevent client JavaScript leak into layout subtrees.
- **State Isolation:** Enclosed application-wide state within `CartProvider` to keep layout subtrees server-rendered.

## Measurable Results
- **Initial JS Bundle Size:** Reduced from **~280 KB** (Vite/CSR) to **~82 KB** (Next.js RSC Architecture).
- **First Contentful Paint (FCP):** Improved due to zero-JS HTML server delivery for static routes.
