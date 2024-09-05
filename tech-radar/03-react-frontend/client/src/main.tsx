import "normalize.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Providers from "./Providers.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Radar from "./radar/Radar.tsx";
import RadarPage from "./pages/RadarPage.tsx";
import IndexPage from "./pages/IndexPage.tsx";

// import Team from "./routes/team";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <IndexPage />,
      },

      {
        path: "/radar/:id",
        element: <RadarPage />,
      },
    ],

    // loader: rootLoader,
    /*
    children: [
      {
        path: "team",
        element: <Team />,
        loader: teamLoader,
      },
    ],
    */
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
