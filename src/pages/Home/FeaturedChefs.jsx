import React from "react";
import { Link } from "react-router";
/* 
https://i.ibb.co/35wCWVkS/chef-8.jpg
https://i.ibb.co/B5z6CJ22/chef-2.jpg
https://i.ibb.co/Ggv1g07/chef-3.jpg
https://i.ibb.co/zVYKrMYY/chef-4.jpg
https://i.ibb.co/cc6jHxZn/chef-5.jpg
https://i.ibb.co/C5mC4k03/chef-6.jpg
https://i.ibb.co/XZsbWRpW/chef-7.jpg

*/
const featuredChefs = [
  {
    _id: "1",
    name: "Sophia Bennett",
    image: "https://i.ibb.co/QF6N9YFd/chef-1.jpg",
    totalRecipes: 18,
  },
  {
    _id: "2",
    name: "Liam Rodriguez",
    image: "https://i.ibb.co/B5z6CJ22/chef-2.jpg",
    totalRecipes: 24,
  },
  {
    _id: "3",
    name: "Ava Thompson",
    image: "https://i.ibb.co/Ggv1g07/chef-3.jpg",
    totalRecipes: 30,
  },
  {
    _id: "4",
    name: "Noah Patel",
    image: "https://i.ibb.co/zVYKrMYY/chef-4.jpg",
    totalRecipes: 15,
  },
  {
    _id: "5",
    name: "Maya Singh",
    image: "https://i.ibb.co/cc6jHxZn/chef-5.jpg",
    totalRecipes: 12,
  },
  {
    _id: "6",
    name: "Daniel Kim",
    image: "https://i.ibb.co/C5mC4k03/chef-6.jpg",
    totalRecipes: 22,
  },
  {
    _id: "7",
    name: "Emily Garcia",
    image: "https://i.ibb.co/XZsbWRpW/chef-7.jpg",
    totalRecipes: 27,
  },
  {
    _id: "8",
    name: "Oliver Wang",
    image: "https://i.ibb.co/35wCWVkS/chef-8.jpg",
    totalRecipes: 19,
  },
];

const FeaturedChefs = () => {
  return (
    <section className="w-11/12 mx-auto mt-20">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
        Featured Chefs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredChefs.map((chef) => (
          <div
            key={chef._id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-[1.03] duration-300"
          >
            <figure>
              <img
                src={chef.image}
                alt={chef.name}
                className="h-48 w-full object-contain bg-gray-100 dark:bg-gray-700"
                loading="lazy"
              />
            </figure>
            <div className="p-4">
              <h3
                className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 truncate"
                title={chef.name}
              >
                {chef.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Recipes:</strong> {chef.totalRecipes}
              </p>
              <Link
                to={`/chefs/${chef._id}`}
                className="inline-block bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedChefs;
