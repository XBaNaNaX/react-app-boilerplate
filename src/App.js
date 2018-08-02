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
                    <p>Redux Example</p>
                    <button onClick={()=>{props.fetchData()}}>Load data</button>
                    {
                        props.appData.isFetching && <p>Loading</p>
                    }

                    {
                        props.appData.data.length ? (
                            props.appData.data.map((person, i) => {
                              return <div key={i} >
                                <p>Name: {person.name}</p>
                                <p>Age: {person.age}</p>
                              </div>
                            })
                          ) : null
                    }

                    {
                        props.appData.unit.length ? (
                            props.appData.unit.map((unit, i) => {
                              return <div key={i} >
                                <p>Name: {unit.name}</p>
                                <p>Order: {unit.order}</p>
                              </div>
                            })
                          ) : null
                    }
                </div>
            </Router>
        );
    }

    
}

export default App;
