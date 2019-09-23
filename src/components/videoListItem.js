import React from 'react';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'
const videoListItem = ({ movie }) => {
    return <li>
        <img height='100px' width='100px' 
        src={`${IMAGE_URL}${movie.poster_path}`} alt="poster"/>
        <h3>{ movie.title }</h3>
        </li>
}

export default videoListItem