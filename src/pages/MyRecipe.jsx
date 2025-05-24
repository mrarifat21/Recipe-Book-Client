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
      fetch(`https://recipe-book-server-tau.vercel.app/myrecipes/${user.email}`)
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

  // Derive all unique categories from the user's recipes
  const allCategories = Array.from(
    new Set(myRecipes.flatMap((recipe) => recipe.selectedCategories || []))
  );

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
        `https://recipe-book-server-tau.vercel.app/addrecipes/${editingRecipe._id}`,
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

  // Delete Recipe
  const deleteRecipe = (id) => {
    fetch(`https://recipe-book-server-tau.vercel.app/addrecipes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
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
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          My Uploaded Recipes
        </h2>

        {myRecipes.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            You haven't uploaded any recipes yet.
            <Link to="/addrecipe" className="link link-primary font-semibold">
              Add one now!
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <figure>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-52 object-cover rounded-t-xl"
                  />
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-xl font-semibold text-primary">
                    {recipe.title}
                  </h2>
                  <div className="text-sm space-y-1">
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
                      <strong>Prep Time:</strong> {recipe.prepTime} min
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {recipe.selectedCategories?.join(", ") || "N/A"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-success">
                      {recipe.likecount} people interested
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* Update button */}
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => {
                        setEditingRecipe(recipe);
                        document.getElementById("update_modal").showModal();
                      }}
                    >
                      Update
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => deleteRecipe(recipe._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                    {/* Details Button */}
                    <button>
                      <Link
                        to={`/recipes/${recipe._id}`}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box w-full max-w-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-primary mb-4">
            Update Your Recipe
          </h3>

          {editingRecipe && (
            <form onSubmit={handleUpdateRecipe} className="space-y-3">
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
                rows={2}
              />
              <textarea
                name="instructions"
                defaultValue={editingRecipe.instructions}
                className="textarea textarea-bordered w-full"
                rows={3}
              />
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

              {/* Categories checkboxes */}
              <div className="flex flex-wrap gap-4">
                {allCategories.length === 0 ? (
                  <p className="text-gray-500">No categories available.</p>
                ) : (
                  allCategories.map((cat) => (
                    <label
                      key={cat}
                      htmlFor={`update-category-${cat.toLowerCase()}`}
                      className="flex items-center cursor-pointer gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <input
                        type="checkbox"
                        id={`update-category-${cat.toLowerCase()}`}
                        name="categories"
                        value={cat}
                        className="checkbox checkbox-primary dark:checkbox-secondary"
                        defaultChecked={editingRecipe.selectedCategories?.includes(
                          cat
                        )}
                      />
                      <span>{cat}</span>
                    </label>
                  ))
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Submit Update
              </button>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyRecipes;
