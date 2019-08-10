import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import ButtonNav from './components/layout/ButtonNav';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Estimate from './components/Estimate/Estimate';

import setAuthToken from './utils/setAuthToken';
import './App.css';

// load token into global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = props => {
  return (
    <>
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Navbar />
              {/* <div className="container"> */}
              <Alerts />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/estimate" component={Estimate} />
                <Route exact path="/about" component={About} />
                {/* Register & Login */}
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
              {/* </div> */}
              <ButtonNav props={props} />
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </>
  );
};

export default App;
