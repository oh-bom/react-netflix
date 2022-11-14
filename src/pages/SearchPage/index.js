import {useLocation, useNavigate} from 'react-router-dom';
import React,{useEffect, useState} from 'react';
import axios from "../../api/axios";
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const navigate =useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const useQuery=()=>{
    return new URLSearchParams(useLocation().search);
  }

  let query=useQuery();       
  const searchTerm=query.get("q");
  const debouncedSearchTerm=useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  //searchTerm이 변할때 마다 이 함수를 call
  }, [debouncedSearchTerm]);

  const fetchSearchMovie=async(searchTerm)=>{
  
    try {
      const request= await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResults(request.data.results);
      
    } catch (error) {
      console.log("error...",error);
      
    }
  }

  const renderSearchResults=()=>{

    return searchResults.length>0?(
      <section className="search-container">
        {searchResults.map((movie)=>{
          if(movie.backdrop_path!==null && movie.media_type!=="person"){
            const movieImageUrl=
            "https://image.tmdb.org/t/p/w500"+movie.backdrop_path
            return(
              <div className="movie" key={movie.id}>
                <div onClick={()=>navigate(`/${movie.id}`)} 
                className="movie__column-poster">
                  <img
                  src={movieImageUrl} alt="movie"
                  className="movie__poster"
                  >
                  </img>

                </div>
                
              </div>
            )
          }

        })}

      </section>
    ):(//원하는 결과 없을때
    <section className="no-results">
      <div className="no-results__text">
        <p>
          찾고자 하는 검색어 "{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          응 황금쪾이 사라져
        </p>

      </div>

    </section>

    )
  };

  return renderSearchResults();
  
}
