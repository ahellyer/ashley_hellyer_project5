import React, { Component } from 'react';


class LandingPage extends Component {
    
    goToExplore = () => {
       
        console.log('heyyyyy i want to explore')
        this.props.history.push(`/explore`)
    }
    
    render() {
        return (
            <header>
                <div className="landing__container">
                    <h1 className="landing__title">Up with the Times</h1>
                    <p className="landing__paragraph">Explore current New York Times bestsellers</p>
                    <button className="landing__button"onClick={this.goToExplore}>Enter</button>
                </div>
            </header>
        )
    }
}

export default LandingPage;