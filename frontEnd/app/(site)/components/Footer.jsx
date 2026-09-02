"use client";

import Link from "next/link";
import Image from 'next/image'
export default function Footer() {
  return (
    <footer className=" ">
      <div className="bg-white max-w-7xl mx-auto py-8 px-4 mb-8 mt-12 ml-19 mr-19 rounded-2xl flex 
       justify-between  divide-x-2 divide-dashed divide-gray-500">

        {/* درباره فروشگاه */}
        <div className=" md:flex-3 justify-items-center ">
          <Image alt="electronic" src={'/images/elec2.png'} width={200} height={50}/>
          {/* <h3 className="text-lg font-bold center">فروشگاه الکترونیک</h3> */}
          {/* <p className="text-sm">
            فروش تخصصی قطعات الکترونیکی: مقاومت، خازن، آی‌سی، ماژول و ابزار.
          </p> */}
        </div>

        {/* لینک‌های دسته‌ها */}
        <div className=" md:flex-10 justify-items-center">
          <p className=" text-sm font-bold mb-2 flex justify-center ">نشانی ما</p>
          <p className="flex text-xs pb-2 justify-center">خراسان رضوی - شاندیز - صدر رضوی 8 - دفتر فروشگاه اینترنتی الکمیک - کد پستی: 1583658713</p>
        <p className=" text-sm font-bold mb-2 flex justify-center "> ساعات پاسخگویی</p>
          <p className="flex text-xs pb-2 justify-center" >  10 تا 15 </p>
           <p className=" text-sm font-bold mb-2 flex justify-center ">  شماره تماس پشتیبانی</p>
          <p className="flex  text-xs pb-2  justify-center" >  02191016559   </p>
        </div>

        {/* تماس با ما */}
        <div className=" md:flex-3 justify-items-center ">
          <Image alt="electronic" src={'/images/elec2.png'} width={200} height={50}/>
         
        </div>

      </div>

      {/* کپی‌رایت */}
    
      <div className=" bg-white text-center text-sm text-gray-500 py-4  mt-8">
        © 2025 فروشگاه قطعات الکترونیکی. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}