import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const Navbar = () => {
  const { favorites, removeFromFavorites } = useContext(StarWarsContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Flatten favorites for easier rendering
  const allFavorites = [
    ...favorites.people.map(item => ({ ...item, type: 'people' })),
    ...favorites.planets.map(item => ({ ...item, type: 'planets' })),
    ...favorites.vehicles.map(item => ({ ...item, type: 'vehicles' }))
  ];

  // Get the total count of favorites
  const totalFavorites = allFavorites.length;

  // Function to handle navigation when clicking on a favorite
  const handleFavoriteClick = (e, itemType, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(false);
    navigate(`/${itemType}/${itemId}`);
  };

  // Function to handle removing a favorite
  const handleRemoveFavorite = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromFavorites(item, type);
  };

  // Toggle dropdown manually since we're in a sandboxed environment
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.favorites-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-jedi me-2"></i>
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
              <Link className="nav-link" to="/people">
                <i className="fas fa-user me-1"></i> Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planets">
                <i className="fas fa-globe me-1"></i> Planets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/vehicles">
                <i className="fas fa-space-shuttle me-1"></i> Vehicles
              </Link>
            </li>
          </ul>
          <div className="dropdown favorites-dropdown position-relative">
            <button 
              className="btn btn-warning" 
              type="button"
              onClick={toggleDropdown}
            >
              <i className="fas fa-heart me-1"></i>
              Favorites 
              <span className="badge bg-dark text-warning ms-2">
                {totalFavorites}
              </span>
            </button>
            {showDropdown && (
              <ul 
                className="dropdown-menu dropdown-menu-end position-absolute show"
                style={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  minWidth: '250px',
                  right: 0,
                  top: '100%',
                  zIndex: 1000
                }}
              >
                {totalFavorites === 0 ? (
                  <li>
                    <span className="dropdown-item text-muted">
                      No favorites yet
                    </span>
                  </li>
                ) : (
                  allFavorites.map((item) => (
                    <li key={`${item.type}-${item.uid}`}>
                      <div className="dropdown-item d-flex justify-content-between align-items-center">
                        <a 
                          href="#"
                          className="text-decoration-none text-dark flex-grow-1"
                          onClick={(e) => handleFavoriteClick(e, item.type, item.uid)}
                        >
                          {item.name}
                        </a>
                        <button 
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={(e) => handleRemoveFavorite(e, item, item.type)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;