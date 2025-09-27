import axios from "axios"
import React, { useEffect, useState } from "react"
import { redirect, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ProductDetails = () => {
  const navigate = useNavigate()
  let [product, setProduct] = useState(null)
  let [variants, setVariants] = useState([])
  const { id } = useParams()

  console.log({ detailId: id })

  const url = `http://localhost:4000/api/product/${id}`

  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("api call....")

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const product = response?.data?.product
        const variants = response?.data?.variants
        console.log(product)

        setProduct(product)
        setVariants(variants)
      } catch (error) {
        navigate("/")
        toast.error(
          error?.response?.data?.message || "Something went wrong !!!"
        )
      }
    }

    fetchData()
  }, [])

  if (!product) return <h3>Loading</h3>

  return (
    <div className='min-h-screen bg-white px-50 py-30'>
      <nav className='mb-6 text-gray-600 text-sm'>
        <a href='/'>Home</a>

        <span className='mx-2'>&gt;</span>
        <span>Product details</span>
      </nav>
      <div className='flex flex-wrap gap-10'>
        {/* Images Section */}
        <div className='flex flex-col md:flex-col-2 gap-6 items-center flex-1 w-50'>
          <div className='border-2 border-blue-200 rounded-xl p-1 flex items-center justify-center w-100 h-[300px] bg-gray-50'>
            <img
              src={product.images[0]}
              alt='Laptop'
              className='object-contain h-100 w-70'
            />
          </div>
          <div className='flex gap-6'>
            <div
              key={1}
              className='border rounded-xl border-gray-400 cursor-pointer flex items-center justify-center w-47 h-30 overflow-hidden'
            >
              <img
                src={product.images[1]}
                alt={`IMG-2`}
                className='w-full h-full object-cover'
              />
            </div>
            <div
              key={1}
              className='border rounded-xl border-gray-400 cursor-pointer flex items-center justify-center w-47 h-30 overflow-hidden'
            >
              <img
                src={product.images[2]}
                alt={`IMG-3`}
                className='w-full h-full object-cover rounded-xl'
              />
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className='flex-1 pt-2'>
          <div className='mb-2'>
            <h1 className='text-xl font-semibold text-blue-800'>
              {product.title}
            </h1>
            <div className='text-gray-900 text-lg font-bold mt-2'>
              ₹ {product.tempPrice}.00
            </div>
          </div>
          <div className='mb-2 flex gap-5 items-center'>
            <span className='text-gray-500 text-sm'>Availability :</span>
            <span className='flex items-center gap-1 text-green-600 text-sm font-medium'>
              <span className='text-lg'>✔</span> In stock
            </span>
          </div>
          <div className='text-gray-500 text-sm mb-4'>
            Hurry up! only{" "}
            <span className='text-orange-500'>
              {variants.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity
              }, 0)}
            </span>{" "}
            product left in stock!
          </div>
          <hr className='mb-6' />
          {/* Ram Selection */}
          <div className='mb-4 flex items-center gap-4'>
            <span className='text-gray-500 text-base'>Ram:</span>
            <button className='bg-gray-200 w-14 py-1 rounded mb-1 text-gray-700 font-medium'>
              4 GB
            </button>
            <button className='bg-gray-200 w-14 py-1 rounded mb-1 text-gray-700 font-medium'>
              8 GB
            </button>
            <button className='bg-gray-200 w-14 py-1 rounded mb-1 text-gray-700 font-medium'>
              16 GB
            </button>
          </div>
          {/* Quantity Selector */}
          <div className='mb-7 flex items-center gap-4'>
            <span className='text-gray-500 text-base'>Quantity :</span>
            <div className='flex items-center gap-2'>
              <button className='w-7 h-7 bg-gray-200 rounded border font-bold text-lg flex justify-center items-center'>
                -
              </button>
              <span className='px-3 font-semibold text-gray-700'>1</span>
              <button className='w-7 h-7 bg-gray-200 rounded border font-bold text-lg flex justify-center items-center'>
                +
              </button>
            </div>
          </div>
          {/* Actions */}
          <div className='flex items-center gap-6'>
            <button className='bg-amber-400 hover:bg-amber-500 text-white px-7 py-3 rounded font-medium'>
              Edit product
            </button>
            <button className='bg-amber-400 hover:bg-amber-500 text-white px-7 py-3 rounded font-medium'>
              Buy it now
            </button>
            <button className='rounded-full border-2 border-gray-200 w-10 h-10 flex items-center justify-center hover:border-gray-400'>
              🤍{/* Add a heart icon for wishlist */}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
