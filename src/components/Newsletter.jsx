import React from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "Thank you for subscribing to our newsletter!",
      timer: 2000,
      showConfirmButton: false,
    });
    form.reset();
  };

  return (
    <section className=" text-base-content py-12 px-4 sm:px-6 lg:px-8 my-30">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay Updated with Our Latest Recipes!
        </h2>
        <p className="text-lg opacity-80 mb-6">
          Join our newsletter for fresh recipes, cooking tips, and exclusive content delivered to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
