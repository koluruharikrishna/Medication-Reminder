import React, { Fragment } from 'react';
import './assets/styles.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './common/Header';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';

function App() {
  const isLoggedIn = useSelector((info) => info.isLoggedIn);
  const currentPath = window.location.pathname;
  return (
    <Fragment>
      <div>
        <Router>
          <div>
            <Header />
          </div>
          <Routes>
            <Route path='/' element={!isLoggedIn ? <Home /> : <Navigate to={currentPath} />} exact />
            <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to={currentPath} />} exact />
            <Route path='/sign-up' element={!isLoggedIn ? <SignUp /> : <Navigate to={currentPath} />} exact />
            <Route path='/dashboard' element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} exact />
          </Routes>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
