'use client';

import Navbar from './components/Navbar';
import CardGrid from './components/CardGrid';

/**
 * Home Page - Optimized with Pagination
 * 
 * The CardGrid component now handles:
 * ✅ Data fetching with pagination (15 cards/page)
 * ✅ Debounced search (400ms)
 * ✅ Prefetch optimization
 * ✅ RTK Query caching
 * ✅ Loading states with skeletons
 * ✅ Error handling
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <CardGrid />
    </div>
  );
}
