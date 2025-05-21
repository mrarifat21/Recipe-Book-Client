import { createBrowserRouter } from "react-router";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import LogIn from "../pages/LogIn";
import AddRecipe from "../pages/addRecipe";




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
        path: 'registration',
        Component: Registration
      },
      {
        path: 'login',
        Component: LogIn
      },
      {
        path: 'addrecipe',
        Component: AddRecipe
      },
      
    ],
  },
]);