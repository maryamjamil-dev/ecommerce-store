import React from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
  Truck,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$24,680",
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "8,642",
    change: "+5.7%",
    positive: true,
    icon: Users,
  },
  {
    title: "Total Products",
    value: "62",
    change: "-2.4%",
    positive: false,
    icon: Package,
  },
];

const salesData = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5600 },
  { day: "Wed", value: 4900 },
  { day: "Thu", value: 7200 },
  { day: "Fri", value: 6100 },
  { day: "Sat", value: 4800 },
  { day: "Sun", value: 4300 },
];

const recentOrders = [
  {
    id: "#ORD-1024",
    customer: "Ahmed Khan",
    product: "Premium Wireless Headphones",
    amount: "$89.99",
    status: "Delivered",
    date: "Sep 28, 2026",
  },
  {
    id: "#ORD-1023",
    customer: "Sara Ali",
    product: "Smart Pro Watch",
    amount: "$129.99",
    status: "Shipped",
    date: "Sep 28, 2026",
  },
  {
    id: "#ORD-1022",
    customer: "Usman Malik",
    product: "Digital Camera",
    amount: "$349.99",
    status: "Processing",
    date: "Sep 27, 2026",
  },
  {
    id: "#ORD-1021",
    customer: "Ayesha Noor",
    product: "Bluetooth Speaker",
    amount: "$74.99",
    status: "Delivered",
    date: "Sep 27, 2026",
  },
  {
    id: "#ORD-1020",
    customer: "Hamza Ahmed",
    product: "Wireless Keyboard",
    amount: "$59.99",
    status: "Shipped",
    date: "Sep 26, 2026",
  },
];

const topProducts = [
  {
    name: "Premium Wireless Headphones",
    category: "Headphones",
    sales: 156,
    revenue: "$14,038",
  },
  {
    name: "Smart Pro Watch",
    category: "Smartwatch",
    sales: 98,
    revenue: "$12,739",
  },
  {
    name: "Digital Camera",
    category: "Digital Camera",
    sales: 74,
    revenue: "$25,899",
  },
  {
    name: "Bluetooth Speaker",
    category: "Bluetooth Speaker",
    sales: 63,
    revenue: "$4,724",
  },
];

function getStatusClasses(status) {
  if (status === "Delivered") {
    return "bg-green-50 text-green-700";
  }

  if (status === "Shipped") {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-amber-50 text-amber-700";
}

function getStatusIcon(status) {
  if (status === "Delivered") {
    return <CheckCircle2 size={15} />;
  }

  if (status === "Shipped") {
    return <Truck size={15} />;
  }

  return <Clock3 size={15} />;
}

function SalesChart() {
  const width = 900;
  const height = 280;

  const paddingLeft = 55;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth =
    width - paddingLeft - paddingRight;

  const chartHeight =
    height - paddingTop - paddingBottom;

  const maxValue = 8000;

  const points = salesData.map((item, index) => {
    const x =
      paddingLeft +
      (index / (salesData.length - 1)) * chartWidth;

    const y =
      paddingTop +
      chartHeight -
      (item.value / maxValue) * chartHeight;

    return {
      ...item,
      x,
      y,
    };
  });

  const linePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPoints = [
    `${paddingLeft},${paddingTop + chartHeight}`,
    ...points.map(
      (point) => `${point.x},${point.y}`
    ),
    `${paddingLeft + chartWidth},${
      paddingTop + chartHeight
    }`,
  ].join(" ");

  const yLabels = [8000, 6000, 4000, 2000, 0];

  return (
    <div className="mt-6 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[280px] min-w-[700px] w-full"
        role="img"
        aria-label="Weekly sales overview chart"
      >
        <defs>
          <linearGradient
            id="salesGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFB020"
              stopOpacity="0.25"
            />

            <stop
              offset="100%"
              stopColor="#FFB020"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Grid */}
        {yLabels.map((value) => {
          const y =
            paddingTop +
            chartHeight -
            (value / maxValue) * chartHeight;

          return (
            <g key={value}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={paddingLeft + chartWidth}
                y2={y}
                stroke="#E5E7EB"
                strokeDasharray="6 6"
              />

              <text
                x={paddingLeft - 12}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#9CA3AF"
              >
                {value === 0
                  ? "$0"
                  : `$${value / 1000}k`}
              </text>
            </g>
          );
        })}

        {/* Area */}
        <polygon
          points={areaPoints}
          fill="url(#salesGradient)"
        />

        {/* Line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="#FFB020"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point) => (
          <circle
            key={point.day}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#FFFFFF"
            stroke="#FFB020"
            strokeWidth="3"
          />
        ))}

        {/* X labels */}
        {points.map((point) => (
          <text
            key={point.day}
            x={point.x}
            y={height - 12}
            textAnchor="middle"
            fontSize="12"
            fill="#9CA3AF"
          >
            {point.day}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* =========================
          Page Heading
      ========================= */}

      <div>
        <p className="text-sm font-medium text-[#B8791A]">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Overview of your store performance and recent activity.
        </p>
      </div>

      {/* =========================
          Stats
      ========================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B7280]">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#0A0E14]">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
                  <Icon size={21} />
                </div>
              </div>

              <div
                className={`mt-4 flex items-center gap-1.5 text-xs font-medium ${
                  stat.positive
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight size={15} />
                ) : (
                  <ArrowDownRight size={15} />
                )}

                <span>{stat.change}</span>

                <span className="font-normal text-[#9CA3AF]">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* =========================
          Sales Overview
      ========================= */}

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp
                size={19}
                className="text-[#B8791A]"
              />

              <h2 className="text-lg font-bold text-[#0A0E14]">
                Sales Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-[#6B7280]">
              Weekly revenue performance
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#FFF5DC] px-4 py-2">
              <p className="text-xs text-[#9CA3AF]">
                This Week
              </p>

              <p className="text-base font-bold text-[#0A0E14]">
                $37,100
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
              +18.6%
            </span>
          </div>
        </div>

        <SalesChart />
      </section>

      {/* =========================
          Orders + Top Products
      ========================= */}

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Recent Orders */}

        <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
            <div>
              <h2 className="font-bold text-[#0A0E14]">
                Recent Orders
              </h2>

              <p className="mt-1 text-xs text-[#9CA3AF]">
                Latest customer orders
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-[#B8791A] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Order
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E7EB]">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-[#FAFAF8]"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#0A0E14]">
                        {order.id}
                      </p>

                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        {order.date}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[#374151]">
                        {order.customer}
                      </p>

                      <p className="mt-1 max-w-[220px] truncate text-xs text-[#9CA3AF]">
                        {order.product}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-[#0A0E14]">
                      {order.amount}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Products */}

        <section className="rounded-2xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
            <div>
              <h2 className="font-bold text-[#0A0E14]">
                Top Products
              </h2>

              <p className="mt-1 text-xs text-[#9CA3AF]">
                Best performing products
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-[#B8791A] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-3 px-5 py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-xs font-bold text-[#6B7280]">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0A0E14]">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-[#9CA3AF]">
                    {product.category} •{" "}
                    {product.sales} sales
                  </p>
                </div>

                <p className="text-sm font-bold text-[#0A0E14]">
                  {product.revenue}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

