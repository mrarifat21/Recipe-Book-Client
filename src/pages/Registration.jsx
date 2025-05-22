import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const Registration = () => {
  const { createUserWithEmail, createUserWithGmail } = use(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const formData = new FormData(form);
    const newUser = Object.fromEntries(formData.entries());
    console.log(newUser);
    console.log({ email, password });

    createUserWithEmail(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
      // createUserWithGmail===========
   const handelgoogleSignIN = ()=>{

      createUserWithGmail()
      .then(result=>{
        console.log("Google sign-in successful:", result);
      })
      .catch(error=>{
        console.error("Google sign-in error:", error);
      })
   }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md shadow-lg bg-base-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-bordered w-full "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          {/* You can conditionally render validation errors here */}
          <p className="text-xs text-red-500 italic">
            * Password must include uppercase, lowercase, and be at least 6
            characters
          </p>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handelgoogleSignIN}
          className="btn btn-outline w-full flex items-center gap-2 justify-center"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
