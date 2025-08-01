import React from 'react'
import '../css/MovieCard.css'
const Moviecard = ({movie}) => {
 
    const favbtn = () =>{
        alert("clicked")
    }

  return (
    <div className='movie-card'>
        <div className='movie-poster'>
             <img src={movie.Poster} alt={movie.title} />
             <div className='movie-overlay'>
                    <button className='favorite-btn' onClick={favbtn}>🤍</button>
             </div>
        </div>
        <div className='movie-info'>
               <h3>{movie.title}</h3>
               <p>{movie.release_date}</p>
        </div>
    </div>
  )
}

export default Moviecard
