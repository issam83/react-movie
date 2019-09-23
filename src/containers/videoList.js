import React from 'react';
import VideoListItem from '../components/videoListItem';

const videoList = ({ movieList }) => {
    return (
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie}/>
                    })
                }
            </ul>
        </div>
    )
}

export default videoList