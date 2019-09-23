import React, { Component } from 'react'
import axios from 'axios'
import SearchBar from '../components/searchBar'
import VideoList from './videoList';
import VideoDetail from '../components/videoDetail';
import Video from '../components/video';

export default class app extends Component {
    state = {
        movieList: {},
        currentMovie: {}
    }

    componentWillMount() {
        this.initMovies()
    }

    initMovies = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`)
        .then((response) => {
            this.setState({movieList:response.data.results.slice(1,6),
            currentMovie:response.data.results[0]}, () => {
                this.applyVideoToCurrentMovie()
            });
            console.log('azaz', this.state.currentMovie)
        })
    }

    applyVideoToCurrentMovie = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}/videos?api_key=${API_KEY}&language=fr-FR`)
        .then((response) => {
            console.log('qsqsqs', response)
        const youtubeKey = response.data.results[0].key;
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey
        this.setState({ currentMovie: newCurrentMovieState })
        console.log('vide',newCurrentMovieState)
        })
    }

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return <VideoList movieList={this.state.movieList} />
            }
        }
        return (
            <div>
                <SearchBar />
                <Video videoId={this.state.currentMovie.videoId}/>
                { renderVideoList() }
                <VideoDetail 
                title={this.state.currentMovie.title}
                description={this.state.currentMovie.overview} />
            </div>

        )
    }
}

const API_KEY = '2f7f60add924e56fee889692bf422f16'
// const API_END_POINT = 'https://api.themoviedb.org/3//movie/popular?language=fr-FR&page=1&append_to_response=images'
// const POPULAR_MOVIES_URL = '/movie/popular?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
// const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/550?api_key=2f7f60add924e56fee889692bf422f16'
