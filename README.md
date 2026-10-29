# Next.js Advanced Project & Addis Eats Capstone

**Repository Path:** `Module-03/next-project`  
**GitHub Link:** https://github.com/EgnumaGabisa/IBT/tree/main/Module-03/next-project

---

## Overview & Deliverables

### 1. Next.js Migration & Documentation
- **Framework:** Migrated complete application to Next.js App Router using Server Components.
- **Rendering Strategy (`STRATEGY.md`):** Outlines rendering methods across routes (SSG, SSR, ISR).
- **Component Boundaries (`BOUNDARY.md`):** Documents Server Components vs. Client Components (`'use client'`).
- **Production Verification:** Tested and verified against production builds and cURL checks.

### 2. Data Visualization Dashboard
- **Server Aggregation:** Orders aggregated on the server for summary passing.
- **Charts:**
  - Revenue by neighbourhood (Bar Chart with ETB formatting).
  - Orders over time (Line Chart with date range heading).
  - Accessible SVG fallback HTML table directly beneath charts.
- **Order Table:** Dynamic sorting via URL search parameters with accessible pagination.
- **All 4 UI States Implemented:** Data, Loading, Error, and Empty states.