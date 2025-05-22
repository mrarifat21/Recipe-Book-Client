import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Banner from "../components/Banner";

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/top-liked-recipes")
      .then((res) => res.json())
      .then((data) => setTopRecipes(data));
  }, []);

  return (
    <div>
      <Banner />

      <section className="w-11/12 mx-auto my-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Top Liked Recipes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="card bg-base-100 shadow-md rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={recipe.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={recipe.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Cuisine:</strong> {recipe.cuisine}
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Likes:</strong> {recipe.likecount}
                </p>
                <div className="card-actions">
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/allrecipes" className="btn btn-outline btn-secondary">
            See All Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
