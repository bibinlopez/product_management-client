import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { GoHeart } from "react-icons/go"

const Navbar = ({ wishlist, setIsWishlistModalOpen }) => {
  const navigate = useNavigate()

  console.log({ wishlist })

  const user = localStorage.getItem("user")

  return (
    <nav className='w-full h-20 bg-[#003057] flex items-center justify-between px-8 py-3'>
      <div className='flex relative items-center flex-1 pl-40 justify-center'>
        <div className='absolute left-0 pl-8 hidden md:block sm:block'>
          <h2 className='text-white font-bold text-2xl'>
            {user ? `Hey, ${user}...` : "Hey, User..."}
          </h2>
        </div>
        <div className='mx-auto hidden md:block sm:block'>
          <input
            className='rounded-l-full bg-white px-4 py-2 w-96 outline-none'
            id='search'
            type='text'
            placeholder='search products...'
          />
          <button className='bg-yellow-600 text-white px-6 py-2 rounded-r-full font-semibold'>
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
              console.log("clicked hey...")
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
            console.log("wishlist click")

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
