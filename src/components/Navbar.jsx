import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const Navbar = () => {
  const { favorites } = useContext(StarWarsContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Star Wars Blog
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/people">Characters</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planets">Planets</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">Vehicles</Link>
            </li>
          </ul>
          <div className="dropdown">
            <button 
              className="btn btn-secondary dropdown-toggle" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              Favorites 
              <span className="badge bg-light text-dark ms-2">
                {favorites.length}
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {favorites.length === 0 ? (
                <li>
                  <span className="dropdown-item text-muted">
                    No favorites yet
                  </span>
                </li>
              ) : (
                favorites.map((item) => (
                  <li key={item.uid}>
                    <div className="dropdown-item d-flex justify-content-between align-items-center">
                      {item.name}
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromFavorites(item.uid)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;