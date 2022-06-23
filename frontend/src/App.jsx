import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MyListingsPage from './pages/MyListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import EditListingPage from './pages/EditListingPage';
import ContextProvider from './utils/Store';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/register' element={ <RegisterPage /> } />
          { /* this route displays all host listings 2.2.1 */ }
          <Route path='/myListings' element={ <MyListingsPage /> } />
          <Route path='/createListing' element={ <CreateListingPage /> } />
          <Route path='/editListing/:listingId' element={ <EditListingPage /> } />
          <Route path='*' element={ <NotFoundPage /> } />
        </Routes>
      </Router>
    </ContextProvider>

  );
}

export default App;
