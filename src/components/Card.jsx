import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StarWarsContext } from "../context/StarWarsContext";

export const Card = ({ item, type }) => {
    const { toggleFavorite, favorites } = useContext(StarWarsContext);
    
    // Check if this item is in favorites
    const isFavorite = favorites[type]?.some(fav => fav.uid === item.uid);
    
    const handleToggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Intentando agregar/quitar favorito:", item.name);
        toggleFavorite(item, type);
    };

    return (
        <div className="card bg-dark text-warning" style={{ width: "18rem", marginBottom: "20px" }}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/${type}/${item.uid}`} className="btn btn-primary">
                        Learn More
                    </Link>
                    <button 
                        className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={handleToggleFavorite}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <i className="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};