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

  // Cargar favoritos desde localStorage al inicio
  useEffect(() => {
    const storedFavorites = localStorage.getItem('starWarsAppFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
        console.log('Favoritos cargados desde localStorage:', JSON.parse(storedFavorites));
      } catch (e) {
        console.error('Error al cargar favoritos:', e);
      }
    }
  }, []);

  // Fetch people from SWAPI
  const fetchPeople = async () => {
    try {
      const response = await fetch('https://www.swapi.tech/api/people');
      const data = await response.json();
      
      // Fetch details for each person (limit to 10 for performance)
      const peopleDetails = await Promise.all(
        data.results.slice(0, 10).map(async (person) => {
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
      
      // Fetch details for each planet (limit to 10 for performance)
      const planetDetails = await Promise.all(
        data.results.slice(0, 10).map(async (planet) => {
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
      
      // Fetch details for each vehicle (limit to 10 for performance)
      const vehicleDetails = await Promise.all(
        data.results.slice(0, 10).map(async (vehicle) => {
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

  // Toggle favorite (simple implementation)
  const toggleFavorite = (item, type) => {
    console.log('Toggle favorite llamado con:', item, type);
    
    // Check if this item is already in favorites
    const isAlreadyFavorite = favorites[type].some(fav => fav.uid === item.uid);
    console.log('¿Ya está en favoritos?:', isAlreadyFavorite);
    
    let updatedFavorites;
    
    if (isAlreadyFavorite) {
      // Remove from favorites
      updatedFavorites = {
        ...favorites,
        [type]: favorites[type].filter(fav => fav.uid !== item.uid)
      };
      console.log('Eliminando de favoritos');
    } else {
      // Add to favorites - create a simple object to avoid circular references
      const favoriteItem = {
        uid: item.uid,
        name: item.name,
        url: item.url || `https://www.swapi.tech/api/${type}/${item.uid}`
      };
      
      updatedFavorites = {
        ...favorites,
        [type]: [...favorites[type], favoriteItem]
      };
      console.log('Agregando a favoritos:', favoriteItem);
    }
    
    // Update state
    setFavorites(updatedFavorites);
    
    // Save to localStorage
    localStorage.setItem('starWarsAppFavorites', JSON.stringify(updatedFavorites));
    console.log('Favoritos actualizados:', updatedFavorites);
    
    return !isAlreadyFavorite; // Return the new favorite state
  };

  // Explicitly named functions for adding and removing favorites (useful for Navbar)
  const addToFavorites = (item, type) => {
    if (!favorites[type].some(fav => fav.uid === item.uid)) {
      toggleFavorite(item, type);
    }
  };

  const removeFromFavorites = (item, type) => {
    if (favorites[type].some(fav => fav.uid === item.uid)) {
      toggleFavorite(item, type);
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
        toggleFavorite,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};