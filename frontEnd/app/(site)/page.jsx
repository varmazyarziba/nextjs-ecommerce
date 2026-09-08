"use client";
import BannerTimer from "./components/BannerTimer";
import Simple from "./components/CategoryMegaMenu"
import { categories } from "./data/categories";
import {products} from "./data/products"
import ProductCart from "./components/ProductCard"
import Image from "next/image";
import Slider from './components/Slider'
import {useState} from 'react'
import Link from 'next/link'
import { ArrowLeft } from "lucide-react";

export default function Home() {
  const [counter,setCounter]=useState(0)

   let showProduct = products.slice(counter,counter+5)
   let showProduct2 = products.slice(counter,counter+6)
  return (
    
    <>
    
      {/* Hero Section */}
      <section className="flex gap-2 text-white py-3 h-[536px] text-center px-4">
        {/* <Image
        className="rounded-lg"
        src="/images/home2.png"
        alt="hero"
        width={800}
        height={50}
        
        />
        */}
        <Slider />
         <Image 
        className="mt-12 mb-12 overflow-hidden shadow-xl border-4 border-gray-300 rounded-2xl"
        src="/images/home5.jpg"
        alt="hero"
        width={800}
        height={100}
        
        />
        {/* <h1 className="text-4xl md:text-5xl font-bold mb-4">
          فروشگاه تخصصی قطعات الکترونیکی
        </h1>
        <p className="text-lg md:text-xl mb-6">
          مقاومت، خازن، آی‌سی، ماژول و ابزار با بهترین قیمت
        </p>
         */}
      </section>

      {/* Categories Section */}
      <section className="max-w-9xl bg-[#f6f6f6] rounded-xl shadow-purple-500/50 mx-auto py-4 px-4">
       <div className="flex justify-between mb-6">
        <p className="text-2xl font-bold text-white "> محصولات جدید </p>
        <div className="flex  text-white bg-red-500 py-2 px-3 rounded-3xl">
           <Link href="" className="text-md text-sm font-bold pl-2
       ">محصولات بیشتر </Link><ArrowLeft/></div>
       </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto">
          {showProduct.map((product) => (
            <ProductCart key={product.slug} product={product} />
          ))}
        </div>
      </section>
       <section className="max-w-9xl  rounded-xl  my-16 py-4 px-4">
       <div className="flex justify-between mb-6">
        <p className="text-2xl mx-5 font-bold text-gray-800 "> محصولات پرفروش </p>
        <div className="flex  text-white bg-red-500 py-2 px-3 rounded-3xl">
           <Link href="" className="text-md text-sm font-bold pl-2
       ">محصولات بیشتر </Link><ArrowLeft/></div>
       </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 h-auto">
          {showProduct2.map((product) => (
            <ProductCart key={product.slug} product={product} />
          ))}
        </div>
      </section>
    
      <div className="relative w-full overflow-hidden">

  {/* بکگراند */}
  <Image
    className="w-full h-[220px] md:h-[320px] object-cover"
    alt="electronic1"
    width={1200}
    height={300}
    src="/images/bgn.jpg"
  />

  {/* لایه رویی */}
  <div className="absolute inset-0 flex items-center justify-center gap-65 px-6 md:px-16">
{/* تصویر محصول */}
    <Image
      className="w-[120px] md:w-[360px] h-auto"
      alt="electronic"
      width={300}
      height={300}
      src="/images/372779.png"
    />
    {/* متن */}
    <div className="max-w-[60%] text-gray-800">
      <h2 className="font-bold  text-xl md:text-5xl mb-2 md:mb-4">
        فروش ویژه الکمیک
      </h2>

      <p className="text-sm m-6 md:text-lg">
        برای دریافت تخفیف تا 20 درصد عجله کنید!
      </p>
      <BannerTimer />
      <button className="text-center p-2 bg-red-400 w-120 text-white rounded-xs mt-6">خرید کنید</button>
    </div>

    

  </div>
</div>



    
    
    </>
  );
}