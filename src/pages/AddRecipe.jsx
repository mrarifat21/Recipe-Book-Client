import { Link } from 'react-router';
import Swal from 'sweetalert2'

const AddRecipe = () => {
  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
     const selectedCategories = formData.getAll("categories");
    const newRecipe = Object.fromEntries(formData.entries());
    console.log(newRecipe);

    const addinfo ={
      ...newRecipe,
      selectedCategories,
      likecount:0,
    }
    //  send new recipe in database
    fetch("http://localhost:3000/addrecipes", {
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

          console.log("after adding recipe to db 1", data);
        }

      });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h2>

      <form onSubmit={handleAddRecipe} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          className="input input-bordered w-full"
          required
        />
        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          className="textarea textarea-bordered w-full"
          rows={3}
          required
        ></textarea>

        <textarea
          name="instructions"
          placeholder="Instructions"
          className="textarea textarea-bordered w-full"
          rows={4}
          required
        ></textarea>

        <div className="form-control">
          <label className="label">Cuisine Type</label>
          <select name="cuisine" className="select select-bordered">
            <option>Select your cuisine</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Others</option>
          </select>
        </div>

        <input
          type="number"
          name="prepTime"
          placeholder="Preparation Time (in minutes)"
          className="input input-bordered w-full"
          required
        />

        <div className="form-control">
          <label className="label">Categories</label>
          <div className="flex flex-wrap gap-3">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
              <label key={cat} className="label cursor-pointer gap-2">
                <input type="checkbox" name="categories"  value={cat} className="checkbox" />
                <span className="label-text">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        
        <button type="submit" className="btn btn-primary w-full">
          Add Recipe
        </button>
        
      </form>
    </div>
  );
};

export default AddRecipe;

