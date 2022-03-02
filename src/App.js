import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/Home';

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
        >
          <Redirect
            to="/home"
          />
        </Route>

        <Route
          exact
          path="/home"
          component={Home}
        />
      </Switch>
    </Router>
  );
};
