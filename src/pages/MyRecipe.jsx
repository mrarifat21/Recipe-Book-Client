


import React, { useEffect, useState } from "react";
import { use } from 'react'; 
import { AuthContext } from '../context/AuthProvider'; 
import { Link } from 'react-router'; 

const MyRecipes = () => {
  const { user, loading } = use(AuthContext); 
  const [myRecipes, setMyRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null); 

  useEffect(() => {
    if (!loading && user && user.email) {
      setFetchError(null); 
      fetch(`http://localhost:3000/myrecipes/${user.email}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          setMyRecipes(data);
        })
        .catch(error => {
          console.error("Error fetching user's recipes:", error);
          setFetchError("Failed to load your recipes. Please try again.");
        });
    } else if (!loading && !user) {
        setMyRecipes([]); 
    }
  }, [user, loading]); 

  if (loading) {
    return <div className="text-center py-8">Loading user data...</div>;
  }

  if (fetchError) {
    return <div className="text-center py-8 text-red-600">Error: {fetchError}</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        You need to be logged in to view your recipes.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">My Uploaded Recipes</h2>
      {myRecipes.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't uploaded any recipes yet.{" "}
          <Link to="/add-recipe" className="link link-primary">
            Add one now!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{recipe.title}</h2>
                <p className="text-sm text-gray-500">Cuisine: {recipe.cuisine}</p>
                <div className="card-actions justify-end mt-4">
                  <Link to={`/recipes/${recipe._id}`} className="btn btn-sm btn-primary">
                    View Recipe
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;