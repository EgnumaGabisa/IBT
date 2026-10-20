export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 animate-pulse border border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}