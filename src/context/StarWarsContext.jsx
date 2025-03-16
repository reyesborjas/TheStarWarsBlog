import React, { createContext, useState, useEffect } from 'react';

export const StarWarsContext = createContext();

export const StarWarsProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [favorites, setFavorites] = useState([]);
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
            details: detailData.result.properties
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
            details: detailData.result.properties
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
            details: detailData.result.properties
          };
        })
      );

      setVehicles(vehicleDetails);
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error(err);
    }
  };

  // Add to favorites
  const addToFavorites = (item) => {
    // Check if item is already in favorites
    if (!favorites.some(fav => fav.uid === item.uid)) {
      setFavorites([...favorites, item]);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (itemId) => {
    setFavorites(favorites.filter(fav => fav.uid !== itemId));
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
        addToFavorites, 
        removeFromFavorites 
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};