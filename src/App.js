import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsPage from "./pages/Products/ProductsPage";
import LoginPage from "./pages/Login/LoginPage";
import { SnackbarProvider } from "notistack";
import { loader as infoBoardLoader } from "./pages/Dashboard/Dashboard";
import { loader as productDetailsLoader } from "./pages/UpdateProduct/UpdateProductPage";
import CreateProductPage from "./pages/CreateProduct/CreateProductPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import UpdateProductPage from "./pages/UpdateProduct/UpdateProductPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "dashboard", element: <Dashboard />, loader: infoBoardLoader },
      { path: "products", element: <ProductsPage /> },
      {
        path: "products/create",
        element: <CreateProductPage />,
      },
      {
        path: "products/update/:productId",
        element: <UpdateProductPage />,
        loader: productDetailsLoader,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return (
    <SnackbarProvider>
      <RouterProvider router={routes} />
    </SnackbarProvider>
  );
}

export default App;
