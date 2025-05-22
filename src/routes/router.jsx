import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import LogIn from "../pages/LogIn";
import AddRecipe from "../pages/addRecipe";
import AllRecipes from "../pages/AllRecipes";
import DetailsRecipe from "../pages/DetailsRecipe";
import PrivateRoute from "../context/PrivateRoute";
import MyRecipe from "../pages/MyRecipe";
import ErrorPage from "../pages/ErrorPage";

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
        path: "addrecipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "allrecipes",
        loader: () => fetch("https://recipe-book-server-tau.vercel.app/addrecipes"),
        Component: AllRecipes
      },
      {
        path: "recipes/:id",
        loader: ({ params }) =>
          fetch(`https://recipe-book-server-tau.vercel.app/${params.id}`),
        element: (
          <PrivateRoute>
            <DetailsRecipe></DetailsRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "myrecipes",
        element: (
          <PrivateRoute>
            <MyRecipe></MyRecipe>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
