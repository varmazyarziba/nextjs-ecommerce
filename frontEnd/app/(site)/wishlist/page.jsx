"use client";

import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCart from "../components/ProductCard"
export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return <p className="text-center py-20">لیست علاقه‌مندی خالی است</p>;
  }

  return (
    <div className="max-w-5xl mx-auto py-5">
      <h1 className=" text-2xl font-bold mb-6">لیست علاقه‌مندی‌های من</h1>

      <div className="flex gap-2">
        {wishlist.map((product) => (
         <ProductCart key={product.slug} product={product} />
      ))}
      </div>
    </div>
  );
}
