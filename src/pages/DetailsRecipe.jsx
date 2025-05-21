import React from "react";
import { useLoaderData } from "react-router";

const DetailsRecipe = () => {
  const recipe = useLoaderData();
  console.log(recipe);

  return (
    <div className="w-11/12 mx-auto p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
        {recipe.title}
      </h1>

      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6 space-y-4">
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
          <p><strong>Category:</strong> {recipe.categories}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsRecipe;
