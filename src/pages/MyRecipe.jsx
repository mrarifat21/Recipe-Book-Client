import React, { useEffect, useState } from "react";
import { use } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";
import Loading from "../components/Loading";
import Swal from "sweetalert2";


const MyRecipes = () => {
  const { user, loading } = use(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    if (!loading && user && user.email) {
      setFetchError(null);
      fetch(`http://localhost:3000/myrecipes/${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setMyRecipes(data);
        })
        .catch((error) => {
          console.error("Error fetching user's recipes:", error);
          setFetchError("Failed to load your recipes. Please try again.");
        });
    } else if (!loading && !user) {
      setMyRecipes([]);
    }
  }, [user, loading]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (fetchError) {
    return (
      <div className="text-center py-8 text-red-600">Error: {fetchError}</div>
    );
  }

  // Update Recipe
  const handleUpdateRecipe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedRecipe = Object.fromEntries(formData.entries());
    const categories = [];
    form
      .querySelectorAll("input[name='categories']:checked")
      .forEach((checkbox) => {
        categories.push(checkbox.value);
      });
    updatedRecipe.selectedCategories = categories;

    try {
      const res = await fetch(
        `http://localhost:3000/addrecipes/${editingRecipe._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRecipe),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      const updated = await res.json();
      console.log("Updated recipe:", updated);

      document.getElementById("update_modal").close();

      setMyRecipes((prev) =>
        prev.map((r) =>
          r._id.toString() === updated._id.toString() ? updated : r
        )
      );

      setEditingRecipe(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  //  deleteRecipe

  const deleteRecipe = (id) => {
    fetch(`http://localhost:3000/addrecipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount){
          const remainingRecipe = myRecipes.filter(
          (myRecipe) => myRecipe._id !== id
        );
        setMyRecipes(remainingRecipe);
        Swal.fire({
          title: "Deleted!",
          text: "Your account is deleted.",
          icon: "success",
        });
        console.log("after delete", data);
        }
        
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        My Uploaded Recipes
      </h2>
      {myRecipes.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't uploaded any recipes yet.
          <Link to="/addrecipe" className="link link-primary">
            Add one now!
          </Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map((recipe) => (
            <div key={recipe._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg">{recipe.title}</h2>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
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
                        {index < recipe.selectedCategories.length - 1
                          ? ", "
                          : ""}
                      </span>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {recipe.likecount} people interested in this recipe
                </p>
                <div className="card-actions  mt-4">
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEditingRecipe(recipe);
                        document.getElementById("update_modal").showModal();
                      }}
                    >
                      Update Recipe
                    </button>

                    <dialog id="update_modal" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                          </button>
                        </form>
                        <h3 className="font-bold text-lg">
                          Update Your Recipe Here
                        </h3>

                        {editingRecipe && (
                          <form
                            onSubmit={handleUpdateRecipe}
                            className="space-y-4"
                          >
                            <input
                              type="text"
                              name="title"
                              defaultValue={editingRecipe.title}
                              className="input input-bordered w-full"
                            />
                            <input
                              type="url"
                              name="image"
                              defaultValue={editingRecipe.image}
                              className="input input-bordered w-full"
                            />
                            <textarea
                              name="ingredients"
                              defaultValue={editingRecipe.ingredients}
                              className="textarea textarea-bordered w-full"
                              rows={3}
                            ></textarea>
                            <textarea
                              name="instructions"
                              defaultValue={editingRecipe.instructions}
                              className="textarea textarea-bordered w-full"
                              rows={4}
                            ></textarea>
                            <select
                              name="cuisine"
                              className="select select-bordered w-full"
                              defaultValue={editingRecipe.cuisine}
                            >
                              <option>Italian</option>
                              <option>Mexican</option>
                              <option>Indian</option>
                              <option>Chinese</option>
                              <option>Others</option>
                            </select>
                            <input
                              type="number"
                              name="prepTime"
                              defaultValue={editingRecipe.prepTime}
                              className="input input-bordered w-full"
                            />

                            <button
                              type="submit"
                              className="btn btn-primary w-full"
                            >
                              Update Recipe
                            </button>
                          </form>
                        )}
                      </div>
                    </dialog>
                  </div>
                  <button
                    onClick={() => deleteRecipe(recipe._id)}
                    className="btn btn-warning"
                  >
                    Delete Recipe
                  </button>
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
