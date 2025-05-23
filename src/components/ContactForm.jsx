import React from "react";
import Swal from "sweetalert2";

const ContactForm = () => {
  const handleSubmit = async (e) => {
    const form = e.target
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon!",
      timer: 2000,
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Contact Us
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Have a question or feedback? We'd love to hear from you!
        </p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input input-bordered w-full placeholder-gray-400"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input input-bordered w-full placeholder-gray-400"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="textarea textarea-bordered w-full placeholder-gray-400"
              placeholder="Your Message"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
