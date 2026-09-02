"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCategoryPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("main"); // main | sub | child
  const [parent, setParent] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let level = 0;
    let parentId = null;

    if (type === "sub") {
      level = 1;
      parentId = parent;
      if (!parentId) return alert("باید یک دسته اصلی انتخاب شود");
    }

    if (type === "child") {
      level = 2;
      parentId = parent;
      if (!parentId) return alert("باید یک زیر دسته انتخاب شود");
    }

    const res = await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        parent: parentId,
        level,
      }),
    });

    if (res.ok) {
      alert("دسته ایجاد شد ✅");
      router.push("/admin/categories");
    } else {
      alert("خطا ❌");
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-6">ایجاد دسته بندی</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* عنوان */}
        <div>
          <label>عنوان</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* نوع دسته */}
        <div>
          <label>نوع دسته</label>
          <select
            className="w-full border p-2 rounded"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setParent("");
            }}
          >
            <option value="main">دسته اصلی</option>
            <option value="sub">زیر دسته</option>
            <option value="child">زیرِ زیر دسته</option>
          </select>
        </div>

        {/* انتخاب والد (فقط اگر sub یا child باشد) */}
        {type !== "main" && (
          <div>
            <label>انتخاب دسته والد</label>

            <select
              className="w-full border p-2 rounded"
              value={parent}
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">انتخاب کنید</option>

              {categories
                .filter(cat =>
                  type === "sub"
                    ? cat.level === 0
                    : cat.level === 1
                )
                .map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
            </select>
          </div>
        )}

        <button className="bg-[#CB2D58] text-white px-6 py-2 rounded">
          ایجاد دسته
        </button>

      </form>
    </div>
  );
}