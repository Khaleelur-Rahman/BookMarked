import Wishlist from "./pages/Wishlist";
import Read from "./pages/Read";
import ReadlistReview from "./pages/ReadlistReview";
import WishlistReview from "./pages/WishlistReview";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookForm from "./pages/BookForm";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import "./styles/index.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";

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
      <div className="App">
        {" "}
        {/*Handles logout*/}
        <Navbar />
        <Protected user={user} token={token} handleLogout={handleLogout} />
      </div>
    );
  }
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {" "}
        {/*Various routes used in the project*/}
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/BookForm" element={<BookForm />} />
        <Route path="/BookForm/WishlistReview" element={<WishlistReview />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="/BookForm/ReadlistReview" element={<ReadlistReview />} />
        <Route path="/Read" element={<Read />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
