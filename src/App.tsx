import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { Home, SignIn, Tasks, Dashboard, NotFound, AddTasks, TasksEdit } from "./shared/pages";
import { ROUTES } from "./shared/utils";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.tasks,
    element: <Tasks />,
  },
  {
    path: ROUTES.signIn,
    element: <SignIn />,
  },
  {
    path: ROUTES.dashboard,
    element: <Dashboard />,
  },
  {
    path: ROUTES.addTasks,
    element: <AddTasks />,
  },
  {
    path: ROUTES.editTasks,
    element: <TasksEdit />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
