import React from 'react'
import {BG_URL} from '../utils/constants'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'

const GptSearch = () => {
  return (
    <div>
        <div className='fixed -z-10'>
            <img src={BG_URL} alt="" />
        </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch
