import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true);
  const [errorMessage,setErrorMessage]= useState(null);
  const navigate= useNavigate()

  const email= useRef(null);
  const password= useRef(null);

  const handleButtonClick=()=>{
    const message= checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword
      (auth, 
      email.current.value, 
      password.current.value
      )
  .then((userCredential) => { 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });

    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // SignIn
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });
    }
}

  const toggleSignForm=()=>{
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bgimg" />
      </div>
      <form 
      onSubmit={(e) => e.preventDefault()}
      className='w-full md:w-3/12 absolute p-12 my-20 mx-auto right-0 left-0 text-white rounded-lg bg-gradient-to-b from-black'>
      <h1 className='font-bold text-3xl py-4'>
        {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm&&(
          <input type='text' placeholder='Full name' className='p-4 my-4 w-full bg-black' />
        )}
        <input
        ref={email}
        type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-black'/>
        <input
        ref={password} 
        type="text" placeholder='Password' className='p-4 my-4 w-full bg-black'/>
        <p className='text-red-500'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-600 w-full rounded-lg cursor-pointer' onClick={handleButtonClick}>
        {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In"}</p>
      </form>
    </div>
  )
}

export default Login