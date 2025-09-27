import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineEmail } from "react-icons/md"
// SignUp.jsx
import { CiUser } from "react-icons/ci"
import { Link, redirect } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const url = `${import.meta.env.VITE_BASE_API_URL}/api/auth/signup`

function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setName("")
    setEmail("")
    setPassword("")
    try {
      const response = await axios.post(url, { name, email, password })
      const token = response?.data?.token
      const user = response?.data?.user

      if (token) {
        localStorage.setItem("accessToken", token)
      }
      if (user) {
        localStorage.setItem("name", user)
        localStorage.setItem("userId", user.id)
      }
      toast.success("User Created Successfully")
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !!!")
    }
  }

  return (
    <>
      <div className='w-auto h-screen lg:flex lg:flex-col-2 md:flex md:flex-col-2 bg-blue-100'>
        {/* Left Side */}
        <div className='lg:w-3/8 md:w-3/8 bg-blue-900 p-12 flex flex-col items-center justify-center text-white relative'>
          <h2 className='text-3xl font-bold mb-4'>Welcome Back!</h2>
          <p className='mb-8 text-center'>
            To keep connected with us please login with your personal info
          </p>

          <Link to='/login'>
            <button className='px-8 md:px-14 lg:px-20 py-2 border-2 border-white rounded-full hover:bg-white hover:text-blue-900 transition mb-6'>
              SIGN IN
            </button>
          </Link>
        </div>
        {/* Right Side */}
        <div className='lg:w-5/8 md:w-5/8 bg-white p-20 md:p-30 lg:p-55 flex flex-col justify-center'>
          <h2 className='text-2xl font-bold mb-8 text-yellow-600'>
            Create Account
          </h2>
          <form className='space-y-6'>
            <div className='flex items-center bg-gray-100 rounded px-3 py-2'>
              <span className='text-gray-800 mr-3'>
                <CiUser />
              </span>
              <input
                type='text'
                id='name'
                placeholder='Name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                className='bg-gray-100 outline-none flex-1'
              />
            </div>
            <div className='flex items-center bg-gray-100 rounded px-3 py-2'>
              <span className='text-gray-400 mr-3'>
                <MdOutlineEmail />
              </span>
              <input
                type='email'
                id='email'
                value={email}
                placeholder='Email'
                className='bg-gray-100 outline-none flex-1'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='flex items-center bg-gray-100 rounded px-3 py-2'>
              <span className='text-gray-400 mr-3'>
                <RiLockPasswordLine />
              </span>
              <input
                type='password'
                id='password'
                value={password}
                placeholder='Password'
                className='bg-gray-100 outline-none flex-1'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              type='button'
              onClick={handleSubmit}
              className='w-full py-3 px-6 rounded-full bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition'
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
