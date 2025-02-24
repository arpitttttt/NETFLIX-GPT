import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import {API_OPTIONS} from '../utils/constants'

const useNowPlayingMovies=()=>{
    const dispact= useDispatch();

    const getNowPlayingmovies= async ()=>{
        const data= await fetch(
            "https://api.themoviedb.org/3/movie/now_playing?page=1",
            API_OPTIONS
        )
        const json= await data.json();
        console.log(json.results);
        dispact(addNowPlayingMovies(json.results));
    };
    useEffect(()=>{
        getNowPlayingmovies();
    },[])
};

export default useNowPlayingMovies;