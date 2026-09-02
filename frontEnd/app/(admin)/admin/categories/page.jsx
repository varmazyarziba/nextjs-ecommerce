"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => {
        const mainCategories = data.filter(cat => cat.level === 0);
        setCategories(mainCategories);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h1 className="text-xl font-bold mb-6">دسته‌های اصلی</h1>

      <div className="space-y-3">
        {categories.map(cat => (
          <div
            key={cat._id}
            className="flex justify-between items-center p-4 border rounded-xl bg-gray-50"
          >
            <span className="font-semibold">{cat.title}</span>

            <div className="flex gap-4 text-sm">
              <Link
                href={`/admin/categories/${cat.slug}`}
                className="text-blue-500 hover:underline"
              >
                مشاهده زیر دسته‌ها
              </Link>

              <Link
                href={`/admin/categories/edit/${cat._id}`}
                className="text-green-600 hover:underline"
              >
                ویرایش
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}