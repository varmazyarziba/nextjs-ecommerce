import Link from "next/link";

export default function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {categories.map((category) => (

        <Link
          key={category._id}
          href={`/${category.fullPath}`}
          className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-[#CB2D58] hover:shadow-lg transition duration-300"
        >

          <div className="flex flex-col items-center">

            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">

              <span className="text-4xl">
                📦
              </span>

            </div>

            <h2 className="text-lg font-bold text-center group-hover:text-[#CB2D58] transition">

              {category.title}

            </h2>

          </div>

        </Link>

      ))}

    </div>
  );
}