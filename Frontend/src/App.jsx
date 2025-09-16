import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./Pages/Welcome/Welcome";
import Authentication from "./Pages/Authentication/Authentication";
import FilesShare from "./Pages/FilesShare/Chat/FilesShare";
import Group from "./Pages/FilesShare/Group/FilesShare";
import Creating from "./Pages/Creating/Creating";
import AddMember from "./Pages/AddMember/AddMember";

export default function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Welcome />
    },
    {
      path: "/authentication",
      element: <Authentication />
    },
    {
      path: "/filesshare/chat",
      element: <FilesShare />
      // component: Contact
    },
    {
      path: "/filesshare/group",
      element: <Group />
    },
    {
      path: "/create",
      element: <Creating />
    },
    {
      path: "filesshare/add/:id",
      element: <AddMember />
    },
    {
      path: "*",
      element: <Authentication />
    }
  ]);
  return (
    <div>
      <RouterProvider router={route} />
    </div>
  );
}
