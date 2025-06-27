import React from "react";
import Banner from "./Banner";
import Newsletter from "./Newsletter";
import Contact from "../Contact";
import TopRecipe from "./TopRecipe";
import FeaturedChefs from "./FeaturedChefs";
import UserTestimonials from "./UserTestimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <TopRecipe></TopRecipe>
      <FeaturedChefs></FeaturedChefs>
      <UserTestimonials></UserTestimonials>
      <Newsletter></Newsletter>
      
    </>
  );
};

export default Home;
