import { createBrowserRouter, RouterProvider } from "react-router-dom";


import "./App.css";

import { Home, SignIn, Profile, Dashboard, NotFound, AddTasks, TasksEdit, SignUp } from "./shared/pages";
import { ROUTES } from "./shared/utils";
import { ProtectedRoute } from "./shared/routes";
import { AuthProvider } from "./shared/providers";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.profile,
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
  {
    path: ROUTES.signIn,
    element: <SignIn />,
  },
  {
    path: ROUTES.signUp,
    element: <SignUp />,
  },
  {
    path: ROUTES.dashboard,
    element:
      <ProtectedRoute>
        <Dashboard />,
      </ProtectedRoute>
  },
  {
    path: ROUTES.addTasks,
    element: <ProtectedRoute><AddTasks /></ProtectedRoute>,
  },
  {
    path: ROUTES.editTasks,
    element: <ProtectedRoute><TasksEdit /></ProtectedRoute>,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  )
}

export default App;
