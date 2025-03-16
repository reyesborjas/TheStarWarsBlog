import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarWarsContext } from '../context/StarWarsContext';

const Details = ({ type }) => {
  const { people, planets, vehicles, toggleFavorite, favorites, loading } = useContext(StarWarsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if item is in favorites
  const isFavorite = favorites[type]?.some(fav => fav.uid === id);

  useEffect(() => {
    const findItem = () => {
      let foundItem;
      switch (type) {
        case 'people':
          foundItem = people.find(p => p.uid === id);
          break;
        case 'planets':
          foundItem = planets.find(p => p.uid === id);
          break;
        case 'vehicles':
          foundItem = vehicles.find(v => v.uid === id);
          break;
        default:
          navigate('/');
          return;
      }

      if (foundItem) {
        setItem(foundItem);
        setIsLoading(false);
      } else if (!loading) {
        // If data is loaded but item not found, fetch it directly
        fetchItemDetails();
      }
    };

    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const data = await response.json();
        
        if (data.result) {
          setItem({
            uid: id,
            name: data.result.properties.name || data.result.name,
            details: data.result.properties
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching item details:', error);
        setIsLoading(false);
      }
    };

    if (people.length > 0 || planets.length > 0 || vehicles.length > 0) {
      findItem();
    }
  }, [id, type, people, planets, vehicles, loading, navigate]);

  const renderDetails = () => {
    if (!item || !item.details) return null;

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

  if (isLoading) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Item not found. <a href="/" className="alert-link">Return to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-dark text-warning">
            <div className="card-header bg-dark text-warning d-flex justify-content-between align-items-center">
              <h2>{item.name}</h2>
              <button 
                className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-warning'}`}
                onClick={() => toggleFavorite(item, type)}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {renderDetails()}
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button 
                className="btn btn-warning" 
                onClick={() => navigate(-1)}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;