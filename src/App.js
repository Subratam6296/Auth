import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/" component={Signup} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
