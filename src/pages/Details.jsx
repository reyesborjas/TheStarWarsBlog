import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const Details = ({ type }) => {
  const { people, planets, vehicles, addToFavorites } = useContext(StarWarsContext);
  const { id } = useParams();

  let item, imageUrl;
  switch (type) {
    case 'people':
      item = people.find(p => p.uid === id);
      imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
      break;
    case 'planets':
      item = planets.find(p => p.uid === id);
      imageUrl = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
      break;
    case 'vehicles':
      item = vehicles.find(v => v.uid === id);
      imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
      break;
    default:
      return <div>Not found</div>;
  }

  if (!item) return <div>Loading...</div>;

  const renderDetails = () => {
    switch (type) {
      case 'people':
        return (
          <>
            <p><strong>Height:</strong> {item.details.height}</p>
            <p><strong>Mass:</strong> {item.details.mass}</p>
            <p><strong>Hair Color:</strong> {item.details.hair_color}</p>
            <p><strong>Skin Color:</strong> {item.details.skin_color}</p>
            <p><strong>Eye Color:</strong> {item.details.eye_color}</p>
            <p><strong>Birth Year:</strong> {item.details.birth_year}</p>
            <p><strong>Gender:</strong> {item.details.gender}</p>
          </>
        );
      case 'planets':
        return (
          <>
            <p><strong>Climate:</strong> {item.details.climate}</p>
            <p><strong>Terrain:</strong> {item.details.terrain}</p>
            <p><strong>Population:</strong> {item.details.population}</p>
            <p><strong>Rotation Period:</strong> {item.details.rotation_period}</p>
            <p><strong>Orbital Period:</strong> {item.details.orbital_period}</p>
            <p><strong>Diameter:</strong> {item.details.diameter}</p>
          </>
        );
      case 'vehicles':
        return (
          <>
            <p><strong>Model:</strong> {item.details.model}</p>
            <p><strong>Manufacturer:</strong> {item.details.manufacturer}</p>
            <p><strong>Cost:</strong> {item.details.cost_in_credits} credits</p>
            <p><strong>Length:</strong> {item.details.length} meters</p>
            <p><strong>Crew:</strong> {item.details.crew}</p>
            <p><strong>Passengers:</strong> {item.details.passengers}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={imageUrl} 
            alt={item.name} 
            className="img-fluid rounded shadow" 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600.png?text=No+Image';
            }}
          />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h2>{item.name}</h2>
              <button 
                className="btn btn-outline-light"
                onClick={() => addToFavorites(item)}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <div className="card-body">
              {renderDetails()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;