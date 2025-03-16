import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Card = ({ item, type }) => {
    const { actions } = useContext(Context);

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={`https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`} className="card-img-top" alt={item.name} />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <Link to={`/${type}/${item.uid}`} className="btn btn-primary">Learn More</Link>
                <button className="btn btn-warning ms-2" onClick={() => actions.addFavorite(item.name)}>
                    ❤️
                </button>
            </div>
        </div>
    );
};
