import React, { useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const ImageInput = ({ setImageLoading, setImages, images, imageIndex }) => {
  const [selectedImage, setSelectedImage] = useState(null) // image url for display
  const fileInputRef = useRef(null)

  const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "preset-name") // your preset name
    formData.append("api_key", "W5BDnQeQ5J1DJd1y-SHm07Qifwo") // your preset name

    try {
      console.log(import.meta.env.VITE_ANALYTICS_KEY)

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dzoy3xghm/image/upload",
        formData
      )

      // setImage(response.data.secure_url) // get uploaded image URL
      const newImages = [...images]
      console.log({ imageIndex })

      newImages[imageIndex] = response.data.secure_url
      setImages(newImages)
    } catch (err) {
      toast.error("upload failed")
      console.error("Upload failed:", err)
    } finally {
      setImageLoading(false)
    }
  }

  // Trigger click on hidden file input
  const handleImageBoxClick = () => {
    console.log("image box click")

    fileInputRef.current.click()
  }

  // Handle file selection
  const handleFileChange = (event) => {
    console.log("on change...")
    setImageLoading(true)

    const file = event.target.files[0]
    if (file.size > 1024 * 1024) {
      toast.error("Select image lesser than 1 MB")
      return
    }
    if (file) {
      uploadImage(file)
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  return (
    <div
      onClick={handleImageBoxClick}
      style={{
        width: 80,
        height: 80,
        border: "1px solid #aaa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {selectedImage ? (
        <img src={selectedImage} alt='Preview' width='80' height='80' />
      ) : (
        <span style={{ color: "#aaa" }}>+</span>
      )}
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: "none" }}
        accept='image/*'
        onChange={handleFileChange}
      />
    </div>
  )
}

export default ImageInput
