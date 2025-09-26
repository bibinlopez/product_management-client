import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AddCategoryModal = ({ isCategoryModalOpen, setIsCategoryModalOpen }) => {
  const [category, setCategory] = useState("")

  const token = localStorage.getItem("accessToken")

  const url = "http://localhost:4000/api/product/category"

  const handleSubmit = async () => {
    try {
      await axios.post(
        url,
        {
          name: category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success("category added successfully")
      setIsCategoryModalOpen(false)
      setCategory("")
    } catch (err) {
      toast.error("something went wrong")
      console.error("Error posting data:", err)
    }
  }

  if (!isCategoryModalOpen) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
      <div className='bg-white p-8 rounded-lg shadow-lg min-w-[340px] flex flex-col'>
        <h2 className='text-lg font-semibold mb-6 text-center'>Add Category</h2>
        <input
          className='border border-gray-300 rounded px-3 py-2 mb-7 focus:outline-none focus:border-blue-400'
          type='text'
          placeholder='Enter category name'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className='flex justify-center gap-4'>
          <button
            className='bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-medium cursor-pointer'
            onClick={() => {
              setIsCategoryModalOpen(false)
            }}
          >
            DISCARD
          </button>
          <button
            className='bg-amber-400 text-white px-6 py-2 rounded hover:bg-amber-500 font-medium cursor-pointer'
            onClick={handleSubmit}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryModal
