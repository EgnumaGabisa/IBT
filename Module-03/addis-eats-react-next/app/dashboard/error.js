'use client';

export default function DashboardError({ error, reset }) {
  return (
    <div className="p-8 bg-red-50 border border-red-200 rounded-xl text-center my-6">
      <h2 className="text-xl font-bold text-red-700">Something went wrong!</h2>
      <p className="text-sm text-red-600 mt-2">{error?.message || 'Failed to load dashboard data.'}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-semibold hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}