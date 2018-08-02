import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import HomePage from './components/Home';
import * as routes from './constants/routes';

import {SignUp} from './pages/signup';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                <Navigation/>
                <hr/>
                <Route
                    exact path={routes.LANDING}
                    component={() => <LandingPage />}
                />
                <Route
                    exact path={routes.HOME}
                    component={() => <HomePage />}
                />
                <Route 
                    exact path={routes.SIGN_UP}
                    component={()=> <SignUp />}
                />
                </div>
            </Router>
        );
    }

    
}

export default App;
