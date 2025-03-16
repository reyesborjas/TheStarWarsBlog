import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';
import { Card } from '../components/Card';

const List = ({ type }) => {
  const { people, planets, vehicles, loading, favorites } = useContext(StarWarsContext);

  let items = [];
  let title = '';

  switch (type) {
    case 'people':
      items = people.map(item => ({
        ...item,
        isFavorite: favorites.people.some(fav => fav.uid === item.uid)
      }));
      title = 'Characters';
      break;
    case 'planets':
      items = planets.map(item => ({
        ...item,
        isFavorite: favorites.planets.some(fav => fav.uid === item.uid)
      }));
      title = 'Planets';
      break;
    case 'vehicles':
      items = vehicles.map(item => ({
        ...item,
        isFavorite: favorites.vehicles.some(fav => fav.uid === item.uid)
      }));
      title = 'Vehicles';
      break;
    default:
      return <div className="alert alert-danger">Invalid type</div>;
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-capitalize text-warning">
        {title} of Star Wars
      </h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {items.map((item) => (
          <div key={item.uid} className="col d-flex justify-content-center">
            <Card item={item} type={type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;