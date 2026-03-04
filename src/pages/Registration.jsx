import { use, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";

const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_Image_Upload_Key
}`;
const Registration = () => {
  const { createUserWithEmail, createUserWithGmail, setUser, updateUser } =
    use(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const imageFile = form.image.files[0];

    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least six characters long.");
      return;
    }
    setErrorMessage("");

    // Common user creation function
    const createUser = (photoURL) => {
      createUserWithEmail(email, password)
        .then((result) => {
          const user = result.user;

          updateUser({ displayName: name, ...(photoURL && { photoURL }) })
            .then(() => {
              setUser({ ...user, displayName: name, photoURL });
              navigate(location.state || "/");
            })
            .catch(() => {
              setUser(user);
            });

          const userProfile = {
            email,
            name,
            photoURL,
            creationTime: result.user?.metadata.creationTime,
            lastSignInTime: result.user?.metadata.lastSignInTime,
            uid: result.user.uid,
            provider: "email",
          };

          fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
              }
            });
        })
        .catch((error) => {
          toast.error(error.code);
        });
    };
    // If image exists → upload first
    if (imageFile) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      fetch(imageUploadUrl, {
        method: "POST",
        body: imageFormData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            const photoURL = imgData.data.display_url;
            createUser(photoURL);
          } else {
            toast.error("Image upload failed!");
          }
        })
        .catch(() => {
          toast.error("Image upload failed!");
        });
    } else {
      // No image uploaded → create user without photo
      createUser("");
    }
  };

  const handelgoogleSignIN = () => {
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

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className=" max-w-md w-11/12 mx-auto shadow-lg  dark:bg-gray-900 p-8 rounded-xl border border-gray-300 dark:border-primary">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Register
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full rounded-md border-indigo-300 focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full rounded-md border-indigo-300 focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Upload Photo
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>

            <PasswordInput
              id="password"
              name="password"
              placeholder="Your Password"
              required
              className="rounded-md border-indigo-300 focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
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

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-400">
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
