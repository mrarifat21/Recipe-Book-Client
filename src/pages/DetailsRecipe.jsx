import React, { useState } from "react";
import { useLoaderData } from "react-router"; 
import { AiFillLike } from "react-icons/ai";

const DetailsRecipe = () => {
  const recipe = useLoaderData();
  console.log(recipe);

  const [likecount, setLikecount] = useState(recipe.likecount || 0);

  const handleLike = async () => {
    const newLikeCount = likecount + 1;
    setLikecount(newLikeCount);

    const response = await fetch(
      `http://localhost:3000/addrecipes/like/${recipe._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
  };
 

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
        <div className="flex justify-between flex-row-reverse py-6">
          <div className="">
            <div className="flex items-center justify-center  gap-2">
              <button onClick={handleLike} className={`btn btn-primary mt-5 `}>
                <AiFillLike />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4 ">
            <p>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </p>
            <p>
              <strong>Prep Time:</strong> {recipe.prepTime} minutes
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {recipe.selectedCategories &&
              Array.isArray(recipe.selectedCategories) ? (
                recipe.selectedCategories.map((cat, index) => (
                  <span key={index}>
                    {cat}
                    {index < recipe.selectedCategories.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                <span>N/A</span>
              )}
            </p>
            <p>
              <strong>Ingredients:</strong> {recipe.ingredients}
            </p>
            <p>
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p className="mt-2 text-lg font-semibold">
              {likecount} people interested in this recipe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsRecipe;
