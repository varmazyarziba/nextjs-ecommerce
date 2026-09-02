"use client";

import SidebarNode from "./sidebarNode";

export default function SidebarTree({
  items = [],
  currentPath = "",
}) {
  if (!items.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-6">
        دسته‌بندی‌ای یافت نشد.
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <SidebarNode
          key={item._id}
          node={item}
          currentPath={currentPath}
        />
      ))}
    </ul>
  );
}