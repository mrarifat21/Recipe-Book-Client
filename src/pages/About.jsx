import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <section className="w-11/12 max-w-4xl mx-auto mt-20 mb-20 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p>
            Welcome to TastLog! We started this website out of a passion for
            sharing delicious, easy-to-follow recipes from talented chefs around
            the world. Our mission is to make cooking accessible, enjoyable, and
            inspiring for everyone.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Handpicked recipes from diverse cuisines</li>
            <li>Featured chefs with detailed profiles</li>
            <li>Seasonal and trending recipe recommendations</li>
            <li>User testimonials and a supportive cooking community</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Meet the Founder</h2>
          <p>
            Hi! I’m Rifat, a cooking enthusiast and the founder of TastLog. I
            believe that cooking brings people together and hope this site helps
            you create memorable meals for your loved ones.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How To Use Our Site</h2>
          <p>
            Browse our recipes, explore chefs’ profiles, and use filters to find
            your next favorite meal. Don’t forget to sign up for our newsletter
            to get fresh recipes delivered right to your inbox!
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Have questions, suggestions, or want to collaborate? Feel free to
            {" "}
            <Link
              to="/contact"
              className="text-primary underline hover:text-primary-dark transition"
            >
              Contact Us
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
