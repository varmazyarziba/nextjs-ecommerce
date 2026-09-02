"use client";

import SidebarTree from "./sidebarTree";

export default function CategorySidebar({
  categoryTree = [],
  currentPath = "",
}) {
  return (
    <aside
      className="
        bg-white
        rounded-xl
        border
        border-gray-200
        shadow-sm
        sticky
        top-5
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          px-5
          py-4
          bg-gray-50
          border-b
          border-gray-200
        "
      >
        <h2
          className="
            text-lg
            font-bold
            text-gray-800
          "
        >
          دسته‌بندی کالاها
        </h2>
      </div>

      {/* Tree */}
      <div
        className="
          p-4
          max-h-[700px]
          overflow-y-auto
        "
      >
        <SidebarTree
          items={categoryTree}
          currentPath={currentPath}
        />
      </div>
    </aside>
  );
}