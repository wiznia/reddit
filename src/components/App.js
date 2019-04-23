import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../App.scss';
import List from './List';
import Post from './Post';

const App = () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={List} />
      <Route path="/:postId" component={Post} />
    </div>
  </Router>
)

export default App;
