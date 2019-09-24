import React, { Component } from 'react'

 class searchBar extends Component {
    constructor(props){
    super(props)
    this.state = {
        searchText: '',
        placeholder:'Tapez votre film...',
        setIntervalBeforeRequest: 2000000,
        lockRequest: false
        }
    }
    handleChange = (e) => {
        this.setState({ searchText: e.target.value})
        if (!this.state.lockRequest) {
            this.setState({lockRequest: true})
            setTimeout(() => {
                this.search(),
                this.state.setIntervalBeforeRequest
            })
        }
    }

    handleOnClick = () => {
        this.search()
    }
    
    search = () => {
        this.props.callback(this.state.searchText)
        this.setState({lockRequest: false})
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-8 input-group'>
                <input
                type='text'
                className='form-control input-lg'
                onChange={this.handleChange}
                placeholder={this.state.placeholder}/>
                    <span className='input-group-btn'>
                        <button className="btn btn-secondary" onClick={() => this.handleOnClick()}>GO</button>
                    </span>
                </div>
            </div>
        )
    }
}

export default searchBar