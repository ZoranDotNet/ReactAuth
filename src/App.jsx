import { Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import UserDashBoard from "./pages/UserDashBoard";
import ProtectedUserRoutes from "./components/ProtectedUserRoutes";
import Login from "./pages/Login";
import ProtectedAdminRoutes from "./components/ProtectedAdminRoutes";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./components/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import Register from "./pages/Register";
import AdminProducts from "./features/products/AdminProducts";
import EditProduct from "./features/products/EditProduct";
import Users from "./features/users/Users";
import PersistLogin from "./components/PersistLogin";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 1000,
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider
        clientId={
          "202462682691-3tjsvfaq27mql06cu1s6k8o792sedcgt.apps.googleusercontent.com"
        }
      >
        <Provider store={store}>
          <header>
            <Navbar />
          </header>
          <main
            className="flex flex-col items-center gap-6"
            style={{ minHeight: "Calc(100vh - 53px)" }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route element={<PersistLogin />}>
                <Route path="/user" element={<ProtectedUserRoutes />}>
                  <Route path="dashboard" element={<UserDashBoard />} />
                </Route>
                <Route path="/admin" element={<ProtectedAdminRoutes />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="product/:id" element={<EditProduct />} />
                  <Route path="users" element={<Users />} />
                </Route>
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="not-authorized" element={<NotAuthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster
            richColors
            position="top-right"
            closeButton
            toastOptions={{
              duration: 3000,
            }}
          />
        </Provider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
