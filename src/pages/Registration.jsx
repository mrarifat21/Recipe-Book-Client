import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";

const Registration = () => {
  const { createUserWithEmail, createUserWithGmail, setUser, updateUser } =
    use(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //  email register
  const handleSignIn = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    console.log({ email, password });

    //  googer register
    createUserWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            navigate(`${location.state ? location.state : "/"}`);
            toast.success("SignIn successfully!");
          })
          .catch((error) => {
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode);
      });
  };
  // createUserWithGmail===========
  const handelgoogleSignIN = () => {
    createUserWithGmail()
      .then((result) => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("SignIn successfully!");
        console.log("Google sign-in successful:", result);
      })
      .catch((error) => {
        toast.error("Try again");
        console.error("Google sign-in error:", error);
      });
  };

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
