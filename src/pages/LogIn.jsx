import { use } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const LogIn = () => {
  const { LogIn, createUserWithGmail } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    LogIn(email, password)
      .then(() => {
        navigate(location.state || "/");
        toast.success("SignIn successfully!");
      })
      .catch(() => {
        toast.error("User not found");
      });
  };

  const handleGoogleLogin = () => {
    createUserWithGmail()
      .then((result) => {
        const user = result.user;
        const userProfile = {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
          uid: user.uid,
          provider: "google",
        };

        fetch("https://recipe-book-server-tau.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("SignIn successfully!");
            } else {
              toast.info("Signed in with Google.");
            }
            navigate(location.state || "/");
          })
          .catch((err) => {
            console.error("DB save failed:", err);
            toast.error("Something went wrong saving user!");
          });
      })
      .catch((error) => {
        toast.error("Try again");
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-primary p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400">
          Login
        </h2>

        <form onSubmit={handleLogIn} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
              className="input input-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              className="input input-bordered w-full rounded-md border-indigo-300 focus:border-none focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to='/forgotPassowrd'> 
            <button type="button" className="link text-sm text-indigo-600 dark:text-indigo-400">
              Forgot Password?
            </button>
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-sm text-center mt-6 text-gray-700 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/registration" className="link font-medium text-indigo-600 dark:text-indigo-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
