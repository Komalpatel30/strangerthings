
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';


import Login from './routes/Login';
import Header from './components/Header';
import Register from './routes/Register';
import Profile from './routes/Profile';
import Posts from './routes/Posts';
import AddPost from './routes/Create'
import PostDetail from './routes/PostDetail';

import './style.css';


const App = () => {

  const [token] = useState(localStorage.getItem('token'))

  useEffect(() => {
    fetchToken()
  }, [])

  const fetchToken = () => {

    let loggedIn = false;
    if (token) {
      fetch('https://strangers-things.herokuapp.com/api/2010-UNF-HY-WEB-PT/test/me', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.json())
        .then(result => {
          console.log("resultIndexJS:", result);
        })
        .catch(console.error);
    }
  }

  return (
    <div className="app">
      <Header
        token={localStorage.getItem("token")}
      />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {token
          ?
          <>
            <Route exact path='/posts/add'>
              <AddPost />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/posts/:id">
              <PostDetail />
            </Route>
            <Route exact path="/posts">
              <Posts />
            </Route>
          </> : null}

      </Switch>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
);


// {/* <Login/> */}

//Komal is cool