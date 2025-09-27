import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ChevronRight, ChevronDown, Check } from "lucide-react"
import CategorySidebar from "./CategorySidebar"
import AddCategoryModal from "../components/AddCategory"
import AddSubCategoryModal from "../components/AddSubcategory"
import AddProductModal from "../components/AddProduct"

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div
      className='bg-white border border-gray-300 rounded-lg shadow p-4 flex flex-col items-center hover:shadow-md transition cursor-pointer'
      onClick={() => {
        console.log("navigate to product")
        console.log({ iddddddddddddd: product._id })

        navigate(`/product/${product._id}`)
      }}
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className='h-24 mb-2 w-40 h-40 object-fit rounded-sm'
      />
      <a className='text-[#1A73E8] font-medium text-sm cursor-pointer mt-4'>
        {product.title}
      </a>
      <div className='text-[#888] font-semibold text-base'>
        {product.tempPrice}
      </div>
      <div className='text-gray-300 flex space-x-1 text-xl'>
        {"★★★★★".split("").map((star, i) => (
          <span key={i} className='bg-grey-500 text-gray-300'>
            ★
          </span>
        ))}
      </div>
    </div>
  )
}

function ProductGrid({
  setIsCategoryModalOpen,
  setIsSubategoryModalOpen,
  setIsProductModalOpen,
  products,
  setPage,
  page,
}) {
  // products api

  return (
    <main className='grid w-full px-30 py-3 mt-5'>
      <div className=''>
        <ActionButtons
          setIsCategoryModalOpen={setIsCategoryModalOpen}
          setIsSubategoryModalOpen={setIsSubategoryModalOpen}
          setIsProductModalOpen={setIsProductModalOpen}
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  md:grid-cols-2 gap-15 p-4 pl-8 mt-5'>
          {products.map((product, idx) => (
            <div key={idx} style={{ width: "90%", height: "80%" }}>
              <ProductCard product={product} page={page} setPage={setPage} />
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center items-center space-x-4 my-6 mb-35 pr-5'>
        <button
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer border border-gray-400'
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <h3>{page}</h3>
        <button
          className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer border border-gray-400'
          onClick={() => setPage(page + 1)}
          disabled={products.length < 6}
        >
          Next
        </button>
      </div>
    </main>
  )
}

function ActionButtons({
  setIsCategoryModalOpen,
  setIsSubategoryModalOpen,
  setIsProductModalOpen,
}) {
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
      <button
        className='bg-[#FFA800] text-white font-semibold px-6 py-2 rounded-lg cursor-pointer'
        onClick={() => {
          setIsProductModalOpen(true)
        }}
      >
        Add product
      </button>
    </div>
  )
}

export default function MainPage({
  products,
  page,
  setPage,
  subcategories,
  setSubcategories,
}) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  return (
    <div className='flex h-screen'>
      <CategorySidebar
        subcategories={subcategories}
        setSubcategories={setSubcategories}
      />
      <ProductGrid
        setIsCategoryModalOpen={setIsCategoryModalOpen}
        setIsSubategoryModalOpen={setIsSubcategoryModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
        products={products}
        page={page}
        setPage={setPage}
      />
      <AddCategoryModal
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
      />
      <AddSubCategoryModal
        isSubategoryModalOpen={isSubcategoryModalOpen}
        setIsSubategoryModalOpen={setIsSubcategoryModalOpen}
      />
      <AddProductModal
        isProductModalOpen={isProductModalOpen}
        setIsProductModalOpen={setIsProductModalOpen}
      />
    </div>
  )
}
