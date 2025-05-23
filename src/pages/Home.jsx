import React from "react";
import Banner from "../components/Banner";
import Newsletter from "../components/Newsletter";
import ContactForm from "../components/ContactForm";
import TopRecipe from "../components/TopRecipe";

const Home = () => {
  return (
    <>
      <Banner />
      <TopRecipe></TopRecipe>
      <Newsletter></Newsletter>
      <ContactForm></ContactForm>
    </>
  );
};

export default Home;
