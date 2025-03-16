import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { StarWarsProvider } from '../context/StarWarsContext';

const Layout = () => {
  return (
    <StarWarsProvider>
      <div 
        style={{ 
          background: 'linear-gradient(to right, #000000, #434343)', 
          minHeight: '100vh' 
        }}
      >
        <Navbar />
        <Outlet />
      </div>
    </StarWarsProvider>
  );
};

export default Layout;