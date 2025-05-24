import { Link } from "react-router";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md shadow-lg bg-base-100 p-8 rounded-xl border border-gray-300 dark:border-primary">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600 dark:text-indigo-400">
          Forgot Password
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              className="input input-bordered w-full rounded-md border-indigo-300 focus:outline-indigo-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <Link to="/login" className="link font-medium">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
