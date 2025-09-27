import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { GoHeart } from "react-icons/go"
import { useState } from "react"

const Navbar = ({ wishlist, setIsWishlistModalOpen, setSearchText }) => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const user = localStorage.getItem("user")

  return (
    <nav className='w-full h-20 bg-[#003057] flex items-center justify-between px-8 py-3'>
      <div className='flex relative items-center flex-1 pl-40 justify-center'>
        <div className='absolute left-0 pl-8 hidden md:block sm:block'>
          <h2 className='text-white font-bold text-2xl'>
            {user ? `Hi, ${user}...` : "Hi, User..."}
          </h2>
        </div>
        <div className='mx-auto hidden md:block sm:block'>
          <input
            className='rounded-l-full bg-white px-4 py-2 w-96 outline-none'
            id='search'
            value={search}
            type='text'
            placeholder='search products...'
            onChange={(e) => {
              setSearch(e.target.value)
              e.target.value ? "" : setSearchText("")
            }}
          />
          <button
            className='bg-yellow-500 text-white px-6 py-2 rounded-r-full font-semibold cursor-pointer'
            onClick={() => {
              setSearchText(search)
            }}
          >
            Search
          </button>
        </div>
      </div>
      <div className='flex items-center space-x-8'>
        <div className='flex items-center space-x-1 cursor-pointer'>
          <span
            className='text-white border-r border-gray-400 pr-3'
            onClick={() => {
              localStorage.removeItem("accessToken")

              toast.success("User logout successfully")
              navigate("/login")
            }}
          >
            Sign Out
          </span>
        </div>
        <div
          className='flex items-center space-x-1 cursor-pointer'
          onClick={() => {
            setIsWishlistModalOpen(true)
          }}
        >
          <span>
            <GoHeart className='text-white' size='1.5rem' />
          </span>
          <span className='bg-yellow-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow'>
            {wishlist ? wishlist.count : 0}
          </span>
          <span className='text-white'>Wishlist</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
