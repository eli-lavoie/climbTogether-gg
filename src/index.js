import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClimbTogether from './components/ClimbTogether';


ReactDOM.render(
  <Router>
    <ClimbTogether />
  </Router>,
  document.getElementById('root')
);
