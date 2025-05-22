import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import LogIn from "../pages/LogIn";
import AddRecipe from "../pages/addRecipe";
import AllRecipes from "../pages/AllRecipes";
import DetailsRecipe from "../pages/DetailsRecipe";
import PrivateRoute from "../context/PrivateRoute";

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
        element: <PrivateRoute>
          <AddRecipe></AddRecipe>
        </PrivateRoute>
      },
      {
        path: "allrecipes",
        loader: () => fetch("http://localhost:3000/addrecipes"),
        element: <PrivateRoute>
          <AllRecipes></AllRecipes>
        </PrivateRoute>
      },
      {
        path: "recipes/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/addrecipes/${params.id}`),
        element: <PrivateRoute>
          <DetailsRecipe></DetailsRecipe>
        </PrivateRoute>,
      },
    ],
  },
]);
