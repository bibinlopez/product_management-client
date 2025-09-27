import React from "react"
import { useState } from "react"
import { MdClose } from "react-icons/md"
import { IoTrashBin } from "react-icons/io5"
import { data } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

const WishlistModal = ({
  wishlist,
  isWishlistModalOpen,
  setIsWishlistModalOpen,
}) => {
  const url = `${import.meta.env.VITE_BASE_API_URL}/api/wishlist`

  const token = localStorage.getItem("accessToken")

  const handleDelete = async (id) => {
    try {
      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
        data: { variantId: id },
      })
      toast.success("Item removed successfully")
      setIsWishlistModalOpen(false)
    } catch (err) {
      toast.error("something went wrong")
      console.error("Error fetching data:", err)
    }
  }

  const _wishlist = wishlist?.data

  if (!isWishlistModalOpen) return null
  return (
    <div className='fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm'>
      <div className='relative w-[20rem] max-w-md bg-white h-full shadow-2xl border-l border-gray-100 flex flex-col'>
        <div className='flex items-center gap-2 px-6 py-6 bg-[#003057] text-white rounded-tr-xl'>
          <span className='text-2xl'>🤍</span>
          <span className='text-lg font-medium pl-2'>Items</span>
          <div className='flex-end px-35'>
            <MdClose
              className='text-red-500 w-8 h-8 cursor-pointer'
              onClick={() => {
                setIsWishlistModalOpen(false)
              }}
            />
          </div>
        </div>
        <div className='px-6 pt-4 pb-2'>
          {_wishlist.map((item) => (
            <div
              key={item._id}
              className='flex items-center justify-between gap-2 py-4 border-b border-gray-200 last:border-b-0'
            >
              <img
                src={item?.variant?.product?.images[0]}
                alt={item.title}
                className='h-16 w-20 rounded object-cover border bg-gray-50'
              />
              <div className='flex-1 mx-2'>
                <div className='font-medium text-sm'>
                  {item?.variant?.product?.title}
                </div>

                <div className='text-gray-600 text-xs'>
                  {"Price: "}
                  {"₹"}
                  {item?.variant?.price}
                </div>
                <div className='text-gray-600 text-xs'>
                  {"RAM: "}
                  {item?.variant?.ram}
                </div>
                <div className='flex gap-1 mt-1'>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < item.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                </div>
              </div>
              <button className='p-1 text-gray-400 hover:text-red-400 text-xl transition-colors cursor-pointer'>
                <IoTrashBin onClick={() => handleDelete(item?.variant?._id)} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistModal
