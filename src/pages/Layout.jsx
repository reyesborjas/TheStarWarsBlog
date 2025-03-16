import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StarWarsProvider } from '../context/StarWarsContext';
import ScrollToTop from '../components/ScrollToTop';

const Layout = () => {
  const location = useLocation();

  return (
    <StarWarsProvider>
      <ScrollToTop location={location}>
        <div 
          style={{ 
            background: 'linear-gradient(to right, #000000, #1a1a1a)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Navbar />
          <main style={{ flex: '1 0 auto', paddingBottom: '2rem' }}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ScrollToTop>
    </StarWarsProvider>
  );
};

export default Layout;