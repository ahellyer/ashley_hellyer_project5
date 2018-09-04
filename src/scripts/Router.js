import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import App from './App';


const Router = () => {
    return (
        <BrowserRouter basename='/up-with-the-times'>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/explore" component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router