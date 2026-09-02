import Link from "next/link";

export default function SubCategoryCard({subCategory }) {
  return (
    <Link
      href={`/${subCategory.categorySlug}/${subCategory.slug}`}  // مسیر به لیست محصولات همان زیر‌دسته
      className="bg-white p-4 rounded shadow hover:shadow-md flex items-center justify-center"
    >
      <span className="text-gray-800 font-medium">{subCategory.title}</span>
    </Link>
  );
}