import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./features/routes/app.routes.jsx";
import { AuthProvider } from "../src/features/auth/Context/auth.context.jsx";
import "./shared/index.scss";
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
