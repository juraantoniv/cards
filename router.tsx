import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";

import Cards from "./src/common/cards/cards.tsx";
import { CheckEmail } from "./src/components/ui/checkEmail";
import { EditProfile } from "./src/components/ui/editProfile";
import { ForgotYourPassword } from "./src/components/ui/forgotYourPassword";
import MainLayout from "./src/components/ui/layout/MainLayout.tsx";
import { Login } from "./src/components/ui/login";
import { Register } from "./src/components/ui/register";
import RatePage from "./src/Pages/answerPage/ratePage.tsx";
import Deks from "./src/Pages/Decks/Deks.tsx";
import LearnPage from "./src/Pages/learnPage/learnPage.tsx";
import ProfilePage from "./src/Pages/ProfilePage/ProfilePage.tsx";

const privateRoutes: RouteObject[] = [
  {
    path: "",
    element: <Deks />,
  },
  {
    path: "/decks",
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
    path: "decks/:id",
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
