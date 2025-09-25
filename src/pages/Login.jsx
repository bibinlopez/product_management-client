// SignUp.jsx
import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { RiLockPasswordLine } from "react-icons/ri"
import { MdOutlineEmail } from "react-icons/md"

const url = "http://localhost:4000/api/auth/login"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    setEmail("")
    setPassword("")
    try {
      const response = await axios.post(url, { email, password })
      const token = response?.data?.token
      console.log({ token })

      if (token) {
        localStorage.setItem("accessToken", token)

        console.log("token stored.")
      }
      toast.success(response?.data?.message || "success")
      navigate("/")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong !!!")
    }
  }

  return (
    <>
      <div className='w-auto h-screen lg:flex lg:flex-col-2 md:flex md:flex-col-2 bg-blue-100'>
        <div className='lg:w-5/8 md:w-5/8 bg-white p-20 md:p-30 lg:p-60 flex flex-col justify-center'>
          <h2 className='text-2xl font-bold mb-8 text-yellow-600'>
            Sign In into Your Account
          </h2>
          <form className='space-y-6'>
            <div className='flex items-center bg-gray-100 rounded px-3 py-2'>
              <span className='text-gray-400 mr-3'>
                <MdOutlineEmail />
              </span>
              <input
                type='email'
                id='email'
                value={email}
                placeholder='Email'
                className='bg-gray-100 outline-none flex-1 w-full'
                onChange={(e) => {
                  console.log("this email")

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
                placeholder='Password'
                value={password}
                className='bg-gray-100 outline-none flex-1 w-full'
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
        <div className='lg:w-3/8 md:w-3/8 bg-blue-900 p-12 lg:p-30 flex flex-col items-center justify-center text-white relative'>
          <h2 className='text-3xl font-bold mb-4'>Hello Friend!</h2>
          <p className='mb-8 text-center'>
            Enter your personal details and start your journey with us
          </p>
          <Link to='/sign-up'>
            <button className='px-8 md:px-14 lg:px-20 py-2 border-2 border-white rounded-full hover:bg-white hover:text-blue-900 transition mb-6'>
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login
