"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SubCategoriesPage() {
  const { slug } = useParams();

  // آخرین اسلاگ (دسته فعلی)
  const currentSlug = Array.isArray(slug)
    ? slug[slug.length - 1]
    : slug;

  // مسیر کامل برای ساخت لینک
  const currentPath = Array.isArray(slug)
    ? slug.join("/")
    : slug;

  const [categories, setCategories] = useState([]);
  const [parentTitle, setParentTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSubCategories = async () => {
    try {
      // دریافت اطلاعات دسته فعلی
      const parentRes = await fetch(
        `http://localhost:5000/api/categories/slug/${currentSlug}`
      );

      const parentData = await parentRes.json();

      if (!parentRes.ok) {
        throw new Error(parentData.message || "Category not found");
      }

      setParentTitle(parentData.title);

      // دریافت زیر دسته‌ها
      const subRes = await fetch(
        `http://localhost:5000/api/categories?parent=${parentData._id}`
      );

      const subData = await subRes.json();

      setCategories(Array.isArray(subData) ? subData : []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentSlug) {
      fetchSubCategories();
    }
  }, [currentSlug]);

  if (loading) {
    return <p>در حال بارگذاری...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h1 className="text-xl font-bold mb-2">
        زیر دسته‌های {parentTitle}
      </h1>

      <Link
        href="/admin/categories"
        className="text-sm text-gray-500 hover:underline"
      >
        ← بازگشت به دسته‌های اصلی
      </Link>

      <div className="space-y-3 mt-6">

        {categories.length === 0 && (
          <p className="text-gray-400">
            هیچ زیر دسته‌ای وجود ندارد
          </p>
        )}

        {categories.map((cat) => (

          <div
            key={cat._id}
            className="flex justify-between items-center p-4 border rounded-xl"
          >

            <span className="font-medium">
              {cat.title}
            </span>

            <div className="flex gap-4 text-sm">

              {cat.level < 2 ? (
                <Link
                  href={`/admin/categories/${currentPath}/${cat.slug}`}
                  className="text-blue-500 hover:underline"
                >
                  مشاهده زیر دسته‌ها
                </Link>
              ) : (
                <Link
                  href={`/admin/products/${cat.slug}`}
                  className="text-purple-600 hover:underline"
                >
                  مشاهده محصولات
                </Link>
              )}

              <Link
                href={`/admin/categories/edit/${cat.slug}`}
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