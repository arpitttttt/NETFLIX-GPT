import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USERICON, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice'
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const showGptSearch= useSelector((store)=>store.gpt.showGptSearch)

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}))
          navigate("/browse")
        } else {
          dispatch(removeUser());
          navigate("/")
        }
      });
    },[]) 

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
    };

    const handleLanguageChange =(e)=>{
      dispatch(changeLanguage(e.target.value))
    }

  return (
    <div className='absolute w-screen px-8 py-2 z-10 flex flex-col md:flex-row justify-between'>
      <img
        className='w-44'
        src={LOGO}
        alt="logo"
      />
      {user && ( 
        <div className='flex p-2 justify-between'>
          
           {showGptSearch && <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>}
          
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer'
          onClick={handleGptSearchClick}>
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img className='w-12 h-12'
           src={USERICON} 
           alt="usericon" />
          <button onClick={handleSignOut} className="font-bold text-white cursor-pointer">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
