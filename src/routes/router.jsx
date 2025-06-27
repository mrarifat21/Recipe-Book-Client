import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home/Home";
import Registration from "../pages/Registration";
import LogIn from "../pages/LogIn";
import AddRecipe from "../pages/addRecipe";
import AllRecipes from "../pages/AllRecipes";
import DetailsRecipe from "../pages/DetailsRecipe";
import PrivateRoute from "../context/PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../components/ForgotPassord";
import ChefProfile from "../pages/Home/ChefProfile";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../layouts/Dashboard";
import MyRecipes from "../pages/MyRecipe";
import DashboardHome from "../pages/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "registration",
        Component: Registration,
      },
      {
        path: "login",
        Component: LogIn,
      },
      {
        path: "forgotPassword",
        Component: ForgotPassword,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },

      {
        path: "allrecipes",
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/addrecipes`),
        Component: AllRecipes,
      },
      {
        path: "recipes/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/addrecipes/${params.id}`),
        element: (
          <PrivateRoute>
            <DetailsRecipe></DetailsRecipe>
          </PrivateRoute>
        ),
      },

      {
        path: "/chefs/:id",
        Component: ChefProfile,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "myrecipes",
        Component: MyRecipes,
      },
      {
        path: "addrecipe",
        Component: AddRecipe,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
