import React, { Component } from 'react';


class LandingPage extends Component {
    
    goToExplore = () => {
       
        console.log('heyyyyy i want to explore')
        this.props.history.push(`/explore`)
    }
    
    render() {
        return (
            <header>
                <h1>Up with the Times</h1>
                <button onClick={this.goToExplore}>Explore lists!</button>
            </header>
        )
    }
}

export default LandingPage;