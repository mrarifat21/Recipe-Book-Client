import React from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
    const handleSubmit =e=>{
        e.preventDefault();
        Swal.fire({
          icon: 'success',
          title: 'Subscribed!',
          text: 'Thank you for subscribing to our newsletter!',
          
          timer: 2000,
        });
    }
  return (
    <div className="bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Stay Updated with Our Latest Recipes!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Join our newsletter for fresh recipes, cooking tips, and exclusive
          content delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row max-w-md mx-auto gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:flex-1"
            required
          />
          <button type="submit" className="btn btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
