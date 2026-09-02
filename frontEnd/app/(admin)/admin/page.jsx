export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      <Card title="تعداد محصولات" value="128" />
      <Card title="سفارش امروز" value="36" />
      <Card title="کاربران" value="842" />
      <Card title="درآمد امروز" value="12,500,000 تومان" />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}
