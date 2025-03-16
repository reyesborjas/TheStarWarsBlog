import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const List = ({ type }) => {
  const { people, planets, vehicles, loading, addToFavorites } = useContext(StarWarsContext);

  let items = [];
  switch (type) {
    case 'people':
      items = people;
      break;
    case 'planets':
      items = planets;
      break;
    case 'vehicles':
      items = vehicles;
      break;
    default:
      return <div>Invalid type</div>;
  }

  const renderImage = (id) => {
    switch (type) {
      case 'people':
        return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      case 'planets':
        return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
      case 'vehicles':
        return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
      default:
        return 'https://via.placeholder.com/400x600.png?text=No+Image';
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-white text-capitalize">
        {type} of Star Wars
      </h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {items.map((item) => (
          <div key={item.uid} className="col">
            <div className="card h-100 shadow-sm">
              <img 
                src={renderImage(item.uid)} 
                className="card-img-top" 
                alt={item.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600.png?text=No+Image';
                }}
                style={{ 
                  height: '300px', 
                  objectFit: 'cover' 
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <Link 
                  to={`/${type}/${item.uid}`} 
                  className="btn btn-primary"
                >
                  Learn More
                </Link>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => addToFavorites(item)}
                >
                  <i className="fas fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;