import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';
import { Card } from '../components/Card';

const Home = () => {
  const { people, planets, vehicles, loading } = useContext(StarWarsContext);

  const renderSection = (title, items, type, path) => {
    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100 bg-dark">
          <div className="card-header bg-dark text-warning border-warning">
            <h2 className="text-center">{title}</h2>
          </div>
          <div className="card-body d-flex flex-column">
            {loading ? (
              <div className="d-flex justify-content-center my-4">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row row-cols-1 g-3 mb-auto">
                {items.slice(0, 3).map((item) => (
                  <div key={item.uid} className="col d-flex justify-content-center">
                    <Card item={item} type={type} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="card-footer text-center border-warning">
            <Link to={`/${path}`} className="btn btn-warning w-100">
              View All {title}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <div className="text-warning text-center mb-5">
        <h1 className="mb-3">Star Wars Universe</h1>
        <p className="lead">
          Explore the vast Star Wars universe. Learn about characters, 
          planets, and vehicles from the iconic saga.
        </p>
        <p>
          Add your favorites to create your personal Star Wars reading list!
        </p>
      </div>
      
      <div className="row">
        {renderSection('Characters', people, 'people', 'people')}
        {renderSection('Planets', planets, 'planets', 'planets')}
        {renderSection('Vehicles', vehicles, 'vehicles', 'vehicles')}
      </div>
    </div>
  );
};

export default Home;