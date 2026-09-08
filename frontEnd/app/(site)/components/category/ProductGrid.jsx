import Link from "next/link";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
        محصولی در این دسته وجود ندارد.
      </div>
    );
  }
console.log(products);
  return (
  
    <div>
      <div className=" flex border border-gray-200 block p-3 mb-3">
        <span className="text-2xl  ">
          فروشگاه
        </span>
        <span></span>
      </div>
     <div  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 ">
    
     
      {products.map((product) => (

        <Link
          key={product._id}
          href={`/${product.categoryPath}/${product.slug}`}
          className="bg-white rounded-xl  hover:shadow-lg transition overflow-hidden group"
        >

          <div className="aspect-square  flex items-center justify-center">

            {product.images?.length ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition"
              />
            ) : (
              <span className="text-5xl">
                📦
              </span>
            )}

          </div>

          <div className="p-4">

            <h2 className="font-bold mb-3 line-clamp-2 min-h-[52px]">
              {product.title}
            </h2>

            {product.stock > 0 ? (
              <span className="text-green-600 text-sm">
                موجود
              </span>
            ) : (
              <span className="text-red-500 text-sm">
                ناموجود
              </span>
            )}

            <div className="mt-4 flex items-center justify-between">

              <span className="font-bold text-[#CB2D58] text-lg">
                {product.price.toLocaleString()} تومان
              </span>

              <button className="bg-[#CB2D58] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#b5284d] transition">
                مشاهده
              </button>

            </div>

          </div>

        </Link>

      ))}
    </div>
    </div>
   
  );
}