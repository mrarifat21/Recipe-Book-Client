import React from "react";
import { Link } from "react-router";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Tooltip } from "react-tooltip";

const Banner = () => {
  const [text] = useTypewriter({
    words: [
      " Delicious Recipes",
      " Culinary Creations",
      " Tasteful Journeys",
      " Home Cooking Ideas",
    ],
    loop: {},
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center bg-base-100 text-center px-4"
      style={{
        backgroundImage: `url('https://i.ibb.co.com/v4G3z1pJ/banner.jpg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for background */}
      <div className="absolute inset-0 bg-black opacity-30 dark:opacity-50"></div>

      <div
        className="relative z-10 p-6 rounded-lg max-w-4xl mx-auto"
        aria-live="polite"
        aria-atomic="true"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg text-white">
          Discover
          <span aria-label={text} className="text-indigo-400">
            {text}
          </span>
          <Cursor cursorStyle="|" cursorColor="#818CF8" />
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
          Unleash your inner chef with our vast collection of recipes, from
          quick meals to gourmet delights.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Tooltip id="my-tooltip" />
          <Link
            to="/allrecipes"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Click here to see all recipes"
            data-tooltip-place="top"
            className="inline-block rounded-md bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg
                       hover:bg-indigo-700 transition-colors duration-300 ease-in-out
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                       dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus-visible:outline-indigo-700"
          >
            Explore Recipes
          </Link>
          <Link
            to="/addrecipe"
            className="inline-block rounded-md border-2 border-indigo-600 px-8 py-3 text-lg font-semibold text-indigo-400 shadow-lg
                       hover:bg-indigo-600 hover:text-white transition-colors duration-300 ease-in-out
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                       dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-white dark:focus-visible:outline-indigo-400"
          >
            Share Your Recipe
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
