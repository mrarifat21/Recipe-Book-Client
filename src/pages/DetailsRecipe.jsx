import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { AiFillLike } from "react-icons/ai";

const DetailsRecipe = () => {
  const recipe = useLoaderData();
  const [likecount, setLikecount] = useState(recipe.likecount || 0);

  const handleLike = async () => {
    const newLikeCount = likecount + 1;
    setLikecount(newLikeCount);

    await fetch(
      `https://recipe-book-server-tau.vercel.app/addrecipes/like/${recipe._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className="w-11/12 max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-10 text-base-content">
        {recipe.title}
      </h1>

      <div className="bg-base-100 rounded-xl shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 md:h-96 object-cover "
        />

        <div className="p-6 space-y-5 text-base-content">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Cuisine:</span> {recipe.cuisine}
              </p>
              <p>
                <span className="font-semibold">Prep Time:</span>{" "}
                {recipe.prepTime} minutes
              </p>
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {Array.isArray(recipe.selectedCategories)
                  ? recipe.selectedCategories.join(", ")
                  : "N/A"}
              </p>
              <p>
                <span className="font-semibold">Ingredients:</span>{" "}
                {recipe.ingredients}
              </p>
              <p>
                <span className="font-semibold">Instructions:</span>{" "}
                {recipe.instructions}
              </p>
            </div>

            {/* Like Button & Count */}
            <div className="text-center">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
              >
                <AiFillLike size={20} />
                Like
              </button>
              <p className="mt-2 text-sm text-base-content/80">
                {likecount} people interested
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
};

export default DetailsRecipe;
