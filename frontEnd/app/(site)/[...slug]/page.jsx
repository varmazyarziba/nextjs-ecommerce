import { notFound } from "next/navigation";

import Breadcrumb from "../components/category/Breadcrumb";
import CategoryGrid from "../components/category/CategoryGrid";
import ProductGrid from "../components/category/ProductGrid";
import CategorySidebar from "../components/category/CategorySidebar";

async function getCategoryPage(slug) {
  const res = await fetch(
    `http://localhost:5000/api/categories/page/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const currentSlug = slug.at(-1);

  const data = await getCategoryPage(currentSlug);

  if (!data) {
    return {
      title: "دسته یافت نشد",
    };
  }

  return {
    title: data.category.title,
    description: data.category.title,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const currentSlug = slug.at(-1);

  const data = await getCategoryPage(currentSlug);

  if (!data) {
    notFound();
  }

  const {
    category,
    breadcrumb,
    children,
    products,
    categoryTree,
  } = data;

  return (
    <div className="max-w-[1500px] mx-auto px-5 py-8">
      <Breadcrumb items={breadcrumb} />

     
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3">
          <CategorySidebar
            categoryTree={categoryTree}
            currentPath={category.fullPath}
          />
        </aside>

        <section className="col-span-12 lg:col-span-9">
          {children.length > 0 ? (
            <CategoryGrid categories={children} />
          ) : (
            <ProductGrid products={products} />
          )}
        </section>
      </div>
    </div>
  );
}