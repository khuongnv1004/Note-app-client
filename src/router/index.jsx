import { createBrowserRouter, Outlet } from "react-router-dom";
import Note from "../components/Note";
import NoteList from "../components/NoteList";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/home",
            loader: async () => {
                const query = `query Folders {
                  folders{
                    id
                    name
                    createdAt
                  }
                }`;
                const res = await fetch('http://localhost:3051/graphql',{
                  method:'POST',
                  headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                  },
                  body: JSON.stringify({query})
                })
                const data  = await res.json()
                console.log({data});
                return data;
            },
            children: [
              {
                element: <NoteList />,
                path: "folders/:folderId",
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                  },
                ],
              },
            ],
          },
        ],
        // element: <Home />,
        // path: "/",
      },
    ],
  },
]);
