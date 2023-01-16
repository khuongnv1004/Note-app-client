import { createBrowserRouter, Outlet } from "react-router-dom";
import Note from "../components/Note";
import NoteList from "../components/NoteList";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { folderLoader } from "../utils/folderUtils";
import { addNewNote, noteLoader, notesLoader, updateNote } from "../utils/noteUltils";
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
            path: "/",
            loader: folderLoader,
            children: [
              {
                element: <NoteList />,
                path: "folders/:folderId",
                action:addNewNote,
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    action:updateNote,
                    loader: noteLoader,
                    path: `note/:noteId`
                    
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
