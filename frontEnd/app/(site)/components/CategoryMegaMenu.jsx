"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid,Menu, ChevronDown } from "lucide-react";
import { categories } from "../data/categories";
import { subCategories } from "../data/subCategories";
import {products} from "../data/products"

export default function CategoryMegaMenu() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="relative group">

      {/* دکمه دسته‌بندی */}
      <button className="
        flex items-center gap-2
        py-1
        rounded-full
        text-sm
        bg-white
        hover:transition-all
        hover:duration-300
        hover:bg-red-400 hover:text-white
      ">
        <Menu size={35} className="bg-red-400 rounded-full text-white p-2" />
        دسته‌بندی کالا
        <ChevronDown size={16} />
      </button>

      {/* Mega Menu */}
      <div className="
        absolute
        right-0
        top-full
       
        w-[1280px]
        bg-[var(--color-neutral-100)]
        shadow-xl
       
        rounded
        opacity-0
        invisible
        group-hover:opacity-100
        group-hover:visible
        transition
        z-50
      ">

        <div className="flex">

          {/* ستون دسته‌ها */}
          <ul className="w-1/4 shadow bg-white">
            {categories.map((cat) => (
              <li
              
                key={cat.slug}
                onMouseEnter={() => setActiveCategory(cat)}
                className={`
                  px-4 py-3 cursor-pointer text-sm
                  ${activeCategory.slug === cat.slug
                    ? "bg-white text-[#CB2D58] font-bold hover:bg-[var(--color-neutral-100)]"
                    : "hover:bg-white"}
                `}
              >
                {cat.title}
              </li>
            ))}
          </ul>

          {/* ستون زیر‌دسته‌ها */}
          <div className="w-1/4 p-2">
            <h4 className="block px-1 py-1 rounded hover:bg-gray-100 text-xs">
              </h4>  
            <ul className="grid grid-cols-1 gap-1 pr-2 font-thin text-sm">
              {subCategories
                .filter(
                  (sub) => sub.categorySlug === activeCategory.slug
                )
                .map((sub) => (
                  
                 
                            
                  <li key={sub.slug}>
                    <Link
                      href={`/${sub.categorySlug}/${sub.slug}`}
                      className="font-bold text-sm mb-3 text-gray-700 border-r border-[#CB2D58] border-r-4 pr-2  "
                    >
                      {sub.title}
                    </Link>
                    <ul className="grid grid-cols-1 gap-1 pr-2 font-thin text-sm">
              {products
                .filter(
                  (product) => product.subCategorySlug === sub.slug
                )
                .map((product) => (
                  
                 
                            
                  <li key={product.slug}>
                    <Link
                       href={`/${product.categorySlug}/${product.subCategorySlug}/${product.slug}`}
                      className="block px-1 py-1 rounded hover:bg-gray-100 text-xs"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
                
            </ul>
                  </li>
                ))}
                
            </ul>
            
          </div>
           
        </div>
      </div>

    </div>
  );
}
