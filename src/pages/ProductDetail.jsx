import { GoHeartFill, GoHeart } from "react-icons/go"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { redirect, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ProductDetails = () => {
  const navigate = useNavigate()
  let [product, setProduct] = useState(null)
  let [variants, setVariants] = useState([])
  let [variantSelect, setVariantSelect] = useState(null)
  let [quantity, setQuantity] = useState(1)
  const { id } = useParams()

  const url = `${import.meta.env.VITE_BASE_API_URL}/api/product/${id}`
  const urlAdd = `${import.meta.env.VITE_BASE_API_URL}/api/wishlist`
  const productBuyUrl = `${import.meta.env.VITE_BASE_API_URL}/api/product/buy`

  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const product = response?.data?.product
        const variants = response?.data?.variants

        setProduct(product)
        setVariants(variants)
        setVariantSelect(variants[0])
      } catch (error) {
        navigate("/")
        toast.error(
          error?.response?.data?.message || "Something went wrong !!!"
        )
      }
    }

    fetchData()
  }, [])

  // Add to Wishlist
  const handleWishlist = async () => {
    try {
      const response = await axios.post(
        urlAdd,
        { variantId: variantSelect._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      toast.success(response?.data?.message || "Success")
      navigate("/")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong !!!")
      console.error("Error posting data:", err)
    }
  }

  // Buy Product
  const handleBuy = async () => {
    try {
      const response = await axios.post(
        productBuyUrl,
        { variantId: variantSelect._id, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      toast.success(response?.data?.message || "Wishlist Updated")
      navigate("/")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong !!!")
      console.error("Error posting data:", err)
    }
  }

  const handleVariantSelect = (index) => {
    setVariantSelect(variants[index])
  }

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
            <div className='border rounded-xl border-gray-400 cursor-pointer flex items-center justify-center w-47 h-30 overflow-hidden'>
              <img
                src={product.images[1]}
                alt={`IMG-2`}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='border rounded-xl border-gray-400 cursor-pointer flex items-center justify-center w-47 h-30 overflow-hidden'>
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
              ₹ {variantSelect.price}.00
            </div>
          </div>
          <div className='mb-2 flex gap-5 items-center'>
            <span className='text-gray-500 text-sm'>Availability :</span>

            {variantSelect.quantity !== 0 ? (
              <span className='flex items-center gap-1 text-green-600 text-sm font-medium'>
                <span className='text-lg'>✔</span> In stock
              </span>
            ) : (
              <span className='flex items-center gap-1 text-red-600 text-sm font-medium'>
                <span className='text-lg'>✖</span> Out of Stock
              </span>
            )}
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

          <div className='mb-4 flex items-center gap-4'>
            <span className='text-gray-500 text-base'>Ram:</span>

            {variants.map((variant, index) => {
              return (
                <button
                  key={index}
                  className={`w-14 py-1 rounded mb-1 text-gray-700 font-medium cursor-pointer ${
                    variant._id === variantSelect._id
                      ? "bg-gray-500"
                      : "bg-gray-100"
                  }`}
                  onClick={() => {
                    handleVariantSelect(index)
                  }}
                >
                  {variant.ram}
                </button>
              )
            })}
          </div>
          {/* Quantity Selector */}
          <div className='mb-7 flex items-center gap-4'>
            <span className='text-gray-500 text-base'>Quantity :</span>
            <div className='flex items-center gap-2'>
              <button
                className='w-7 h-7 bg-gray-200 rounded border font-bold text-lg flex justify-center items-center'
                onClick={() => {
                  if (quantity === 1) return
                  setQuantity(quantity - 1)
                }}
              >
                -
              </button>
              <span className='px-3 font-semibold text-gray-700'>
                {quantity}
              </span>
              <button
                className='w-7 h-7 bg-gray-200 rounded border font-bold text-lg flex justify-center items-center'
                onClick={() => {
                  setQuantity(quantity + 1)
                }}
              >
                +
              </button>
            </div>
          </div>
          {/* Actions */}
          <div className='flex items-center gap-6'>
            <button className='bg-yellow-500 hover:bg-amber-500 text-white px-7 py-3 rounded font-medium'>
              Edit product
            </button>
            <button
              className='bg-yellow-500 hover:bg-amber-500 text-white px-7 py-3 rounded font-medium cursor-pointer'
              onClick={handleBuy}
            >
              Buy it now
            </button>

            <span
              className='cursor-pointer'
              onClick={() => {
                handleWishlist()
              }}
            >
              {" "}
              {!variantSelect.wishlist ? (
                <GoHeart className=' w-8 h-8  flex items-center justify-center hover:border-gray-400' />
              ) : (
                <GoHeartFill className=' w-8 h-8  flex items-center justify-center hover:border-gray-400' />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
