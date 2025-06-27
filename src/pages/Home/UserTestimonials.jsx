import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Emma Watson",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This recipe site transformed my cooking! Easy to follow and delicious results every time.",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "I love the variety of cuisines here and the detailed profiles of chefs. Highly recommended!",
    location: "Mexico City, Mexico",
  },
  {
    id: 3,
    name: "Lila Patel",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "The seasonal picks and tips really help me plan my meals better. Great community too!",
    location: "Mumbai, India",
  },
  {
    id: 4,
    name: "James Thompson",
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
    text: "Perfect site for beginners and pros alike. I’ve discovered so many new recipes here.",
    location: "London, UK",
  },
];

const UserTestimonials = () => {
  return (
    <section className="w-11/12 mx-auto mt-20">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {testimonials.map(({ id, name, photo, text, location }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-[1.03] duration-300"
          >
            <img
              src={photo}
              alt={name}
              className="w-24 h-24 rounded-full object-cover mb-4"
              loading="lazy"
            />
            <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{text}"</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserTestimonials;
