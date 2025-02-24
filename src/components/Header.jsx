import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USERICON } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  return (
    <div className='absolute w-screen px-8 py-2 z-10 flex flex-col md:flex-row justify-between'>
      <img
        className='w-44'
        src={LOGO}
        alt="logo"
      />
      {user && (  // Only show if user is logged in
        <div className='flex p-2'>
          <img className='w-12 h-12'
           src={USERICON} 
           alt="usericon" />
          <button onClick={handleSignOut} className="font-bold text-black cursor-pointer">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
