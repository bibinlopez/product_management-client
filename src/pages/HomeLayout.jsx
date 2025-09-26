import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"

const HomeLayout = () => {
  const [wishlist, setWishlist] = useState(null)

  const url = "http://localhost:4000/api/product/wishlist"

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
  }, [])

  return wishlist ? (
    <>
      <Navbar wishlist={wishlist} />
      {/* <div> Hoem layout</div>
      <ProductPage /> */}
    </>
  ) : (
    <h1>loading...</h1>
  )
}

export default HomeLayout
