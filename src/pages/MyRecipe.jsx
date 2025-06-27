import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router";
import Loading from "../components/Loading";
import Swal from "sweetalert2";

const MyRecipes = () => {
  const { user, loading } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const availableCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Vegan",
  ];
  const availableCusine = ["Italian", "Mexican", "Indian", "Chinese", "Others"];

  useEffect(() => {
    if (!loading && user?.email) {
      setFetchError(null);
      fetch(`${import.meta.env.VITE_API_URL}/myrecipes/${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => setMyRecipes(data))
        .catch((error) => {
          console.error("Error fetching user's recipes:", error);
          setFetchError("Failed to load your recipes. Please try again.");
        });
    } else if (!loading && !user) {
      setMyRecipes([]);
    }
  }, [user, loading]);

  if (loading) return <Loading />;
  if (fetchError)
    return (
      <div className="text-center py-8 text-red-600">Error: {fetchError}</div>
    );

  const handleUpdateRecipe = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedRecipe = Object.fromEntries(formData.entries());

    const categories = [];
    form.querySelectorAll("input[name='categories']:checked").forEach((cb) => {
      categories.push(cb.value);
    });
    updatedRecipe.selectedCategories = categories;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/addrecipes/${editingRecipe._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecipe),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      document.getElementById("update_modal").close();
      setMyRecipes((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
      setEditingRecipe(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Could not update the recipe. Please try again.",
      });
    }
  };

  const deleteRecipe = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this recipe?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/addrecipes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const remaining = myRecipes.filter((r) => r._id !== id);
              setMyRecipes(remaining);
              Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
            }
          });
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
            You haven't uploaded any recipes yet.{" "}
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
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => {
                        setEditingRecipe(recipe);
                        document.getElementById("update_modal").showModal();
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteRecipe(recipe._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/recipes/${recipe._id}`}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      Details
                    </Link>
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
                {availableCusine.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                name="prepTime"
                defaultValue={editingRecipe.prepTime}
                className="input input-bordered w-full"
              />

              <div className="flex flex-wrap gap-4">
                {availableCategories.map((cat) => (
                  <label
                    key={cat}
                    htmlFor={`update-category-${cat.toLowerCase()}`}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`update-category-${cat.toLowerCase()}`}
                      name="categories"
                      value={cat}
                      defaultChecked={editingRecipe.selectedCategories?.includes(
                        cat
                      )}
                      className="checkbox checkbox-primary"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
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
