// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const App = () => (
  <div>
    {!localStorage.getItem('user') && <Link to="/login">Login</Link>}
    {!localStorage.getItem('user') && <Link to="/signup">Sign Up</Link>}
    {localStorage.getItem('user') && <Link to="/battle">Battle</Link>}
  </div>
);

export default App;
