import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UpdateExpert from './components/update_expert.component';
import UpdateUser from './components/update_user.component';
import CreateExpert from './components/create_expert.component';
import Signup from './components/signup.component';
import Login from './components/login.component';
import User from './components/user.component';
import Expert from './components/expert.component';
import Experts from './components/experts.component';
import Search from './components/search.component';
import Navbar from './components/navbar.component';

function App() {
  return (
    <div className="container">
      <Router>
        <div>
          <Navbar />
          <div>
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/users/:id" component={User} />
              <Route exact path="/experts/:id" component={Expert} />
              <Route exact path="/" component={Experts} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/experts" component={Experts} />
              <Route exact path="/experts/create" component={CreateExpert} />
              <Route exact path="/experts/:id/update" component={UpdateExpert} />
              <Route exact path="/users/:id/update" component={UpdateUser} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
