import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const Home = () => {
  const { people, planets, vehicles, loading, addToFavorites } = useContext(StarWarsContext);

  const renderSection = (title, items, path) => {
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-header bg-dark text-white">{title}</div>
          <div className="card-body">
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="list-group">
                {items.slice(0, 5).map((item) => (
                  <div 
                    key={item.uid} 
                    className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  >
                    <Link to={`/${path}/${item.uid}`}>
                      {item.name}
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => addToFavorites(item)}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card-footer">
            <Link to={`/${path}`} className="btn btn-secondary w-100">
              View All {title}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-white">Star Wars Universe</h1>
      <div className="row">
        {renderSection('Characters', people, 'people')}
        {renderSection('Planets', planets, 'planets')}
        {renderSection('Vehicles', vehicles, 'vehicles')}
      </div>
    </div>
  );
};

export default Home;