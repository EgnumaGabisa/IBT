'use client';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export default function RevenueChart({ barData, lineData }) {
  // Empty State Handling
  if (!barData || barData.length === 0) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 font-medium">No sales data available for charts.</p>
      </div>
    );
  }

  const formatETB = (value) => `${value.toLocaleString()} ETB`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue by Neighbourhood Bar Chart */}
      <div className="bg-white p-5 shadow rounded-xl border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue by Neighbourhood</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatETB} />
              <Tooltip formatter={(value) => [`${value} ETB`, 'Revenue']} />
              <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Over Time Line Chart */}
      <div className="bg-white p-5 shadow rounded-xl border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Orders Over Time (Daily Count)</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} Orders`, 'Count']} />
              <Line type="monotone" dataKey="count" stroke="#16a34a" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}