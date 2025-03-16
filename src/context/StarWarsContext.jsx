import React, { createContext, useState, useEffect } from 'react';

export const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState({
    people: [],
    planets: [],
    vehicles: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch people from SWAPI
  const fetchPeople = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/people');
      const data = await response.json();
      
      // Fetch details for each person
      const peopleDetails = await Promise.all(
        data.results.map(async (person) => {
          const detailResponse = await fetch(person.url);
          const detailData = await detailResponse.json();
          return {
            ...person,
            details: detailData.result.properties,
            isFavorite: false
          };
        })
      );

      setPeople(peopleDetails);
    } catch (err) {
      setError('Failed to fetch people');
      console.error(err);
    }
  };

  // Fetch planets from SWAPI
  const fetchPlanets = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/planets');
      const data = await response.json();
      
      // Fetch details for each planet
      const planetDetails = await Promise.all(
        data.results.map(async (planet) => {
          const detailResponse = await fetch(planet.url);
          const detailData = await detailResponse.json();
          return {
            ...planet,
            details: detailData.result.properties,
            isFavorite: false
          };
        })
      );

      setPlanets(planetDetails);
    } catch (err) {
      setError('Failed to fetch planets');
      console.error(err);
    }
  };

  // Fetch vehicles from SWAPI
  const fetchVehicles = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/vehicles');
      const data = await response.json();
      
      // Fetch details for each vehicle
      const vehicleDetails = await Promise.all(
        data.results.map(async (vehicle) => {
          const detailResponse = await fetch(vehicle.url);
          const detailData = await detailResponse.json();
          return {
            ...vehicle,
            details: detailData.result.properties,
            isFavorite: false
          };
        })
      );

      setVehicles(vehicleDetails);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
    }
  };

  // Toggle favorite
  const toggleFavorite = (item, type) => {
    switch(type) {
      case 'people':
        setPeople(prevPeople => 
          prevPeople.map(p => 
            p.uid === item.uid ? { ...p, isFavorite: !p.isFavorite } : p
          )
        );
        setFavorites(prevFavorites => {
          const updatedFavorites = { ...prevFavorites };
          const index = updatedFavorites[type].findIndex(f => f.uid === item.uid);
          if (index !== -1) {
            // Remove from favorites
            updatedFavorites[type].splice(index, 1);
          } else {
            // Add to favorites
            updatedFavorites[type].push(item);
          }
          return updatedFavorites;
        });
        break;
      
      case 'planets':
        setPlanets(prevPlanets => 
          prevPlanets.map(p => 
            p.uid === item.uid ? { ...p, isFavorite: !p.isFavorite } : p
          )
        );
        setFavorites(prevFavorites => {
          const updatedFavorites = { ...prevFavorites };
          const index = updatedFavorites[type].findIndex(f => f.uid === item.uid);
          if (index !== -1) {
            // Remove from favorites
            updatedFavorites[type].splice(index, 1);
          } else {
            // Add to favorites
            updatedFavorites[type].push(item);
          }
          return updatedFavorites;
        });
        break;
      
      case 'vehicles':
        setVehicles(prevVehicles => 
          prevVehicles.map(v => 
            v.uid === item.uid ? { ...v, isFavorite: !v.isFavorite } : v
          )
        );
        setFavorites(prevFavorites => {
          const updatedFavorites = { ...prevFavorites };
          const index = updatedFavorites[type].findIndex(f => f.uid === item.uid);
          if (index !== -1) {
            // Remove from favorites
            updatedFavorites[type].splice(index, 1);
          } else {
            // Add to favorites
            updatedFavorites[type].push(item);
          }
          return updatedFavorites;
        });
        break;
      
      default:
        console.error('Invalid type');
    }
  };

  // Fetch all data when component mounts
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchPeople(), fetchPlanets(), fetchVehicles()]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  return (
    <StarWarsContext.Provider 
      value={{ 
        people, 
        planets, 
        vehicles, 
        favorites, 
        loading, 
        error, 
        toggleFavorite 
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};