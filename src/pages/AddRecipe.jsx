import { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const AddRecipe = () => {
  const { user } = use(AuthContext);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const selectedCategories = formData.getAll("categories");
    const newRecipe = Object.fromEntries(formData.entries());

    const addinfo = {
      ...newRecipe,
      selectedCategories,
      likecount: 0,
      userEmail: user.email,
      uid: user.uid,
    };

    fetch(`${import.meta.env.VITE_API_URL}/addrecipes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addinfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Your recipe is added",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10  my-10 dark:bg-gray-900  rounded-xl dark:border-primary border-gray-300 border-2 ">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400">
        Add a New Recipe
      </h2>

      <form onSubmit={handleAddRecipe} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Delicious Pasta"
            className="input input-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="image"
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label
            htmlFor="ingredients"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Ingredients (comma separated)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            placeholder="Tomatoes, Basil, Olive Oil, Garlic"
            className="textarea textarea-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            rows={3}
            required
          ></textarea>
        </div>

        {/* Instructions */}
        <div>
          <label
            htmlFor="instructions"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            placeholder="Step 1: Chop tomatoes... Step 2: Saute garlic..."
            className="textarea textarea-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Cuisine Type */}
        <div>
          <label
            htmlFor="cuisine"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Cuisine Type
          </label>
          <select
            id="cuisine"
            name="cuisine"
            className="select select-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select your cuisine
            </option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        {/* Preparation Time */}
        <div>
          <label
            htmlFor="prepTime"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Preparation Time (in minutes)
          </label>
          <input
            id="prepTime"
            type="number"
            name="prepTime"
            placeholder="e.g., 30"
            min={1}
            className="input input-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <p className="mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Categories
          </p>
          <div className="flex flex-wrap gap-4">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
              <label
                key={cat}
                htmlFor={`category-${cat.toLowerCase()}`}
                className="flex items-center cursor-pointer gap-2 text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  id={`category-${cat.toLowerCase()}`}
                  name="categories"
                  value={cat}
                  className="checkbox checkbox-primary dark:checkbox-secondary"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
