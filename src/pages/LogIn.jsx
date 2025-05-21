import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md shadow-lg bg-base-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
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

        <button className="btn btn-outline w-full flex items-center gap-2">
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
