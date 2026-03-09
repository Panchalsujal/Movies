import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/Pages/login.jsx";
import Register from "../auth/Pages/register.jsx";
import Home from "../../features/movies/pages/Home.jsx";
import Protected from "../auth/components/Protect.jsx";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
]);
