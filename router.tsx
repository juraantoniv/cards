import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
  Outlet,
  Navigate,
} from "react-router-dom";

import Cards from "./src/common/cards/cards.tsx";
import { LoginForm } from "./src/components/ui/auth/login-form/login-from.tsx";
import { createDecks } from "./src/components/ui/createDecks";
import MainLayout from "./src/components/ui/layout/MainLayout.tsx";
import { Login } from "./src/components/ui/login";
import { Register } from "./src/components/ui/register";
import Deks from "./src/Pages/Decks/Deks.tsx";
import ProfilePage from "./src/Pages/ProfilePage/ProfilePage.tsx";
import UserRegisterForm, { userRegisterForm } from "./src/userRegisterForm.tsx";

// const publicRoutes: RouteObject[] = [
//   {
//     path: "/login",
//     element: <LoginForm />,
//   },
// ];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Deks />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: ":id",
    element: <Cards />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
