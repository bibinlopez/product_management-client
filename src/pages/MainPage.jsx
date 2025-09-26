import React, { useState, useEffect } from "react"
import axios from "axios"

const products = Array.from({ length: 6 }, () => ({
  name: "HP AMD Ryzen 3",
  price: "$529.99",
  img: "https://via.placeholder.com/120x90.png?text=Laptop", // replace with actual img
}))

import { ChevronRight, ChevronDown, Check } from "lucide-react"
import CategorySidebar from "./CategorySidebar"
// import AddCategoryModal from "../components/AddCategory"
// import AddProductModal from "../components/AddProduct"
// import AddSubCategoryModal from "../components/AddSubcategory"
// import SidebarModal from "../components/Wishlist"

function ProductCard({ product }) {
  return (
    <div className='border rounded-xl px-4 py-4 flex flex-col items-center h-[220px] justify-between'>
      <img src={product.img} alt={product.name} className='h-24 mb-2' />
      <a className='text-[#1A73E8] font-medium text-sm cursor-pointer'>
        {product.name}
      </a>
      <div className='text-[#888] font-semibold text-base'>{product.price}</div>
      <div className='text-gray-300 flex space-x-1 text-xl'>
        {"★★★★★".split("").map((star, i) => (
          <span key={i}>☆</span>
        ))}
      </div>
    </div>
  )
}

function ProductGrid() {
  return (
    <main className='grid w-full px-10 py-5 bg-green-600'>
      <div>
        <ActionButtons />
        <div className='mt-5 pl-30 flex flex-wrap gap-7 justify-start bg-red-500'>
          {products.map((product, idx) => (
            <div key={idx} style={{ width: "30%" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center mt-8'>
        <div className='text-xs text-gray-400 ml-4'>10 of 456 items</div>
        <div className='flex items-center space-x-2'>
          <button className='rounded-full text-[#FFA800] bg-transparent px-2 py-1 font-semibold'>
            1
          </button>
          <button className='text-[#FFA800]'>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <span>...</span>
          <button>10</button>
        </div>
        <div className='text-xs text-gray-500 mr-4'>
          Show{" "}
          <span className='text-[#FFA800] font-semibold cursor-pointer'>
            10 rows
          </span>{" "}
          ▼
        </div>
      </div>
    </main>
  )
}

function ActionButtons() {
  return (
    <div className='flex gap-4 justify-end '>
      <button className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg'>
        Add category
      </button>
      <button className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg'>
        Add sub category
      </button>
      <button className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg'>
        Add product
      </button>
    </div>
  )
}

export default function MainPage() {
  return (
    <div className='min-h-screen bg-red-600'>
      {/* Use your actual Navbar component here */}
      {/* <Navbar /> */}
      <div className='flex h-screen'>
        <CategorySidebar />
        {/* <ProductGrid /> */}
        {/* <AddCategoryModal /> */}
        {/* <AddProductModal /> */}
        {/* <AddSubCategoryModal /> */}
        {/* <SidebarModal /> */}
      </div>
    </div>
  )
}
