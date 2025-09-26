import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import WishlistModal from "../components/Wishlist"

const HomeLayout = () => {
  const [wishlist, setWishlist] = useState(null)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(null)

  const url = "http://localhost:4000/api/wishlist"

  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const wishlist = response?.data?.wishlist
        setWishlist(wishlist)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [isWishlistModalOpen])

  return wishlist ? (
    <>
      <Navbar
        wishlist={wishlist}
        setIsWishlistModalOpen={setIsWishlistModalOpen}
      />
      {/* <div> Hoem layout</div>
      <ProductPage /> */}
      <WishlistModal
        wishlist={wishlist}
        isWishlistModalOpen={isWishlistModalOpen}
        setIsWishlistModalOpen={setIsWishlistModalOpen}
      />
    </>
  ) : (
    <h1>loading...</h1>
  )
}

export default HomeLayout
