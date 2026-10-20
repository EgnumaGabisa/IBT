# Server and Client Boundaries

## Server Components (Default)
- `app/layout.jsx`: Root structure.
- `app/page.jsx`: Server-side data fetching.
- `app/dashboard/page.jsx`: Server-side data aggregation.

## Client Components (`'use client'`)
- `components/providers/CartProvider.jsx`: Interactive cart state management.
- `app/dashboard/RevenueChart.jsx`: Recharts library rendering for interactive SVGs.
- `app/orders/OrderTable.jsx`: URL-driven interactive sorting and pagination.