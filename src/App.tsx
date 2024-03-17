import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { NextUIProvider } from "@nextui-org/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="385853328082-uvnh7ohdpdsoj7lk9c4e3jetkb1s8mim.apps.googleusercontent.com">
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </NextUIProvider>
  );
}
