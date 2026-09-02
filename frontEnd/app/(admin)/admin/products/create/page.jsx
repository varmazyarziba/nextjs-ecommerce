"use client";

import { useEffect, useState } from "react";

export default function CreateProductPage() {
const [loading, setLoading] = useState(false);

const [mainCategories, setMainCategories] = useState([]);
const [subCategories, setSubCategories] = useState([]);
const [childCategories, setChildCategories] = useState([]);

const [mainCategory, setMainCategory] = useState("");
const [subCategory, setSubCategory] = useState("");
const [childCategory, setChildCategory] = useState("");

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

const [price, setPrice] = useState("");
const [discountPrice, setDiscountPrice] = useState("");
const [stock, setStock] = useState("");
const [sku, setSku] = useState("");

const [images, setImages] = useState([]);
const [imagePreview, setImagePreview] = useState([]);

const [isActive, setIsActive] = useState(true);

const [tags, setTags] = useState([]);

const [specs, setSpecs] = useState([
{
key: "",
value: "",
},
]);

// دسته های اصلی
useEffect(() => {
fetch("http://localhost:5000/api/categories")
.then((res) => res.json())
.then((data) => {
setMainCategories(data);
})
.catch(console.error);
}, []);

// زیر دسته ها
useEffect(() => {
if (!mainCategory) return;

fetch(
  `http://localhost:5000/api/categories?parent=${mainCategory}`
)
  .then((res) => res.json())
  .then((data) => {
    setSubCategories(data);
    setSubCategory("");
    setChildCategory("");
    setChildCategories([]);
  })
  .catch(console.error);


}, [mainCategory]);

// زیر زیر دسته ها
useEffect(() => {
if (!subCategory) return;


fetch(
  `http://localhost:5000/api/categories?parent=${subCategory}`
)
  .then((res) => res.json())
  .then((data) => {
    setChildCategories(data);
    setChildCategory("");
  })
  .catch(console.error);


}, [subCategory]);

// تصاویر
const handleImages = (e) => {
const files = [...e.target.files];


setImages(files);

const previews = files.map((file) =>
  URL.createObjectURL(file)
);

setImagePreview(previews);


};

// مشخصات فنی
const addSpec = () => {
setSpecs([
...specs,
{
key: "",
value: "",
},
]);
};

const removeSpec = (index) => {
const updated = [...specs];
updated.splice(index, 1);
setSpecs(updated);
};

const updateSpec = (index, field, value) => {
const updated = [...specs];

updated[index][field] = value;
setSpecs(updated);

};

// تگ ها
const toggleTag = (tag) => {
if (tags.includes(tag)) {
setTags(tags.filter((t) => t !== tag));
} else {
setTags([...tags, tag]);
}
};

// ثبت محصول
const handleSubmit = async (e) => {
e.preventDefault();

try {
  setLoading(true);

  // آپلود تصاویر
  let imageUrls = [];

  if (images.length > 0) {
    const formData = new FormData();

    images.forEach((file) => {
      formData.append("images", file);
    });

    const uploadRes = await fetch(
      "http://localhost:5000/api/upload/products",
      {
        method: "POST",
        body: formData,
      }
    );

    imageUrls = await uploadRes.json();
  }

  // مشخصات فنی
  const specsObject = {};

  specs.forEach((item) => {
    if (item.key.trim()) {
      specsObject[item.key] = item.value;
    }
  });

  // آخرین دسته انتخاب شده
  const finalCategory =
    childCategory ||
    subCategory ||
    mainCategory;

  if (!finalCategory) {
    alert("دسته بندی را انتخاب کنید");
    return;
  }

  const productData = {
    title,
    description,

    price: Number(price),

    discountPrice: discountPrice
      ? Number(discountPrice)
      : undefined,

    stock: Number(stock),

    sku,

    images: imageUrls,

    category: finalCategory,

    specs: specsObject,

    tags,

    isActive,
  };

  const res = await fetch(
    "http://localhost:5000/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  alert("محصول با موفقیت ثبت شد");

  console.log(data);

} catch (error) {
  console.error(error);

  alert(error.message);
} finally {
  setLoading(false);
}


};

return ( <div className="bg-white p-6 rounded-2xl shadow">

  <h1 className="text-2xl font-bold mb-6">
    افزودن محصول
  </h1>

  <form
    onSubmit={handleSubmit}
    className="space-y-8"
  >
    {/* اطلاعات اصلی */}
    <div>
      <h2 className="font-bold mb-4">
        اطلاعات محصول
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="نام محصول"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) =>
            setSku(e.target.value)
          }
          className="border rounded-lg p-3"
        />

      </div>

      <textarea
        rows="5"
        placeholder="توضیحات محصول"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="border rounded-lg p-3 w-full mt-4"
      />
    </div>

    {/* دسته بندی */}
    <div>
      <h2 className="font-bold mb-4">
        دسته بندی
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          value={mainCategory}
          onChange={(e) =>
            setMainCategory(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            انتخاب دسته اصلی
          </option>

          {mainCategories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.title}
            </option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) =>
            setSubCategory(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            انتخاب زیر دسته
          </option>

          {subCategories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.title}
            </option>
          ))}
        </select>

        <select
          value={childCategory}
          onChange={(e) =>
            setChildCategory(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">
            انتخاب زیر زیر دسته
          </option>

          {childCategories.map((cat) => (
            <option
              key={cat._id}
              value={cat._id}
            >
              {cat.title}
            </option>
          ))}
        </select>

      </div>
    </div>

    {/* قیمت */}
    <div>
      <h2 className="font-bold mb-4">
        قیمت و موجودی
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          type="number"
          placeholder="قیمت تخفیف"
          value={discountPrice}
          onChange={(e) =>
            setDiscountPrice(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          placeholder="موجودی"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          className="border rounded-lg p-3"
        />

      </div>
    </div>

    {/* تصاویر */}
    <div>
      <h2 className="font-bold mb-4">
        تصاویر محصول
      </h2>

      <input
        type="file"
        multiple
        onChange={handleImages}
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">

        {imagePreview.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="h-24 w-full object-cover rounded-lg border"
          />
        ))}

      </div>
    </div>

    {/* مشخصات فنی */}
    <div>
      <h2 className="font-bold mb-4">
        مشخصات فنی
      </h2>

      {specs.map((spec, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-3 mb-3"
        >
          <input
            type="text"
            placeholder="نام مشخصه"
            value={spec.key}
            onChange={(e) =>
              updateSpec(
                index,
                "key",
                e.target.value
              )
            }
            className="border rounded-lg p-3"
          />

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="مقدار"
              value={spec.value}
              onChange={(e) =>
                updateSpec(
                  index,
                  "value",
                  e.target.value
                )
              }
              className="border rounded-lg p-3 flex-1"
            />

            <button
              type="button"
              onClick={() =>
                removeSpec(index)
              }
              className="px-4 border rounded-lg"
            >
              حذف
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSpec}
        className="px-4 py-2 border rounded-lg"
      >
        افزودن مشخصه
      </button>
    </div>

    {/* تگ ها */}
    <div>
      <h2 className="font-bold mb-4">
        برچسب ها
      </h2>

      <div className="flex gap-6">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tags.includes("featured")}
            onChange={() =>
              toggleTag("featured")
            }
          />
          ویژه
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tags.includes("bestSeller")}
            onChange={() =>
              toggleTag("bestSeller")
            }
          />
          پرفروش
        </label>

      </div>
    </div>

    {/* وضعیت */}
    <div>
      <label className="flex items-center gap-2">

        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(e.target.checked)
          }
        />

        فعال

      </label>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="bg-[#CB2D58] text-white px-8 py-3 rounded-xl"
    >
      {loading
        ? "در حال ثبت..."
        : "ثبت محصول"}
    </button>

  </form>
</div>


);
}
