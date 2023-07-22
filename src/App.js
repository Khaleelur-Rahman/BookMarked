import Wishlist from './Pages/Wishlist';
import Read from './Pages/Read';
import ReadlistReview from './Pages/ReadlistReview';
import WishlistReview from './Pages/WishlistReview';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import BookForm from './components/BookForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index'
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Protected from './components/Protected';


function App() { 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  if (isLoggedIn) {
    return (
      <div className="App">  {/*Handles logout*/}
        <Navbar />
        <Protected user={user} token={token} handleLogout={handleLogout} />
      </div>
    );
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>   {/*Various routes used in the project*/}
        <Route path ="/" element = {<Home />} />
        <Route path ="/Login" element = {<Login />} />
        <Route path ="/Register" element = {<Register />} />
        <Route path ="/BookForm" element = {<BookForm />} />
        <Route path ="/BookForm/WishlistReview" element = {<WishlistReview />} />
        <Route path ="/WishList" element = {<Wishlist />} />
        <Route path ="/BookForm/ReadlistReview" element={<ReadlistReview />} />
        <Route path ="/Read" element = {<Read />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
