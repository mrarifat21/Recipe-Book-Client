import React, { useState, useMemo } from "react";
import { Link, useLoaderData } from "react-router"; // use "react-router-dom" instead of "react-router"

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  // Get unique cuisine types
  const cuisineTypes = useMemo(() => {
    const types = recipes.map((recipe) => recipe.cuisine);
    return ["All", ...new Set(types)];
  }, [recipes]);

  // Filter recipes based on selected cuisine
  const filteredRecipes = useMemo(() => {
    if (selectedCuisine === "All") return recipes;
    return recipes.filter((recipe) => recipe.cuisine === selectedCuisine);
  }, [recipes, selectedCuisine]);

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        All Recipes
      </h1>

      {/* Cuisine Filter Dropdown */}
      <div className="mb-6 text-center">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
        >
          {cuisineTypes.map((cuisine, idx) => (
            <option key={idx} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
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
              <p>
                <strong>Likes:</strong> {recipe.likecount}
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
