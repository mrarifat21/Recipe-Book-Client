import React from "react";
import { Link } from "react-router";

const AllRecipeShow = ({ recipe }) => {
    console.log("from all recipe show",recipe.image);
  return (
    <div>
      <figure>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          <strong>Prep Time:</strong> {recipe.prepTime}
        </p>
        <p>
          <strong>Category:</strong> {recipe.categories}
        </p>
        
        <div className="card-actions justify-start">
          <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllRecipeShow;
