import React from "react";
import { Link, useLoaderData } from "react-router";

const AllRecipes = () => {
  const recipes = useLoaderData();
  console.log(recipes);
  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        All Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card bg-base-100 shadow-xl">
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
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
