"use client";
import { WishlistContext } from "../context/WishlistContext";
import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Star,
  Heart,
  BarChart2,
  ShoppingCart,
} from "lucide-react";

export default function ProductCard({ product }) {
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;
const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

const liked = isInWishlist(product.id);

  return (
    <div className="relative group bg-white p-4 rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      
      {/* ستون اکشن hover */}
      <div
        className=" 
          absolute top-4 left-2 z-10 
          flex flex-col gap-2
          opacity-0 -translate-x-4
          group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-white group-hover:shadow group-hover:text-gray-600 px-1
          rounded-xl transition-all duration-300
        "
      >
        {/* علاقه مندی */}
        <button
  onClick={() => toggleWishlist(product)}
  title="افزودن به علاقه‌مندی"
  className="relative w-10 h-10 bg-white   flex items-center justify-center
              transition "
>
  <Heart
  size={23}
  className={liked ? "text-red-500 animate-pulse fill-red-500" : " hover:text-red-400"}
/>

  {/* تیک‌ها */}
  

</button>


        {/* مقایسه */}
        <button
          title="مقایسه"
          className="w-10 h-10 bg-white  flex items-center justify-center
                      hover:text-red-400 transition "
        >
          <BarChart2 size={25} />
        </button>

        {/* افزودن به سبد */}
        {isInStock && (
          <button
            title="افزودن به سبد خرید"
            className="w-10 h-10 bg-white flex items-center justify-center
                       hover:text-red-400 transition "
          >
            <ShoppingCart size={25}  />
          </button>
        )}
      </div>

      {/* محتوای کارت */}
      <div className="flex-1">
        <Image
          src="/images/1x/boarf.webp"
          width={250}
          height={250}
          alt={product.title}
          className="mx-auto rounded"
        />

        <h3 className="text-gray-800 text-md py-3">
          {product.title}
        </h3>

        {/* ستاره‌ها */}
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} strokeWidth={1.3} />
          ))}
        </div>

        {/* وضعیت موجودی */}
        <div className="my-3">
          {isLowStock && (
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full animate-pulse">
              ⚠️ فقط {product.stock} عدد باقی مانده
            </span>
          )}

          {isInStock && !isLowStock && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#ef5350]">
              <Check size={16} />
              <span className="text-black">
                موجود در انبار ({product.stock})
              </span>
            </span>
          )}
        </div>

        {/* قیمت یا ناموجود */}
        {isInStock ? (
          <p className="text-sm font-semibold text-[#ef5350]">
            {product.price.toLocaleString()} تومان
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="text-sm text-red-600 font-medium">
              ● ناموجود
            </span>

            <button
              className="w-fit px-4 py-2 text-sm font-medium text-[#CB2D58]
                         border border-[#CB2D58] rounded-lg
                         hover:bg-[#CB2D58] hover:text-white transition"
            >
              🔔 اگر موجود شد اطلاع بده
            </button>
          </div>
        )}
      </div>

      {/* دکمه مشاهده */}
      <Link
        href={`/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`}
        className="mt-4 bg-[#ef5350] text-white py-2 rounded text-center hover:bg-[#d84343] transition"
      >
        مشاهده محصول
      </Link>
    </div>
  );
}
