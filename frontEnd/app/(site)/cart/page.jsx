"use client";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } =
    useContext(CartContext);
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const FREE_SHIPPING_LIMIT = 3000000;

  const remaining =
    FREE_SHIPPING_LIMIT - total;

  if (cart.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">
          سبد خرید شما خالی است
        </h1>
        <p className="text-gray-500 mb-8">
          هنوز محصولی به سبد خرید اضافه نکرده‌اید
        </p>
        <Link
          href="/"
          className="inline-block bg-[#CB2D58] text-white px-8 py-3 rounded-xl hover:bg-[#b7274e] transition"
        >
          بازگشت به فروشگاه
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-8xl mx-auto py-10 px-4">
      <div className="flex p-15 bg-gray-300 rounded-xl mb-8">
        <p className="text-2xl font-bold ">
        سبد خرید {" "}
      </p>
      <p  className="text-2xl font-bold ml-4 mr-4">------- </p>
      <Link   className="text-2xl font-bold " href="/checkout" >   تسویه حساب  </Link> {" "} 
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 🛒 Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="mb-4 bg-white p-10 rounded-xl">
  <p className="text-sm text-gray-700 mb-2">
    {total < FREE_SHIPPING_LIMIT ? (
      <>
        <span className="font-bold text-red-700">
          {remaining.toLocaleString()} تومان 
        </span>{" "}
         مانده تا ارسال رایگان
      </>
    ) : (
      "🎉 ارسال سفارش شما رایگان شد"
    )}
  </p>

  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-[#CB2D58] transition-all"
      style={{
        width: `${Math.min(
          (total / FREE_SHIPPING_LIMIT) * 100,
          100
        )}%`,
      }}
    />
  </div>
</div>
 <table  className="grid p-4 rounded-xl bg-white ">
  <thead >
                 <tr className='p-3  border-b-[2px] border-gray-100 flex justify-around ' >

                 <th className='flex-1 text-center '>محصول</th>
                  <th className='flex-1 text-end '>قیمت (تومان) </th>
                 <th className='flex-1 text-end'>تعداد </th>
                 <th className='flex-1 text-end' > جمع جزء</th> 
                 </tr>
                 </thead>
<tbody>
  {cart.map((item) => (
    <tr key={item.id} className='justify-between mb-1 p-5 border-b border-gray-100 gap-3 text-gray-800 flex  '>
       
        <td className="flex text-start" > 
           <button
            onClick={() => removeFromCart(item.id)}
            className=" p-3 text-gray-400 justify-right hover:text-red-500"
          >
            ✕
        </button>
            <Image className ='flex-1 text-right rounded-xs pl-3' alt="electronic" src={'/images/elec2.png'} 
            width={70} height={50} />
            <p className="w-32 text-sm align-center">{item.title}</p>
        </td>
        <td>
            {item.price.toLocaleString()} 
        </td>
        <td className="flex items-center ">
           {item.quantity === item.stock &&  <p className="block font-bold text-red-500 ">Out of stock!</p>}
          <button
            disabled={item.quantity <= 1}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-7 h-7 border border-gray-300 rounded-r disabled:opacity-40"
          >
            −
          </button>
          <span className="  w-20 h-7 border-t border-b border-gray-300 text-center">
            {item.quantity}
          </span>
          

          <button
           disabled={item.quantity >= item.stock}
            onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-7 h-7 border border-gray-300 rounded-l"
            >
            +
          </button>

        </td>
        <td>
          {(item.price * item.quantity).toLocaleString()}         
        </td>     
    </tr>
          ))}
</tbody>
</table>
          
        </div>
        {/* 💳 Order Summary */}
        <div className="bg-white  rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-lg text-center font-bold mb-4">
           مجموع سبد خرید
          </h2>

          <div className="flex justify-between mb-6 text-gray-600">
            <span>جمع جزء</span>
            <span>{total.toLocaleString()} تومان</span>
          </div>

          <div className="flex justify-between border-t border-gray-300 pt-3  mb-6 text-gray-600">
            <span>حمل و نقل </span>
            <span> تیپاکس  </span>
          </div>

          <div className="border-t-[1px] pt-4 flex border-gray-300 mt-6 justify-between font-bold text-lg">
            <span>  مجموع</span>
            <span>{total.toLocaleString()} تومان</span>
          </div>

          <Link
            href="/checkout"
            className="block text-center mt-6 bg-[#CB2D58] hover:bg-[#b7274e] text-white py-3 rounded-xl transition"
          >
           اقدام به پرداخت
          </Link>
        </div>
      </div>
    </section>
  );
}
