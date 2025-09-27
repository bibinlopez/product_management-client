import axios from "axios"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import ImageInput from "./ImageInput"

const AddProductModal = ({ isProductModalOpen, setIsProductModalOpen }) => {
  const [variants, setVariants] = useState([
    { ram: "", price: "", quantity: 1 },
  ])
  const [subcategories, setSubcategories] = useState([])
  const [subcategoryId, setSubategoryId] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageLoading, setImageLoading] = useState(false)
  const [images, setImages] = useState(["", "", ""])

  console.log(subcategoryId)

  const token = localStorage.getItem("accessToken")

  // Add a new empty variant
  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", quantity: 1 }])
  }

  const urlGet = "http://localhost:4000/api/product/subcategories"
  const urlAdd = "http://localhost:4000/api/product"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGet, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const subcategories = response?.data?.subcategories
        console.log(subcategories)

        setSubcategories(subcategories)
      } catch (error) {
        console.log(error.response)

        toast.error(
          error?.response?.data?.message || "Something went wrong !!!"
        )
        // console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  // Add Product
  const handleSubmit = async () => {
    const data = { title, description, subcategoryId, variants, images }
    console.log(data)

    // try {
    //   await axios.post(urlAdd, data, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   toast.success("Subcategory added successfully")
    //   setIsProductModalOpen(false)
    //   setSubategoryId("")
    //   setTitle("")
    //   setDescription("")
    //   setImageLoading(false)
    //   setVariants([{ ram: "", price: "", quantity: 1 }])
    // } catch (err) {
    //   toast.error(err?.response?.data?.message || "Something went wrong !!!")
    //   console.error("Error posting data:", err)
    // }
  }

  // Update a specific input in a specific row
  const handleInputChange = (variantIndex, inputName, value) => {
    const newVariants = [...variants]

    newVariants[variantIndex][inputName] = value
    setVariants(newVariants)
  }
  console.log(isProductModalOpen)

  if (!isProductModalOpen) return null
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </div>

          {/* Variants */}
          <div>
            <div className='grid items-center gap-3 mb-2'>
              <label className='text-gray-600 w-32'>Variants:</label>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    marginLeft: "10px",
                  }}
                  className='flex gap-2 items-center pl-34'
                >
                  {/* <input
                    type='text'
                    value={row.input1}
                    onChange={(e) => handleInputChange(index, "input1", e)}
                  />
                  <input
                    type='text'
                    value={row.input2}
                    onChange={(e) => handleInputChange(index, "input2", e)}
                  /> */}
                  <span className='text-gray-400'>RAM:</span>
                  <input
                    type='text'
                    className='w-16 border border-gray-300 rounded px-2 py-1'
                    value={variant.ram}
                    placeholder='4 GB'
                    onChange={(e) =>
                      handleInputChange(index, "ram", e.target.value)
                    }
                  />
                  <span className='text-gray-400 ml-2'>Price:</span>
                  <input
                    type='text'
                    className='w-24 border border-gray-300 rounded px-2 py-1'
                    placeholder='25000'
                    value={variant.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", Number(e.target.value))
                    }
                  />
                  <span className='text-gray-400 ml-2'>QTY:</span>
                  <input
                    type='number'
                    className='w-12 border border-gray-300 rounded px-2 py-1'
                    defaultValue={1}
                    value={variant.quantity}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            {/* Add Variant Button */}
            <div className='flex justify-end mt-2 ml-32'>
              <button
                className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm cursor-pointer'
                onClick={() => {
                  addVariant()
                }}
              >
                Add variants
              </button>
            </div>
          </div>

          {/* Sub Category */}
          <div className='flex items-center gap-3'>
            <label className='text-gray-600 w-32'>Sub category :</label>
            <select
              className='flex-1 border border-gray-300 rounded px-3 py-2 '
              onChange={(e) => {
                setSubategoryId(e.target.value)
              }}
            >
              <option>Select category </option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className='flex items-center gap-3 '>
            <label className='text-gray-600 w-32'>Description :</label>
            <input
              className='flex-1 border border-gray-300 rounded px-3 py-2'
              placeholder='Designed to be easily carried and used anywhere due to its compact, foldable design and integrated battery. '
              value={description}
              onChange={(e) => {
                console.log(description)

                setDescription(e.target.value)
              }}
            />
          </div>

          {/* Upload image */}
          <div className='flex items-center gap-8 mt-10'>
            <label className='text-gray-600 w-32'>Upload image:</label>
            {/* //image */}

            <ImageInput
              setImageLoading={setImageLoading}
              images={images}
              setImages={setImages}
              imageIndex={0}
            />
            <ImageInput
              setImageLoading={setImageLoading}
              images={images}
              setImages={setImages}
              imageIndex={1}
            />
            <ImageInput
              setImageLoading={setImageLoading}
              images={images}
              setImages={setImages}
              imageIndex={2}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className='flex justify-end gap-4 mt-8'>
          <h3>{imageLoading ? "uploading..." : null}</h3>
          <button
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-2 rounded font-medium cursor-pointer'
            onClick={() => {
              setImageLoading(false)
              setImages(["", "", ""])
              setIsProductModalOpen(false)
              setSubategoryId("")
              setTitle("")
              setDescription("")
            }}
          >
            DISCARD
          </button>
          <button
            className={`  text-white px-8 py-2 rounded font-medium  ${
              imageLoading
                ? "bg-amber-100"
                : "bg-amber-400 hover:bg-amber-500 cursor-pointer"
            }`}
            onClick={handleSubmit}
            disabled={imageLoading}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProductModal
