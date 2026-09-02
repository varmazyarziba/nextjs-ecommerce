"use client";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function SideCart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    closeCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const FREE_SHIPPING_LIMIT = 3000000;

  const remaining =
    FREE_SHIPPING_LIMIT - total;
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-30 transition-all ${
          isCartOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      />

      {/* Side Cart */}
      <div
        className={` fixed top-0 left-0 h-full max-w-[340px] w-full bg-white z-50 flex flex-col transform ${
          isCartOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          transition: "transform 0.5s cubic-bezier(0.19,1,0.22,1)",
        }}
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center text-gray-800 border-b border-gray-200
         shadow-green-300/150 shadow-lg">
          <h2 className="text-md ">سبد خرید شما</h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">
              سبد خرید خالی است
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-300  p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Image
                    src="/images/ardunio.png"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <p className="flex-1 text-center font-medium">
                    {item.title}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-green-500">
                      {(item.price * item.quantity).toLocaleString("fa-IR")}
                    </span>{" "}
                    = {item.quantity} ×{" "}
                    <span className="text-red-400">
                      {item.price.toLocaleString("fa-IR")}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 border border-gray-300 rounded-r disabled:opacity-40"
                    >
                      −
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-20 h-7 border-t border-b border-gray-300 text-center"
                    />

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 border border-gray-300 rounded-l"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="  bg-white ">
          <div className="flex  items-center justify-between p-4 border border-gray-200 mb-3">
            <p className="text-lg font-bold text-gray-700 ">
             مجموع:
          </p>
           <p className="text-xl font-bold text-red-400 ">{total.toLocaleString("fa-IR")} تومان </p>
          
          </div>
           <p className="text-sm text-gray-700  text-center">
    {total < FREE_SHIPPING_LIMIT ? (
      <>
        <span className="font-bold text-red-400 p-2 ">
          {remaining.toLocaleString("fa-IR")} تومان 
        </span>{" "}
         مانده تا ارسال رایگان
      </>
    ) : (
      "🎉 ارسال سفارش شما رایگان شد"
    )}
  </p>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden m-2">
              <div
                className="h-full bg-red-400 transition-all p-3"
                style={{
                  width: `${Math.min(
                    (total / FREE_SHIPPING_LIMIT) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          
           <Link
            href="/checkout"
            onClick={closeCart}
            className="block text-center  text-red-400 py-4 "
          >
           مشاهده سبد خرید
           </Link>
          <Link
            href="/checkout"
            onClick={closeCart}
            className="block text-center bg-red-400 text-white py-2 m-6 rounded-md hover:bg-[#b7274e]"
          >
           تسویه حساب
          </Link>
        </div>
      </div>
    </>
  );
}
