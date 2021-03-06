import React from 'react';
//import logo from './logo.svg';
//import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

//페이지 이동 라우터.
//Switch 안에 Route 덕에 URL을 이용하여 페이지를 이동할 수 있음.
function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

// 21강 client요청을 postman으로만 확인할 수 있었음
//하지만 이제는 있으므로 React JS부분에서 Request를 보내면 되는데
//그때 사용할게 AXIOS, JQeury를 사용할 때 AJAX라고 보면 됨.
//npm install axios -- save 로 설치.

export default App;
