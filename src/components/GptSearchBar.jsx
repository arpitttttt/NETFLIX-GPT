import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_KEY } from "../utils/constants"
import { API_OPTIONS } from "../utils/constants"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptMovieResult } from "../utils/gptSlice";



const GptSearchBar = () => {
    const dispatch= useDispatch()
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  
  // Initialize Google AI Model
  const genAI = new GoogleGenerativeAI(API_KEY);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya.";

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(gptQuery);
      const response = result.response;
      const text = response.text(); 

      console.log("Movie Recommendations:", text);
      const gotMovies=text.split(",")
      

     const promiseArray= gotMovies.map((movie)=>searchMovieTMDB(movie))
     const tmdbResults= await Promise.all(promiseArray)
     console.log(tmdbResults)

     dispatch(addGptMovieResult({movieNames:gotMovies, movieResults:tmdbResults}))
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 text-white"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
