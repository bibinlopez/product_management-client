import axios from "axios"
import { useEffect, useState } from "react"
import Subcategories from "../components/Subcategory"

const CategorySidebar = () => {
  const [categoriesData, setCategoriesData] = useState([])
  const [subcategories, setSubcategories] = useState([])

  const url = "http://localhost:4000/api/product/categories-subcategories"

  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const categories = response?.data?.categories
        setCategoriesData(categories)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [])

  return (
    <aside className='lg:w-[18rem] hidden lg:block lg:col-span-1 bg-blue-300 p-4 h-auto p-4 border-r bg-white flex-col'>
      <h2 className='text-blue-900 font-semibold mb-2'>All Categories</h2>
      <button
        onClick={() => {
          setSubcategories([])
        }}
        className='text-sm text-blue-700 mb-4 hover:underline pl-50 cursor-pointer'
      >
        {" "}
        Clear All
      </button>
      {/* Category List */}
      <ul className='space-y-3 pl-4'>
        {categoriesData.map((item) => (
          <li key={item.name}>
            <button className='flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-blue-800'>
              {item.name}
            </button>

            <ul className='ml-4 mt-4 space-y-2 pl-5'>
              {item.subcategories.map((sub) => (
                <li key={sub._id}>
                  <Subcategories
                    id={sub._id}
                    name={sub.name}
                    setSubcategories={setSubcategories}
                    subcategories={subcategories}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CategorySidebar
