import { Suspense } from 'react';
import RevenueChart from './RevenueChart';
import OrderTable from '../orders/OrderTable';
import LoadingSkeleton from '../orders/loading';
import RevenueChart from './RevenueChart';
import OrderTable from './OrderTable';

export default function DashboardPage({ searchParams }) {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Addis Eats Analytics</h1>
        <p className="text-gray-600 mt-1">Revenue by neighbourhood & recent order logs</p>
      </div>

      {/* Visualizations Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
      </section>

      {/* Interactive Table Section */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Orders</h2>
        <OrderTable searchParams={searchParams} />
      </section>
    </main>
  );
}

//(Mock Data)
const mockOrders = [
  { id: 'ORD-101', neighbourhood: 'Bole', amount: 1200, date: '2026-10-15', status: 'Completed' },
  { id: 'ORD-102', neighbourhood: 'Kazanchis', amount: 850, date: '2026-10-15', status: 'Pending' },
  { id: 'ORD-103', neighbourhood: 'Bole', amount: 2100, date: '2026-10-16', status: 'Completed' },
  { id: 'ORD-104', neighbourhood: 'Piazza', amount: 600, date: '2026-10-16', status: 'Cancelled' },
  { id: 'ORD-105', neighbourhood: 'Kazanchis', amount: 1500, date: '2026-10-17', status: 'Completed' },
  { id: 'ORD-106', neighbourhood: 'Sarbet', amount: 1800, date: '2026-10-17', status: 'Completed' },
];

export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const sortOrder = params?.sort || 'asc';
  const page = parseInt(params?.page || '1', 10);

  // 1. Single Server-side Aggregation
  const revenueByNeighbourhood = mockOrders.reduce((acc, order) => {
    acc[order.neighbourhood] = (acc[order.neighbourhood] || 0) + order.amount;
    return acc;
  }, {});

  const barChartData = Object.entries(revenueByNeighbourhood).map(([name, total]) => ({
    name,
    total,
  }));

  const ordersByDate = mockOrders.reduce((acc, order) => {
    acc[order.date] = (acc[order.date] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = Object.entries(ordersByDate).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <main className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">Addis Eats Dashboard</h1>

      {/* Visual Charts Component */}
      <RevenueChart barData={barChartData} lineData={lineChartData} />

      {/* Accessible Table for Screen Readers / High Contrast */}
      <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Orders Summary Data (Accessible View)</h2>
        <table className="w-full text-sm text-left text-gray-600">
          <thead>
            <tr>
              <th className="py-1">Date</th>
              <th className="py-1">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {lineChartData.map((row) => (
              <tr key={row.date} className="border-t">
                <td className="py-1">{row.date}</td>
                <td className="py-1">{row.count} orders</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Main Orders Table with URL Sorting and Pagination */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <Suspense fallback={<LoadingSkeleton />}>
          <OrderTable orders={mockOrders} sortOrder={sortOrder} currentPage={page} />
        </Suspense>
      </section>
    </main>
  );
}