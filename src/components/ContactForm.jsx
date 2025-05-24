import React from "react";
import Swal from "sweetalert2";

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for contacting us. We will get back to you soon!",
      timer: 2000,
      showConfirmButton: false,
    });

    form.reset();
  };

  return (
    <section className="min-h-screen  flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-base-100 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-base-content">
          Contact Us
        </h2>
        <p className="mt-2 text-center text-sm text-base-content/70">
          Have a question or feedback? We'd love to hear from you!
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your Name"
            className="input input-bordered w-full"
          />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email Address"
            className="input input-bordered w-full"
          />
          <textarea
            id="message"
            name="message"
            rows="4"
            required
            placeholder="Your Message"
            className="textarea textarea-bordered w-full"
          ></textarea>
          <button type="submit" className="btn btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
