import axios from '../api/axios';
import React,{useEffect,useState} from 'react';
import './Row.css';
import MovieModal from "./MovieModal";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Row({isLargeRow,title,id,fetchurl}) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, );

    const fetchMovieData= async() =>{
        const request=await axios.get(fetchurl);
        setMovies(request.data.results);
    };

    const handleClick=(movie)=>{
      setModalOpen(true);
      setMovieSelected(movie);

    };
    
  return ( 
    <section className="row">
      <h2>{title}</h2>

      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // spaceBetween={50}
      //slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
      loop={true}
      breakpoints={{
        1378:{
          slidesPerview:6,
          slidesPerGroup:6,
        },
       
        998:{
          slidesPerview:5,
          slidesPerGroup:5,
        },
       
        625:{
          slidesPerview:4,
          slidesPerGroup:4,
        },
       
        0:{
          slidesPerview:3,
          slidesPerGroup:3,
        },
       
        
      }}
    
    >
     

        <div id={id} className="row__posters">
        {movies.map((movie)=>(
          <SwiperSlide>
          <img 
              key={movie.id}
              className={`row__poster ${isLargeRow && "rowS__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${
                isLargeRow? movie.poster_path:movie.backdrop_path}`}
              alt={movie.name}
              onClick={()=>handleClick(movie)}
              />
              </SwiperSlide>

          ))}
        </div>
       </Swiper>
  
      {
        modalOpen && (
          <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
        )
      }
      
     
    </section>

    );
}
