export default function AdminHeader() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-bold text-lg">داشبورد مدیریت</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">ادمین</span>
        <div className="w-9 h-9 bg-[#CB2D58] rounded-full"></div>
      </div>
    </header>
  );
}