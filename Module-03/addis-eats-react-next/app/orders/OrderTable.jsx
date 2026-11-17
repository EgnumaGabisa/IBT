import Link from 'next/link';

export default function OrderTable({ orders, sortOrder, currentPage }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-12 text-center bg-white rounded-lg border">
        <h3 className="text-gray-600 font-semibold text-lg">No orders found</h3>
        <p className="text-gray-400 text-sm mt-1">There are no orders logged in the system yet.</p>
      </div>
    );
  }

  // URL-driven Sorting
  const sortedOrders = [...orders].sort((a, b) => {
    return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
  });

  const nextPage = currentPage + 1;
  const prevPage = Math.max(currentPage - 1, 1);
  const nextSort = sortOrder === 'asc' ? 'desc' : 'asc';

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Page {currentPage}</span>
        <Link
          href={`/dashboard?sort=${nextSort}&page=${currentPage}`}
          className="text-sm text-blue-600 hover:underline font-semibold"
        >
          Sort by Amount ({sortOrder === 'asc' ? 'Low to High ↑' : 'High to Low ↓'})
        </Link>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold">
          <tr>
            <th className="p-4">Order ID</th>
            <th className="p-4">Neighbourhood</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {sortedOrders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium text-gray-900">{order.id}</td>
              <td className="p-4 text-gray-600">{order.neighbourhood}</td>
              <td className="p-4 font-semibold text-gray-900">{order.amount} ETB</td>
              <td className="p-4 text-gray-500">{order.date}</td>
              <td className="p-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="p-4 border-t flex justify-between items-center bg-gray-50">
        <Link
          href={`/dashboard?sort=${sortOrder}&page=${prevPage}`}
          className={`px-4 py-2 border rounded-md text-sm font-medium bg-white ${
            currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-50'
          }`}
        >
          Previous
        </Link>
        <Link
          href={`/dashboard?sort=${sortOrder}&page=${nextPage}`}
          className="px-4 py-2 border rounded-md text-sm font-medium bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
    </div>
  );
}