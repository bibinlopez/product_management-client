import React, { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AddSubCategoryModal = ({
  isSubategoryModalOpen,
  setIsSubategoryModalOpen,
}) => {
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [subcategory, setSubcategory] = useState("")

  const token = localStorage.getItem("accessToken")

  const urlGet = `${import.meta.env.VITE_BASE_API_URL}/api/product/categories`
  const urlAdd = `${import.meta.env.VITE_BASE_API_URL}/api/product/subcategory`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGet, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const categories = response?.data?.categories

        setCategories(categories)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

  // Add Subcategory
  const handleSubmit = async () => {
    try {
      await axios.post(
        urlAdd,
        {
          name: subcategory,
          categoryId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success("Subcategory added successfully")
      setIsSubategoryModalOpen(false)
      setSubcategory("")
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong !!!")
      console.error("Error posting data:", err)
    }
  }

  if (!isSubategoryModalOpen) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
      <div className='bg-white p-8 rounded-xl border-2 border-blue-300 shadow-lg w-full max-w-md'>
        <h2 className='text-center text-lg font-medium mb-7'>
          Add Sub Category
        </h2>
        <div className='space-y-4'>
          <select
            className='w-full h-12 border border-gray-300 rounded px-3 text-gray-600 mb-2 focus:outline-none focus:border-blue-400'
            onChange={(e) => {
              setCategoryId(e.target.value)
            }}
          >
            <option>Select category </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type='text'
            className='w-full h-12 border border-gray-300 rounded px-3 text-gray-600 focus:outline-none focus:border-blue-400'
            placeholder='Enter sub category name'
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>
        <div className='flex justify-center gap-4 mt-8'>
          <button
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded font-medium cursor-pointer'
            onClick={() => {
              setIsSubategoryModalOpen(false)
            }}
          >
            DISCARD
          </button>
          <button
            className='bg-amber-400 hover:bg-amber-500 text-white px-8 py-2 rounded font-medium cursor-pointer'
            onClick={handleSubmit}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSubCategoryModal
