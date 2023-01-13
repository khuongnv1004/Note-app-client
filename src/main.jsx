import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container } from "@mui/system";

import './firebase/config'

ReactDOM.createRoot(document.getElementById("root")).render(
    <Container>
      <RouterProvider router={router} />
    </Container>
);
