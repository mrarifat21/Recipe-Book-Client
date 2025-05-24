import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const TopRecipe = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://recipe-book-server-tau.vercel.app/top-recipe")
      .then((res) => res.json())
      .then((data) => {
        setTopRecipes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-11/12 mx-auto my-10 text-center text-gray-500">
        Loading top recipes...
      </section>
    );
  }

  if (!topRecipes.length) {
    return (
      <section className="w-11/12 mx-auto my-10 text-center text-gray-500">
        No top recipes found.
      </section>
    );
  }

  return (
    <section className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Top Liked Recipes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-[1.03] duration-300"
          >
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-48 w-full object-cover"
                loading="lazy"
              />
            </figure>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 truncate" title={recipe.title}>
                {recipe.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Cuisine:</strong> {recipe.cuisine}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Likes:</strong> {recipe.likecount}
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/allrecipes"
          className="inline-block border border-primary text-primary px-5 py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
        >
          See All Recipes
        </Link>
      </div>
    </section>
  );
};

export default TopRecipe;
