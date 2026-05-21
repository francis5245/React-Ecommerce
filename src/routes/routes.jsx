// src/routes/routes.jsx

// 1. On prend le moteur de React Router
import { createBrowserRouter } from "react-router-dom";

// 2. On utilise des chemins sécurisés avec l'alias @/
import MainLayout from "@/layouts/MainLayout"; 
import Home       from "@/pages/Home";

// 3. On crée le routeur attendu par App.jsx (Note le export const router)
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }
    ]
  }
]);