// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout"; 
import Home from "@/pages/Home";
import Promotions from "@/pages/Promotion";
import ErrorPage from "@/pages/ErrorPage";
import Panier from "@/pages/Panier";
import Produit from "@/pages/Produit";
import Wishlist from "@/pages/Wishlist";
import Recherche from "@/pages/Recherche";
import Categorie from "@/pages/Categorie";
import Checkout from "@/pages/Checkout";

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
      { path: "produit/:id", element: <Produit /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "recherche", element: <Recherche /> },
      { path: "categorie/:slug", element: <Categorie /> },
      { path: "checkout", element: <Checkout /> },
      {
        path: "promotions",
        element: <Promotions />,
      },
      
    ]
  }
]);