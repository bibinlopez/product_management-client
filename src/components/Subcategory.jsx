import React, { useState } from "react"

const Subcategories = ({ id, name, subcategories, setSubcategories }) => {
  const isTrue = subcategories.includes(id)
  const [isChecked, setIsChecked] = useState(isTrue)

  return (
    <button
      onClick={() => {
        if (isChecked) {
          setSubcategories(subcategories.filter((subc) => subc !== id))
          setIsChecked(false)
        } else {
          setSubcategories([...subcategories, id])
          setIsChecked(true)
        }
      }}
      className='flex items-center gap-2 text-gray-600 hover:text-blue-700'
    >
      <span
        className={`w-5 h-5 flex items-center justify-center rounded cursor-pointer ${
          isTrue ? "bg-blue-900 text-white" : "bg-blue-200"
        }`}
      ></span>
      {name}
    </button>
  )
}

export default Subcategories
