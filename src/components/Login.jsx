import React from 'react'
import Header from './Header'

const Login = () => {
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bgimg" />
      </div>
      <form className='w-full md:w-3/12 absolute p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-gradient-to-b from-black'>
      <h1 className='font-bold text-3xl py-4'>Sign In</h1>
        <input
        type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-black'/>
        <input 
        type="text" placeholder='Password' className='p-4 my-4 w-full bg-black'/>
        <button className='p-4 my-6 bg-red-600 w-full rounded-lg'>
          Sign In
        </button>
        <p className='py-4'>New to Netflix? Sign Up Now</p>
      </form>
    </div>
  )
}

export default Login
