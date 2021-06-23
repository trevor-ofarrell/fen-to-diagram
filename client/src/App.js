import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Diagram from './Diagram';
import Home from './Home';

function App() {

  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/diagram" component={Diagram} />
    </Switch>
  </Router>

  );
}

export default App;
