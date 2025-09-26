import React, { useState, useEffect } from "react"
import axios from "axios"

const products = Array.from({ length: 9 }, () => ({
  name: "HP AMD Ryzen 3",
  price: "$529.99",
  img: "https://via.placeholder.com/120x90.png?text=Laptop", // replace with actual img
}))

import { ChevronRight, ChevronDown, Check } from "lucide-react"
import CategorySidebar from "./CategorySidebar"
import AddCategoryModal from "../components/AddCategory"
import AddSubCategoryModal from "../components/AddSubcategory"
import AddProductModal from "../components/AddProduct"
// import AddCategoryModal from "../components/AddCategory"
// import AddProductModal from "../components/AddProduct"
// import AddSubCategoryModal from "../components/AddSubcategory"
// import SidebarModal from "../components/Wishlist"

function ProductCard({ product }) {
  return (
    <div className='border rounded-xl px-4 py-4 flex flex-col items-center  justify-between'>
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

function ProductGrid({ setIsCategoryModalOpen, setIsSubategoryModalOpen }) {
  return (
    <main className='grid w-full px-10 py-3 bg-green-600'>
      <div>
        <ActionButtons
          setIsCategoryModalOpen={setIsCategoryModalOpen}
          setIsSubategoryModalOpen={setIsSubategoryModalOpen}
        />
        <div className='mt-5 pl-30 flex flex-wrap gap-7 justify-start bg-red-500'>
          {products.map((product, idx) => (
            <div key={idx} style={{ width: "30%", height: "40%" }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between items-center mb-18'>
        <div className='flex-end items-center space-x-2'>hi</div>
      </div>
    </main>
  )
}

function ActionButtons({ setIsCategoryModalOpen, setIsSubategoryModalOpen }) {
  return (
    <div className='flex gap-4 justify-end '>
      <button
        className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg cursor-pointer'
        onClick={() => {
          setIsCategoryModalOpen(true)
        }}
      >
        Add category
      </button>
      <button
        className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg cursor-pointer'
        onClick={() => {
          setIsSubategoryModalOpen(true)
        }}
      >
        Add sub category
      </button>
      <button className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg cursor-pointer'>
        Add product
      </button>
    </div>
  )
}

export default function MainPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false)

  return (
    <div className='min-h-screen bg-red-600'>
      {/* Use your actual Navbar component here */}
      {/* <Navbar /> */}
      <div className='flex h-screen'>
        <CategorySidebar />
        <ProductGrid
          setIsCategoryModalOpen={setIsCategoryModalOpen}
          setIsSubategoryModalOpen={setIsSubcategoryModalOpen}
        />
        <AddCategoryModal
          isCategoryModalOpen={isCategoryModalOpen}
          setIsCategoryModalOpen={setIsCategoryModalOpen}
        />
        <AddSubCategoryModal
          isSubategoryModalOpen={isSubcategoryModalOpen}
          setIsSubategoryModalOpen={setIsSubcategoryModalOpen}
        />
        <AddProductModal />
      </div>
    </div>
  )
}
