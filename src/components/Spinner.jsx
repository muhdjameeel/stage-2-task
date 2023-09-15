import React from 'react'
import '../index.css'
function Spinner() {
  return (
    <div className="spinner-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div className="spinner"></div>
    </div>
  )
}

export default Spinner