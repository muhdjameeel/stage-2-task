import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useMediaQuery } from '@mui/material';



function Footer() {

    const isSmallScreen = useMediaQuery('(max-width: 600px)')

  return (
    <footer style={{marginTop: '7rem', height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <div style={{display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem'}}>
        
        <InstagramIcon/>
        <TwitterIcon/>
        <YouTubeIcon/>
        
    </div>
    <div style={{display: 'flex', width: isSmallScreen ? '100%' : '50%', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem', fontSize: isSmallScreen ? '.8rem' : 'auto'}}>
      <p>Condition Use</p>
      <p>Privacy & Policy</p>
      <p>Press Room</p>
    </div>
    <p> © 2021 <span style={{color: 'gray'}}>Movie Discovery App</span> by <span style={{color: 'gray'}}>Muhdjameeel</span></p>
    </footer>
  )
}

export default Footer
