import React from 'react';
import VideoListItem from '../components/videoListItem';

const videoList = ( props ) => {
    const { movieList } = props
    return (
        <div>
            <ul>
                {
                    movieList.map(movie => {
                        return <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                    })
                }
            </ul>
        </div>
    )
    function receiveCallBack(movie) {
         props.callBack(movie)
     }
}

export default videoList