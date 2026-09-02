"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("آیا از حذف محصول مطمئن هستید؟")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchProducts();
      } else {
        alert("خطا در حذف محصول");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <p className="p-8">در حال بارگذاری...</p>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">
          لیست محصولات
        </h1>

        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + افزودن محصول
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b bg-gray-50">

            <tr>

              <th className="p-3">تصویر</th>

              <th className="p-3 text-right">نام</th>

              <th className="p-3 text-right">
                دسته
              </th>

              <th className="p-3">
                قیمت
              </th>

              <th className="p-3">
                قیمت تخفیف
              </th>

              <th className="p-3">
                موجودی
              </th>

              <th className="p-3">
                برچسب
              </th>

              <th className="p-3">
                بازدید
              </th>

              <th className="p-3">
                وضعیت
              </th>

              <th className="p-3">
                عملیات
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">

                  <img
                    src={
                      product.images?.length
                        ? product.images[0]
                        : "/no-image.png"
                    }
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                </td>

                <td className="p-3 font-medium">

                  {product.title}

                </td>

                <td className="p-3 text-sm text-gray-500">

                  {product.categoryPath}

                </td>

                <td className="p-3">

                  {product.price.toLocaleString()} تومان

                </td>

                <td className="p-3">

                  {product.discountPrice
                    ? product.discountPrice.toLocaleString()
                    : "-"}

                </td>

                <td className="p-3">

                  {product.stock}

                </td>

                <td className="p-3">

                  <div className="flex flex-wrap gap-1">

                    {product.tags?.map((tag) => (

                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>

                    ))}

                  </div>

                </td>

                <td className="p-3">

                  {product.views}

                </td>

                <td className="p-3">

                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {product.isActive
                      ? "فعال"
                      : "غیرفعال"}
                  </span>

                </td>

                <td className="p-3">

                  <div className="flex gap-3">

                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="text-blue-600"
                    >
                      ویرایش
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="text-red-600"
                    >
                      حذف
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}