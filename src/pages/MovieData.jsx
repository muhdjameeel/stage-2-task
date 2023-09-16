import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Container } from '@mui/material';
import NavBar from '../components/NavBar';
import Staricon from '../assets/Star.png'
import Listicon from '../assets/list.png'
import Ticketicon from '../assets/ticket.png'
import { useMediaQuery } from '@mui/material';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import PhoneHeader from '../components/PhoneHeader';
import '../index.css'

function MovieData() {
  const isSmallScreen = useMediaQuery('(max-width: 600px)')
  const isTabScreen = useMediaQuery('(max-width: 1100px)')
  const isPCScreen = useMediaQuery('(min-width: 1110px)')
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genreNames, setGenreNames] = useState([]);

  const formatToUTCDate = (dateString) => {
    const localDate = new Date(dateString);
    const year = localDate.getUTCFullYear();
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    return `${year}`;
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const apiKey = '523c8b46aafc35c66f9fd4323369516c';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        );
        const formattedDate = formatToUTCDate(response.data.release_date);

        // Fetch genre data
        const genreResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );

        // Map genre IDs to genre names
        const genreNames = response.data.genres.map((genre) =>
          genreResponse.data.genres.find((g) => g.id === genre.id).name
        );

        setGenreNames(genreNames); // Store genre names in state
        const updatedMovieData = {
          ...response.data,
          release_date: formattedDate,
        };
        setMovieData(updatedMovieData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
        
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <div>

   
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: isSmallScreen ? 'column' : 'row' , justifyContent: 'space-between'}}>
      {!isSmallScreen && <NavBar /> }
      {isSmallScreen && <PhoneHeader/>}
      
      <>
        {loading ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner />
          </div>
        ) : movieData ? (
          <Container className='details' style={{padding: '1rem 0 0 0', marginTop: '3.2rem'}}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}
              alt={movieData.title}
              style={{
                height: isSmallScreen ? '15rem' : '25rem',
                width: isSmallScreen ? '100%' : '85%',
                borderRadius: '1rem',
                marginTop: !isSmallScreen? '-16rem' : '0',
              }}
              data-testid="movie-poster"
            />
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontWeight: 'bold',
                color: 'gray',
                fontSize: isSmallScreen? '.5rem' : '.8rem',
                width: isSmallScreen ? '100%' : '70%',
                margin: 'auto',
                border: '1px solid',
              }}
            >
              <p data-testid="movie-title" style={{width: isSmallScreen ? '50%' : '20%', }}>
                {movieData.title} 
              </p>
                    <p data-testid="movie-release-date" style={{ width: isSmallScreen ? '40%' : '20%' }}>
        {formatToUTCDate(movieData.release_date)}
      </p>
                    <p data-testid="movie-runtime" style={{width: isSmallScreen ? '40%' : '10%'}} >
                {movieData.runtime}  minutes
              </p>
              <div style={{ display: 'flex' }}>

              {/* Display genre names in separate divs */}
              {genreNames.map((genreName, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #dcbfc7',
                    fontSize: isSmallScreen ? '.4rem' : '.6rem',
                    borderRadius: '.6rem',
                    padding: '.3rem',
                    margin: '0 .5rem',
                  }}
                >
                  {genreName}
                </div>
              ))}
            </div>
            <div  style={{marginLeft: isSmallScreen ? '0' : '6rem', display: 'flex', alignItems: 'center'}}>
              <img src={Staricon} alt=""  style={{height: '1rem' , width: '1rem', marginRight: '3px'}}/>
            <p>8.3</p>
            </div>
           
            </div>
           
            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
            <p
              data-testid="movie-overview"
              style={{
                textAlign: 'left',
                width: '63%',
                marginLeft: isPCScreen && isTabScreen ?  '18rem' : '7rem',
                color: 'gray',
                fontSize: '.8rem',
              }}
            >
              {movieData.overview}
            </p>

            <div  style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between', height: '5rem', width: '180px', marginRight: '95px'}}>

              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , fontSize: '.6rem', backgroundColor: '#BE122C', color: 'white', width: '160px', borderRadius: '.3rem', marginBottom: '1rem',  border: '1px solid #BE122C'}}>
               <img src={Ticketicon} alt=""  style={{height: '10px' , width: '13px'}} />
                <p style={{marginLeft: '2px'}}>See show times</p>
              </div>

              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , fontSize: '.6rem', backgroundColor: '#dcbfc7', color: 'white', width: '160px', borderRadius: '.3rem', border: '1px solid #BE122C'}}>
               <img src={Listicon} alt=""  style={{height: '10px' , width: '13px'}} />
                <p style={{marginLeft: '2px'}}>More watch movies</p>
              </div>

              <Link to='/' style={{color: '#BE123C'}}>
            <p style={{textAlign: 'right', marginTop: '4rem'}}>
              Back To Home
            </p>
            </Link>

            </div>
            </div>
            
          </Container>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ color: 'red' }}>Can't load movie data...</p>
          </div>
        )}
      </>
       
    </div>
    <div style={{width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '3rem'}}>
<Footer/>
</div>
    </div>
  );
}

export default MovieData;
