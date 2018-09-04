import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './styles/index.css'
// import App from './App';
// import Router from './Router';
import Router from './scripts/Router'
// import LandingPage from './LandingPage.js';
import registerServiceWorker from './scripts/registerServiceWorker';



ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
