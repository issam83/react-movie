import React, { Component } from 'react'

export default class searchBar extends Component {
    state = {
        searchText: '',
        placeholder:'Tapez votre film...'
    }

    handleChange = (e) => {
        this.setState({ searchText: e.target.value})
    }

    render() {
        return (
            <div>
                <input
                onChange={this.handleChange}
                placeholder={this.state.placeholder}/>
            </div>
        )
    }
}
