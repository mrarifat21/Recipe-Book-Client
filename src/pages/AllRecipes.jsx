import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";

const AllRecipes = () => {
  const recipes = useLoaderData();
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisineTypes = ["All", ...new Set(recipes.map((r) => r.cuisine))];

  const filteredRecipes =
    selectedCuisine === "All"
      ? recipes
      : recipes.filter((r) => r.cuisine === selectedCuisine);

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-base-content">
        Browse Recipes
      </h1>

      {/* Cuisine Filter */}
      <div className="mb-8 flex justify-center">
        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-base-content bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary transition"
        >
          {cuisineTypes.map((cuisine, idx) => (
            <option key={idx} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-base-content">
                {recipe.title}
              </h2>
              <p className="text-sm text-base-content/80">
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
              <p className="text-sm text-base-content/80">
                <strong>Prep Time:</strong> {recipe.prepTime}
              </p>
              <p className="text-sm text-base-content/80">
                <strong>Likes:</strong> {recipe.likecount}
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="inline-block mt-3 text-primary font-medium hover:underline"
              >
                See Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
