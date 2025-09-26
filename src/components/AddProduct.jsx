import React from "react"

const AddProductModal = ({}) => {
  // if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
      <div className='w-full max-w-2xl rounded-xl bg-white border-2 border-blue-200 p-8 shadow-lg'>
        <h2 className='text-center text-lg font-medium mb-8'>Add Product</h2>

        <div className='space-y-5'>
          {/* Title */}
          <div className='flex items-center gap-3'>
            <label className='text-gray-600 w-32'>Title :</label>
            <input
              type='text'
              className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400'
              placeholder='HP AMD Ryzen 3'
            />
          </div>

          {/* Variants */}
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <label className='text-gray-600 w-32'>Variants :</label>
              {/* First Variant */}
              <div className='flex gap-2 items-center'>
                <span className='text-gray-400'>Ram:</span>
                <input
                  type='text'
                  className='w-16 border border-gray-300 rounded px-2 py-1'
                  value='4 GB'
                  readOnly
                />
                <span className='text-gray-400 ml-2'>Price:</span>
                <input
                  type='text'
                  className='w-24 border border-gray-300 rounded px-2 py-1'
                  defaultValue='$529.99'
                />
                <span className='text-gray-400 ml-2'>QTY:</span>
                <input
                  type='number'
                  className='w-12 border border-gray-300 rounded px-2 py-1'
                  defaultValue={1}
                />
              </div>
            </div>
            {/* Second Variant */}
            <div className='flex items-center gap-2 mt-2 ml-35'>
              <div className='flex gap-2 items-center'>
                <span className='text-gray-400'>Ram:</span>
                <input
                  type='text'
                  className='w-16 border border-gray-300 rounded px-2 py-1'
                  value='8 GB'
                  readOnly
                />
                <span className='text-gray-400 ml-2'>Price:</span>
                <input
                  type='text'
                  className='w-24 border border-gray-300 rounded px-2 py-1'
                  defaultValue='$929.99'
                />
                <span className='text-gray-400 ml-2'>QTY:</span>
                <input
                  type='number'
                  className='w-12 border border-gray-300 rounded px-2 py-1'
                  defaultValue={3}
                />
              </div>
            </div>
            {/* Add Variant Button */}
            <div className='flex justify-end mt-2 ml-32'>
              <button className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm'>
                Add variants
              </button>
            </div>
          </div>

          {/* Sub Category */}
          <div className='flex items-center gap-3'>
            <label className='text-gray-600 w-32'>Sub category :</label>
            <select className='flex-1 border border-gray-300 rounded px-3 py-2'>
              <option>HP</option>
              {/* more options */}
            </select>
          </div>

          {/* Description */}
          <div className='flex items-center gap-3'>
            <label className='text-gray-600 w-32'>Description :</label>
            <input
              className='flex-1 border border-gray-300 rounded px-3 py-2'
              defaultValue='The Ryzen 7 is a more high-end processor that compares to the Int...'
            />
          </div>

          {/* Upload image */}
          <div className='flex items-center gap-3'>
            <label className='text-gray-600 w-32'>Upload image:</label>
            <div className='flex gap-2'>
              <img
                src='https://source.unsplash.com/50x40/?laptop'
                alt='product'
                className='h-12 w-16 object-contain rounded border'
              />
              <img
                src='https://source.unsplash.com/50x40/?notebook'
                alt='product'
                className='h-12 w-16 object-contain rounded border'
              />
              <div className='flex items-center justify-center h-12 w-16 border border-dashed border-gray-300 rounded cursor-pointer bg-gray-100'>
                <span className='text-gray-400 text-lg'>+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex justify-end gap-4 mt-8'>
          <button
            className='bg-amber-400 hover:bg-amber-500 text-white px-8 py-2 rounded font-medium'
            // onClick={onAdd}
          >
            ADD
          </button>
          <button
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded font-medium'
            // onClick={onClose}
          >
            DISCARD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProductModal
