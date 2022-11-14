import React from 'react';
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from '../../api/requests';


export default function MainPage() {
  return (
    <div>
      <Banner />
      <Row 
      title="NETFLIX ORIGINALS" id="NO"
      fetchurl={requests.fetchNetflixOriginals}
      isLargeRow //맨위 row만 좀 크게해서 구별
      />

      <Row 
      title="Trending Now" id="TN"
      fetchurl={requests.fetchTrending}/>

      <Row 
      title="Top Rated" id="TR"
      fetchurl={requests.fetchTopRated}/>

      <Row 
      title="Action Movies" id="AM"
      fetchurl={requests.fetchActionMovies}/>

      <Row 
      title="Comedy Movies" id="CM"
      fetchurl={requests.fetchComdeyMovies}/>
      </div>
  );
}
