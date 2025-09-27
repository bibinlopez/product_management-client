import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import WishlistModal from "../components/Wishlist"
import MainPage from "./MainPage"

const HomeLayout = () => {
  const [wishlist, setWishlist] = useState(null)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [subcategories, setSubcategories] = useState([])
  const strSubcategories = JSON.stringify(subcategories)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [addProduct, setAddProduct] = useState(0)

  const url = `${import.meta.env.VITE_BASE_API_URL}/api/wishlist`
  const urlProducts = `${
    import.meta.env.VITE_BASE_API_URL
  }/api/product/?limit=6&page=${page}&search=${searchText}&subcategoryIds=${strSubcategories}`

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
  }, [isWishlistModalOpen, addProduct])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlProducts, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const products = response?.data?.products

        setProducts(products)
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }

    fetchData()
  }, [page, subcategories, searchText])

  return wishlist ? (
    <>
      <Navbar
        wishlist={wishlist}
        setIsWishlistModalOpen={setIsWishlistModalOpen}
        setSearchText={setSearchText}
      />
      <MainPage
        products={products}
        page={page}
        setPage={setPage}
        subcategories={subcategories}
        setSubcategories={setSubcategories}
        addProduct={addProduct}
        setAddProduct={setAddProduct}
      />
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
