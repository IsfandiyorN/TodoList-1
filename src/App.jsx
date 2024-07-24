import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';  
import Home from './components/home/Home';
import Today from './components/Today/Today';
import Login from './components/login/Login';
import Upcoming from './components/Upcoming/Upcoming';  
import ProtectedRoute from './components/protected-route/ProtectedRoute';  
import LogoutButton from './components/logout-button/LogoutButton'; 
import "./App.scss";


function App() {
  return (
    <Provider store={store}>  {}
      <div>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/today'>Today</NavLink>
              </li>
              <li>
                <NavLink to='/upcoming'>Upcoming</NavLink>  {}
              </li>
            </ul>
            <LogoutButton>Log out</LogoutButton>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/today' element={<Today />} />
              <Route path='/upcoming' element={<Upcoming />} />  {}
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
