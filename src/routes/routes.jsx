// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout"; 
import Home from "@/pages/Home";
import Promotions from "@/pages/Promotion";
import ErrorPage from "@/pages/ErrorPage";
import Panier from "@/pages/Panier";

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
      { path: "panier",    element: <Panier /> },

      {
        path: "promotions",
        element: <Promotions />,
      },
      
    ]
  }
]);