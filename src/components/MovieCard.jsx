import React, { useState, useEffect } from 'react';
import { Card, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Imbd from '../assets/imdblogo.png';
import Rotten from '../assets/rotten.png';
import { useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';

function MovieCard({ movie }) {
  const isSmallScreen = useMediaQuery('(max-width: 37.5rem)')
  // const isTabscreen = useMediaQuery('(max-width: 68.75rem)')
  // const isPcscreen = useMediaQuery('(min-width: 69.375rem)')
  const [isFavorite, setIsFavorite] = useState(false);
  const [genre, setGenre] = useState('');
  const [imdbPercentage, setImdbPercentage] = useState('');
  const [rottenPercentage, setRottenPercentage] = useState('');
  const [formattedReleaseYear, setFormattedReleaseYear] = useState('');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(movie.id));

    // Fetch genre data for the movie
    const apiKey = '523c8b46aafc35c66f9fd4323369516c'; // Replace with your API key
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
      .then((response) => {
        // Extract the genre names from the response and join them into a string
        const genreNames = response.data.genres.map((genre) => genre.name).join(', ');
        setGenre(genreNames);

        // Format the release year
        const formattedDate = formatToUTCDate(response.data.release_date);
        setFormattedReleaseYear(formattedDate);
      })
      .catch((error) => {
        console.error('Error fetching genre data:', error);
      });

    // Generate random percentages
    setImdbPercentage(getRandomPercentage());
    setRottenPercentage(getRandomPercentage());
  }, [movie.id]);

  function getRandomPercentage() {
    const randomPercentage = Math.floor(Math.random() * 51) + 50; // Generates a random number between 50 and 100
    return `${randomPercentage}%`;
  }

  const formatToUTCDate = (dateString) => {
    const localDate = new Date(dateString);
    const year = localDate.getUTCFullYear();
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
    const day = localDate.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((id) => id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  toast.error(`${movie.title} has been removed from favorites`);
    } else {
      favorites.push(movie.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      toast.success( `${movie.title} has been added to favorites`);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    
   <Card className="movie-card" data-testid="movie-card"  style={{ position: 'relative', width: isSmallScreen ? '21rem': '100%'  }}>
  
        <Link
   to={`/movies/${movie.id}`}
   style={{ textDecoration: 'none', color: 'inherit' }}
   
 >
  <div>
       <IconButton
       size='small'
       className="favorite-icon"
       style={{
         position: 'absolute',
         top: '.3125rem',
         right: '.3125rem',
         backgroundColor: 'white',
         cursor: 'pointer',
       }}
       onClick={toggleFavorite}
     >
       {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
     </IconButton>
     <img
       src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
       alt={movie.title}
       data-testid="movie-poster"
       style={{ height: '240px', width: '100%' }}
     />
     <p
     data-testid="movie-release-date"

style={{
 color: 'gray',
 fontSize: '9.6px',
 textAlign: 'left',
 marginLeft: '.3125rem',
 fontWeight: 'bold'
}}
>
{formatToUTCDate(formattedReleaseYear)}
</p>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:isSmallScreen? '30%' : '39%' }}>
         <img src={Imbd} alt="" style={{ height: '12.8px', width: '27.2px' }} />
         <span style={{ fontSize: '9.6px' }}>{imdbPercentage} / 100</span>
       </div>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width:isSmallScreen? '25%': '29%' }}>
         <img src={Rotten} alt="" style={{ height: '12.8px' }} />
         <span style={{ fontSize: '9.6px' }}>{rottenPercentage} / 100</span>
       </div>
     </div>
     <h2
       data-testid="movie-title"
       style={{ fontSize: '12.8px', textAlign: 'left', marginLeft: '.3125rem' }}
     >
       {movie.title}
     </h2>
     <p
       data-testid="movie-genre"
       style={{
         color: 'gray',
         fontSize: '9.6px',
         textAlign: 'left',
         marginLeft: '.3125rem',
       }}
     >
       <p style={{fontWeight: 'bold'}}>{genre}</p> 
     </p>
    </div>
        </Link>
  </Card>
  )
}

export default MovieCard;
