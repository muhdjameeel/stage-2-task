import React from 'react'
import Logo from '../assets/tv.png';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import OndemandVideo from '@mui/icons-material/OndemandVideo';
import LogoutIcon from '@mui/icons-material/Logout';
import '../index.css'
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

function NavBar() {
  const isTabScreen = useMediaQuery('(max-width: 1000px)')
  return (
    <div style={{width: '12rem', border: '4px solid gray', height: !isTabScreen ? '90vh' : 'auto'  , borderRadius: '0 1rem 1rem 0', padding: '3rem 0'}}>
<nav style={{display: 'flex', flexDirection:'column', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
  <Link to='/' style={{ textDecoration: 'none', color: 'inherit' , width: '100%', padding: '0 2rem'}}>
  <header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
  <img style={{height: '3rem', width: '3rem', marginLeft: '1rem'}} src={Logo} alt="" />
<h4 style={{color: 'black', width: '100%'}}>Movie Box</h4>
  </header>
  </Link>
  
<ul style={{display: 'flex', flexDirection:'column', height: '100%', justifyContent:'space-between', marginTop: '1rem', fontSize: '.9rem', listStyleType: 'none'}}>
  
  <Link to='/' style={{width: 100%}}> 
  <li style={{marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '12.5rem', marginLeft: '-2.7rem'}} className='homeIcon'>
    <HomeIcon/>
    <p>Home</p>
  </li>
  </Link>
  
  <li style={{marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '12.5rem', marginLeft: '-2.7rem'}} className='ondemandVideo'>
<OndemandVideo/>
    <p>Movies</p>
  </li>
  <li style={{marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '12.5rem', marginLeft: '-2.7rem'}} className='videocamIcon'>
<VideocamIcon/>
    <p>TV Series</p>
  </li>
  <li style={{marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '12.5rem', marginLeft: '-2.7rem'}} className='upcomingIcon'>
<UpcomingIcon/>
    <p>Upcoming</p>
  </li>
</ul>
<div style={{width: '70%', border: '1px solid black', borderRadius: '.5rem', padding: '10px', display:'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
  <p style={{fontSize: '.7rem', width: '90%'}}>play more movies to earn free tickets</p>
  <p style={{fontSize: '.7rem', width: '90%'}}>50k people are playing now</p>
  <button style={{border: 'none', borderRadius: '.6rem', height: '1.8rem' , cursor: 'pointer' }}>start playing</button>
</div>
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: isTabScreen ? '4rem' : '2rem'}}>
  <LogoutIcon/>
  <p>Log out</p>
</div>
</nav>


      

    </div>
  )
}

export default NavBar
