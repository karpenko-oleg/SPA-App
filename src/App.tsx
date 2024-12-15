
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componets/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import FavoritePage from './pages/FavoritePage';
import CreatePage from './pages/CreatePage';



const App: React.FC = () => {

  return (
    <>
     <Router>
     <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="favorits" element={<FavoritePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
