import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";

import Cards from "../common/cards/cards.tsx";
import { CheckEmail } from "../components/ui/checkEmail";
import { EditProfile } from "../components/ui/editProfile";
import { ForgotYourPassword } from "../components/ui/forgotYourPassword";
import { Login } from "../components/ui/login";
import { Register } from "../components/ui/register";
import RatePage from "../Pages/answerPage/ratePage.tsx";
import Decks from "../Pages/Decks/Decks.tsx";
import MainLayout from "../Pages/layout/MainLayout.tsx";
import LearnPage from "../Pages/learnPage/learnPage.tsx";
import ProfilePage from "../Pages/ProfilePage/ProfilePage.tsx";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Decks />,
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
  {
    path: "/forgotYourPassword",
    element: <ForgotYourPassword />,
  },
  {
    path: "/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/checkEmail",
    element: <CheckEmail />,
  },
  {
    path: "/learn",
    element: <LearnPage />,
  },
  {
    path: "/rate",
    element: <RatePage />,
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
