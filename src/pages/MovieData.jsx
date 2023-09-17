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

function MovieData() {
  const isSmallScreen = useMediaQuery('(max-width: 750px)')
  const isTabscreen = useMediaQuery('(max-width: 1100px)')
  const isPcscreen = useMediaQuery('(min-width: 1110px)')
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const [genreNames, setGenreNames] = useState([]);
  const [videoKey, setVideoKey] = useState(null);



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
        setIsLoading(false);

        
        // Fetch movie videos
        const videoResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
        );

        // Find the first trailer video (you can customize this logic)
        const trailerVideo = videoResponse.data.results.find(
          (video) => video.type === 'Trailer'
        );

        if (trailerVideo) {
          setVideoKey(trailerVideo.key);
        }

      } catch (error) {
        console.error('Error fetching movie data:', error);
        setIsLoading(false);
        
      }
    };

    fetchMovieData();
  }, [id]);

  return (
    <div style={{ display: 'flex', alignItems: 'center',}} >

{!isSmallScreen && <NavBar /> }
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: isSmallScreen ? 'column' : 'column' , justifyContent: 'space-between'}}>
      
{isSmallScreen && <PhoneHeader/>}
      
      <>
        {isloading ? (
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
          <Container style={{padding: '1rem 0 0 0'}}>
            <Container>
            <iframe
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="Movie Trailer"
                style={{
                  height: '22rem',
                  width: '100%',
                  borderRadius: '1rem',
                  marginTop: isSmallScreen ? '1rem' : '4rem',
                }}
                allowFullScreen
              />
            </Container>
            
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'gray',
                fontSize: isSmallScreen? '.5rem' : '.8rem',
                width: '98%',
              }}
            >
              <p data-testid="movie-title" style={{width: isSmallScreen ? '50%' : '20%'}}>
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
            <p>8.5</p>
            </div>
           
            </div>
           
            <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: isSmallScreen ? 'column' : 'row'}}>
            <p
              data-testid="movie-overview"
              style={{
                textAlign: 'left',
                width: isSmallScreen ? '80%' : '50%',
                marginLeft: isPcscreen && isTabscreen ?  '18rem' : '2rem',
                color: 'gray',
                fontSize: '.8rem',
              }}
            >
              {movieData.overview}
            </p>
            <div  style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', height: '5rem'}}>
              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , fontSize: '.6rem', backgroundColor: '#BE123C', color: 'white', width: isSmallScreen? '15rem' : '8rem', borderRadius: '.3rem', marginBottom: '1rem',  border: '1px solid #BE123C'}}>
               <img src={Ticketicon} alt=""  style={{height: '1rem' , width: '1rem'}} />
                <p style={{marginLeft: '4px', textTransform: 'capitalize'}}>see show time</p>
              </div>
              <div  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , fontSize: '.6rem', backgroundColor: '#dcbfc7', color: 'white', width: isSmallScreen? '15rem' : '8rem', borderRadius: '.3rem', border: '1px solid #BE123C'}}>
               <img src={Listicon} alt=""  style={{height: '1rem' , width: '1rem'}} />
                <p style={{marginLeft: '4px', textTransform: 'capitalize'}}>more watch options</p>
              </div>
              <Link to='/' style={{color: '#BE123C'}}>
            
              Back To Home
            
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
            <p style={{ color: 'red' }}>Error fetching data, try again</p>
          </div>
        )}
      </>
      <div style={{width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '3rem'}}>
<Footer/>
</div>
    </div>
   
    </div>
  );
}

export default MovieData;
