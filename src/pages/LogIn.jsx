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
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("SignIn successfully!");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
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

        // Save Google user to DB
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
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((err) => {
            console.error("DB save failed:", err);
            toast.error("Something went wrong saving user!");
          });

        // console.log("Google sign-in successful:", result);
      })
      .catch((error) => {
        toast.error("Try again");
        console.error("Google sign-in error:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md shadow-lg bg-base-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-bordered w-full"
            required
          />

          <div className="text-right">
            <button type="button" className="link text-sm">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/registration" className="link font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
