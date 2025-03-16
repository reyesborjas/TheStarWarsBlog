import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    
    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <Link to="/" className="navbar-brand ms-3">Star Wars Blog</Link>
            <div className="ml-auto me-3">
                <div className="btn-group">
                    <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites ({store.favorites.length})
                    </button>
                    <ul className="dropdown-menu">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item">No favorites</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between">
                                    {fav}
                                    <button className="btn btn-danger btn-sm" onClick={() => actions.removeFavorite(fav)}>&times;</button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};