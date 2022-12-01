import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { MessageSystem } from "./pages/MessageSystem";
import { SetName } from "./pages/SetName";
import { UserContextProvider } from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/setName",
    element: <SetName />,
  },
  {
    path: "/",
    element: <MessageSystem />,
  },
]);
function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
