// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout"; 
import Home from "@/pages/Home";
import Promotions from "@/pages/Promotion";
import ErrorPage from "@/pages/ErrorPage";

// On garde ton tableau d'objets bien propre
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", // Correspond à la page d'accueil "/"
        element: <Home />,
      },
      {
        path: "promotions",
        element: <Promotions />,
      },
      // { path: "promotions", element: <Promotions /> }
    ]
  }
]);