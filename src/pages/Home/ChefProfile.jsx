import React from "react";
import { useParams, Link } from "react-router";

const featuredChefs = [
  {
    _id: "1",
    name: "Sophia Bennett",
    image: "https://i.ibb.co/QF6N9YFd/chef-1.jpg",
    bio: "Passionate about Italian and Mediterranean cuisine. Known for fresh, seasonal dishes and homemade pasta.",
    totalRecipes: 18,
    specialty: "Mediterranean Cuisine",
    location: "Rome, Italy",
  },
  {
    _id: "2",
    name: "Liam Rodriguez",
    image: "https://i.ibb.co/B5z6CJ22/chef-2.jpg",
    bio: "Fusion specialist blending Asian and Latin flavors. Always experimenting with bold spices.",
    totalRecipes: 24,
    specialty: "Asian-Latin Fusion",
    location: "Mexico City, Mexico",
  },
  {
    _id: "3",
    name: "Ava Thompson",
    image: "https://i.ibb.co/Ggv1g07/chef-3.jpg",
    bio: "Baking queen with a love for French pastries and creative cakes. Sweet tooth guaranteed.",
    totalRecipes: 30,
    specialty: "French Pastries",
    location: "Paris, France",
  },
  {
    _id: "4",
    name: "Noah Patel",
    image: "https://i.ibb.co/zVYKrMYY/chef-4.jpg",
    bio: "Plant-based chef focused on nutrition and sustainability. Colorful, healthy plates every time.",
    totalRecipes: 15,
    specialty: "Plant-Based Recipes",
    location: "Bangalore, India",
  },
  {
    _id: "5",
    name: "Maya Singh",
    image: "https://i.ibb.co/cc6jHxZn/chef-5.jpg",
    bio: "Expert in Indian spices and traditional recipes with a modern twist.",
    totalRecipes: 12,
    specialty: "Indian Cuisine",
    location: "Delhi, India",
  },
  {
    _id: "6",
    name: "Daniel Kim",
    image: "https://i.ibb.co/C5mC4k03/chef-6.jpg",
    bio: "Specializes in Korean BBQ and street food, known for bold flavors and rich sauces.",
    totalRecipes: 22,
    specialty: "Korean Cuisine",
    location: "Seoul, South Korea",
  },
  {
    _id: "7",
    name: "Emily Garcia",
    image: "https://i.ibb.co/XZsbWRpW/chef-7.jpg",
    bio: "Creative baker focusing on vegan desserts and healthy sweets.",
    totalRecipes: 27,
    specialty: "Vegan Baking",
    location: "San Francisco, USA",
  },
  {
    _id: "8",
    name: "Oliver Wang",
    image: "https://i.ibb.co/35wCWVkS/chef-8.jpg",
    bio: "Master of Sichuan and spicy Chinese dishes with a modern presentation.",
    totalRecipes: 19,
    specialty: "Sichuan Cuisine",
    location: "Chengdu, China",
  },
];

const ChefProfile = () => {
  const { id } = useParams();
  const chef = featuredChefs.find((c) => c._id === id);

  if (!chef) {
    return (
      <div className="text-center mt-20 text-red-600">
        Chef not found.{" "}
        <Link to="/" className="text-blue-500 underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <section className="w-11/12 max-w-4xl mx-auto mt-20 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-full md:w-1/3 h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {chef.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{chef.bio}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Specialty:</strong> {chef.specialty}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            <strong>Location:</strong> {chef.location}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Total Recipes:</strong> {chef.totalRecipes}
          </p>

          <Link
            to="/"
            className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChefProfile;
