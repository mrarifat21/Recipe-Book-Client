import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Registration = () => {
  const { createUserWithEmail, createUserWithGmail, setUser, updateUser } =
    use(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //  create user with email and password
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );
    const name = e.target.name.value;
    // const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    // const password = e.target.password.value;

    // console.log({ email, password });
    if (/[A-Z]/.test(password) === false) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return;
    }
    if (/[a-z]/.test(password) === false) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least six characters long.");
      return;
    }
    setErrorMessage("");

    createUserWithEmail(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((error) => {
            setUser(user);
          });

        const userProfile = {
          email,
          ...restFormData,
          creationTime: result.user?.metadata.creationTime,
          lastSignInTime: result.user?.metadata.lastSignInTime,
          uid: result.user.uid,
           provider: "email",
        };
        // console.log( email, password, userProfile);
        fetch(
          "http://localhost:3000/users",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userProfile),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("SignIn successfully!");
            }
            // console.log("after profile save", data);
          });
      })

      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        toast.error(errorCode);
      });
  };

  
  const handelgoogleSignIN = () => {
    createUserWithGmail()
      .then((result) => {
        const user = result.user;
        const userProfile = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          creationTime: user.metadata?.creationTime,
          lastSignInTime: user.metadata?.lastSignInTime,
          uid: user.uid,
          provider: "google",
        };

        // Save Google user to DB
        fetch(
          "http://localhost:3000/users",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userProfile),
          }
        )
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

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

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
