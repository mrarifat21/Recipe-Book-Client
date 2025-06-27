import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { AiFillLike } from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import { Tooltip } from "react-tooltip";

const DetailsRecipe = () => {
  const { user } = useContext(AuthContext);
  const recipe = useLoaderData();
  const [likecount, setLikecount] = useState(recipe.likecount || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    // Optional: Load from localStorage or backend to persist likes
    const likedKey = `liked_${recipe._id}_${user?.uid}`;
    const likedStatus = localStorage.getItem(likedKey);
    if (likedStatus === "true") {
      setHasLiked(true);
    }
  }, [recipe._id, user?.uid]);

  const handleLike = async () => {
    if (hasLiked || user?.uid === recipe.uid) return;

    const newLikeCount = likecount + 1;
    setLikecount(newLikeCount);
    setHasLiked(true);

    // Optional: Save like status locally
    const likedKey = `liked_${recipe._id}_${user.uid}`;
    localStorage.setItem(likedKey, "true");

    // Update server like count
    await fetch(`${import.meta.env.VITE_API_URL}/addrecipes/like/${recipe._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
          className="w-full h-64 md:h-96 object-cover"
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
                disabled={user?.uid === recipe.uid || hasLiked}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                  user?.uid === recipe.uid
                    ? "You can't like your own recipe"
                    : hasLiked
                    ? "You've already liked this"
                    : ""
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                  hasLiked
                    ? "bg-primary text-white"
                    : "bg-primary text-white hover:bg-primary/90"
                } disabled:opacity-100 disabled:cursor-not-allowed`}
              >
                <AiFillLike size={20} />
                {hasLiked ? "Liked" : "Like"}
              </button>

              <Tooltip id="my-tooltip" />
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
