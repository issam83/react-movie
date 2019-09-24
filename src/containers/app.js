import React, { Component } from 'react'
import axios from 'axios'
import '../style/style.css'
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
        })
    }

    applyVideoToCurrentMovie = () =>{
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}/videos?api_key=${API_KEY}&language=fr-FR`)
        .then((response) => {
            console.log('qsqsqs', response)
        const youtubeKey = response.data.results[0];
        let newCurrentMovieState = this.state.currentMovie;
        newCurrentMovieState.videoId = youtubeKey
        this.setState({ currentMovie: newCurrentMovieState })
        })
    }

    onClickListItem = (movie) => {
        this.setState({currentMovie:movie}, () => {
            this.applyVideoToCurrentMovie()
            this.setRecommendation()
        })
    }

    setRecommendation = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.currentMovie.id}/recommendations?api_key=${API_KEY}&language=fr-FR`)
        .then((response) => {
            this.setState({movieList:response.data.results.slice(0,5),            
            });
        })
    }

    onClickSearch = (searchText) => {
        if (searchText) {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`)
            .then((response) => {
                if (response.data && response.data.results[0]){
                    if (response.data.results[0].id != this.state.currentMovie.id){
                        this.setState({ currentMovie:response.data.results[0]}, () => {
                                this.applyVideoToCurrentMovie()
                                this.setRecommendation()
                            })
                    }
                }
        })
        }
}

    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return <VideoList 
                movieList={this.state.movieList}
                callBack={this.onClickListItem}
                 />
            }
        }
        return (
            <div>
                <div className='search_bar'>
                    <SearchBar 
                    callback={this.onClickSearch}/>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        <Video videoId={this.state.currentMovie.videoId}/>
                        <VideoDetail 
                        title={this.state.currentMovie.title}
                        description={this.state.currentMovie.overview} />
                    </div>
                    <div className='col-md-4'>
                    { renderVideoList() }   
                    </div>
                </div>
            </div>

        )
    }
}

const API_KEY = '2f7f60add924e56fee889692bf422f16'
const SEARCH_MOVIE = 'https://api.themoviedb.org/3/search/company?api_key=<<api_key>>&page=1'
// const API_END_POINT = 'https://api.themoviedb.org/3//movie/popular?language=fr-FR&page=1&append_to_response=images'
// const POPULAR_MOVIES_URL = '/movie/popular?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
// const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1'
