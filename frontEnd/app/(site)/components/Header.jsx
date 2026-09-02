"use client";

import Link from "next/link";
import Image from "next/image"
import { useContext } from "react";
import {CartContext} from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import CategoryMenu from "./CategoryGraduation";
import SearchBar from "./SearchBar";
import CategoryMegaMenu from './CategoryMegaMenu'
import { UserPlus,ShoppingCart,LogIn,Menu,GraduationCap,Clock,AlertCircle,HelpCircle,Users,ClipboardList, WholeWord, OctagonAlertIcon, EarthIcon, PhoneOutgoingIcon, LogInIcon, Heart, LucideGitCompare, GitCompareArrowsIcon, UserCircle, User  } from "lucide-react";
import CategoryGraduation from "./CategoryGraduation";
import { enTofa } from "../../../Utils/Utilities";
import { useAuth } from "../context/AuthContext";
import UserMenu from "../components/UserMenu";

export default function Header() {
  const { wishlist } = useContext(WishlistContext);
  const { user, logout, loading } = useAuth();
  const {cart} = useContext(CartContext)
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <header className="bg-white ">
      <div className="max-w-9xl ">

        {/* 🔹 ردیف بالا */}
        <div className="flex items-center justify-between  px-4 gap-4">

          {/* لوگو + سرچ */}
          <div className="flex items-center gap-6 flex-1 px-4 py-1">

            {/* لوگو */}
            <Link
              href="/"
              className="text-2xl  text-blue-600 whitespace-nowrap"
            >
              فروشگاه الکترونیک
            </Link>

            {/* سرچ (عریض) */}
            <div className="flex-1  ">
              <SearchBar />
            </div>
            <div className="flex my-3 text-sm text-[#242424] gap-2">
             <Image alt="" src="/images/worldwide.svg" width={40} height={40} strokeWidth={1.5} className=""/>
              <div className="" >
                <p className="">ارسال سریع</p>
              <p className="text-red-700 py-1 font-thin">برای کل کشور</p>
              </div>
            </div>
              <div className="flex text-sm text-[#242424] gap-2">
               <Image alt="support" src="/images/support.svg" width={40} height={40} strokeWidth={1.5} className=""/>
             <div>
               <p> پشتیبانی 9 الی 12</p>
              <p className="text-gray-600 py-1 font-thin"> 02144465779 </p>
             </div>
            </div>
          </div>
        </div>

        {/* 🔹 ردیف پایین: منوی دسته‌ها */}
          <nav className=" text-xs bg-[#e6effd] font-bold">
            <div className="flex items-center justify-between py-2 px-4">

              {/* سمت راست */}
              <ul className="flex items-center">
                <li className="ml-7 flex items-center rounded-full  ">
                  <CategoryMegaMenu />
                </li>

                <li className="ml-7 flex items-center">
                <CategoryGraduation />
                </li>

                <li className="ml-7 flex items-center relative group" >
                  <button className="
                    flex items-center gap-1
                    
                    py-2
                    rounded
                    text-sm
                    after:content-['']
                    after:absolute
                    after:left-1/2
                    after:bottom-0
                    after:h-[2px]
                    after:w-0
                    after:bg-[#CB2D58]
                    after:transition-all
                    after:duration-300
                    after:-translate-x-1/2
                    hover:after:w-full
                  ">
                  <Users size={18}  />
                  انجمن
                  </button>
                </li>
                <li className="ml-7 flex items-center relative group" >
                  <button className="
                    flex items-center gap-1
                   
                    py-2
                    rounded
                    text-sm
                    after:content-['']
                    after:absolute
                    after:left-1/2
                    after:bottom-0
                    after:h-[2px]
                    after:w-0
                    after:bg-[#CB2D58]
                    after:transition-all
                    after:duration-300
                    after:-translate-x-1/2
                    hover:after:w-full
                  ">
                  <Clock size={16}  />
                  جدیدترین کالاها
                  </button>
                </li>
                <li className="ml-7 flex items-center relative group" >
                  <button className="
                    flex items-center gap-1
                    
                    py-2
                    rounded
                    text-sm
                    after:content-['']
                    after:absolute
                    after:left-1/2
                    after:bottom-0
                    after:h-[2px]
                    after:w-0
                    after:bg-[#CB2D58]
                    after:transition-all
                    after:duration-300
                    after:-translate-x-1/2
                    hover:after:w-full
                  ">
                  <ClipboardList size={18} />
                  درخواست واردات
                  </button>
                </li>
                 <li className="flex items-left text-xs px-2 text-gray-700 ">
                <a  href="/aboutUs" className="relative flex"> 
                  <AlertCircle size={18} className="pl-1" />
                  درباره ما</a>
                </li>

                <li className="flex items-left px-3 text-gray-700">
                <a  href="/question" className="relative flex"><HelpCircle size={18} className="pl-1" />
                  سوالی دارین؟</a>  
                </li>
              </ul>
 {/* <ul className="flex items-center gap-6 font-thin ml-7">
               
              </ul> */}
              {/* سمت چپ */}
             
  {/* لاگین + سبد خرید */}
            <div className="flex justify-end w-lg  px-4 items-center gap-4 whitespace-nowrap text-md">
               
                  {wishlist.length>0 ?
                  <div className="flex relative  bg-[#ef5350] rounded-full text-gray-700  hover:text-gray-900 py-1  px-1">
                 <Link href="/wishlist">
                 <Heart size={40} alt="user" strokeWidth={1.5} className="text-gray-100 border animate-pulse rounded-full p-2 hover:text-gray-100" /> 
                 <span className='border-white w-5 h-5 absolute  text-xs flex 
                items-center justify-center rounded-full  top-[-7px] end-[-7px]  ml-1 rounded-xl 
                  bg-[#ffffff] px-2 py-1 text-xs text-[#ef5350] font-bold'>
                  <span className="nav-link">{wishlist.length}</span> 
                  </span>
                  </Link>
                  </div>
                  :
                  <div className="flex relative   rounded-full text-gray-700 hover:text-gray-900 py-1  px-1">
                 <Link href="/wishlist">
                 <Heart size={40} alt="user" strokeWidth={1.5} className="text-black border border-gray-300 rounded-full p-2 hover:text-gray-400" /> 
                 <span className='border-white w-5 h-5 absolute  text-xs flex 
                items-center justify-center rounded-full font-bold  top-[-7px] end-[-7px]  ml-1 rounded-xl 
                  bg-[#ffffff] px-2 py-1 text-xs text-[#ef5350] font-bold'>
                  
                   0
                      </span>
              </Link>
               </div>
               }
                <Link href="/">
          <GitCompareArrowsIcon size={40} alt="user" strokeWidth={1.5} className="text-black border border-gray-300 rounded-full p-2 hover:text-gray-400"/> 
              </Link>
              {!user ? (
              <Link
                href="/login"
              >
            <User size={40} strokeWidth={1.5}  className="text-black border border-gray-300 rounded-full p-2" /> 
              </Link>
              ) : (
            user && <UserMenu />
          )}
        
           <div className="h-[18px] bg-black border border-gray-300"></div>
           <div  className="  flex relative  bg-[#ef5350] rounded-full text-gray-700 hover:text-gray-900 py-1  px-1">
           
           <Link
                href="/cart"
               
              >
             
                <ShoppingCart  className=" text-[#242424] bg-white rounded-full p-1 w-8" size={33} strokeWidth={1.5} />  
                <span className='border-white w-5 h-5 absolute  text-xs flex 
                items-center justify-center rounded-full font-bold  top-[-7px] end-[-7px]  ml-1 rounded-xl 
                  bg-[#ffffff] px-2 py-1 text-xs text-[#ef5350] font-bold'>
                  {cart.length>0 ? <span className="nav-link">{enTofa(cart.length) }</span> : "0"}
                      </span>
              </Link>
              {cart.length === 0 ? (
            <p className="text-center p-2 text-white">0 تومان</p>
          ) : (
             <p className="text-center p-2 text-white"> {total.toLocaleString()} تومان</p>  
          )} 
           </div>
            
             
            </div>
            </div>
          </nav>
        </div>
    </header>
  );
}
