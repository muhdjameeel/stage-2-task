import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poster from '../assets/poster.svg';
import Logo from '../assets/logo.png';
import hamButton from '../assets/ellipse.png';
import imbdLogo from '../assets/imbd.png';
import rottenTomatoesLogo from '../assets/rotten-tomatoes.png';
import MovieCard from '../components/MovieCard';
import { Container, Link } from '@mui/material';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';

function HomePage() {
  const isSmallScreen = useMediaQuery('(max-width: 750px)')
  // const isTabscreen = useMediaQuery('(max-width: 1100px)')
  const isPcscreen = useMediaQuery('(min-width: 1110px)')

  const [posterMovieData, setPosterMovieData] = useState(null);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const apiKey = '523c8b46aafc35c66f9fd4323369516c';
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=John+Wick&api_key=${apiKey}`
        );
        console.log(response.data.results);
        setPosterMovieData(response.data.results[3]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching poster:', error);
        setLoading(false);
      }
    };
    fetchPoster();
  }, []);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const apiKey = '523c8b46aafc35c66f9fd4323369516c';
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=1`
        );
        console.log(response.data.results);
        const top10Movies = response.data.results.slice(0, 10);
        setTopMovies(top10Movies);
        
      } catch (error) {
        console.error('Error fetching top movies:', error);
        toast.error('An error occurred , try again later.');
      }
    };

    fetchTopMovies();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const apiKey = '523c8b46aafc35c66f9fd4323369516c';
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`
      );
      setSearchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error searching for movies:', error);
      toast.error('Oops! No Movies Found')
      
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex',  flexDirection: 'column'  }}>
   <div style={{border : '2px solid black', width: isSmallScreen ? '150%' : 'auto', padding : '0 0 1rem 0', backgroundImage: `url(${Poster})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <header style={{width: '100%'}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isSmallScreen ? '1rem  1.5rem' : '1rem 5rem 5rem 5rem' , marginLeft: isSmallScreen  ? '-5rem' : 'auto'}}>
            
            <Link to='/' >
            <img src={Logo} alt="" style={{ cursor: 'pointer', height: isSmallScreen ? '2rem' : 'auto', marginLeft: isSmallScreen ? '6rem' : '0', width: isSmallScreen ? '7rem' : 'auto' }}/>
            </Link>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    <input
      type="text"
      placeholder="What do you want to watch?"
      style={{
        border: '3px solid white',
        backgroundColor: 'transparent',
        width:  isPcscreen ? '45rem' : '100%',
        borderRadius: '1rem',
        height: '1.5rem',
        padding: '0.5rem 1rem 0.5rem 2rem', 
        color: 'white',
        textTransform: 'capitalize'
      }}
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
     
    />
    <div onClick={handleSearch}>
    <SearchIcon style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'white', cursor: 'pointer' }}   />
    </div>
   
  </div>
            <img src={hamButton} alt="" style={{ cursor: 'pointer', height: isSmallScreen ? '1.5rem' : 'auto' }} />
          </div>
          {posterMovieData ? (
            <Container style={{textAlign: 'left', marginTop: isSmallScreen ? '3rem' : '0'}}>
              <h2 style={{ color: 'white', textAlign: 'left', width: '20rem', paddingLeft: '5rem' }}>{posterMovieData.title}</h2>
              <div style={{ display: 'flex', width: '13rem', justifyContent: 'space-between', paddingLeft: '5rem' }}>
                <img src={imbdLogo} alt="" />
                <img src={rottenTomatoesLogo} alt="" />
              </div>
              <p style={{ color: 'white', textAlign: 'left', width: '20rem', fontSize: '.8rem', paddingLeft: '5rem' }}>{posterMovieData.overview}</p>
               <button style={{marginLeft: '5rem', height: '2.5rem', backgroundColor: '#BE123C', border: 'none', borderRadius: '.5rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '7rem', cursor: 'pointer' }}>
                <PlayCircleOutlineIcon sx={{color: 'white'}}/>
                Watch Later
                </button>
            </Container>
          ) : (
            <p style={{ color: 'white' }}>Loading....</p>
          )}
        </header>
        </div>
        <main style={{ marginTop: '5rem' }}>

  <Container>
    {loading ? (
      <div  style={{width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: isSmallScreen ? '25%' : '0'}}>
      <Spinner />
      </div>
      
    ) : (
     
      <>
        {Array.isArray(searchResults) &&searchQuery && searchResults.length > 0 && (
          <Container style={{marginBottom: '3rem', display: 'flex', flexDirection: 'column', marginLeft: isSmallScreen ? '20%' : '0', marginTop: '-2rem'}}>
            <h1 style={{ textAlign: 'left', fontSize: '1.2rem', marginBottom: '2rem',  marginTop: isSmallScreen ? '-2rem' : '0' }}>Search Results for <span style={{color: 'gray', textTransform: 'capitalize'}}>{searchQuery}</span></h1>
            <Container className="movie-grid" style={{ display: 'grid', gridTemplateColumns: isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(4, 1fr)', gap: '3rem' }}>
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Container>
          </Container>
        )}
        <Container style={{display: 'flex', flexDirection: 'column', marginLeft: isSmallScreen ? '20%' : '0', marginTop: '-2rem'}}>
        <h1 style={{ textAlign: 'left', fontSize: '1.2rem', marginBottom: '1rem'}}>Top 10 Movies</h1>
        {Array.isArray(topMovies) && topMovies.length > 0 && (
  <Container style={{ display: 'grid', gridTemplateColumns: isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(4, 1fr)', gap: '3rem' }}>
    {topMovies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </Container>
)}
        </Container>
        

      </>
    )}
  </Container>
</main>
<div style={{width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginLeft: isSmallScreen ? '25%' : '0'}}>
<Footer />
</div>
       
      </div>
  
  );
}

export default HomePage;
