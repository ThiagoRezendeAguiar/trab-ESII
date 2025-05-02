import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import ProfileConfirmation from "./pages/ProfileConfirmation/ProfileConfirmation";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import { AuthProvider, useAuth } from "./hooks/useAuth";
import { JSX, useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth !== null) {
      setIsLoading(false);
    }
  }, [auth]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth !== null) {
      setIsLoading(false);
    }
  }, [auth]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (auth && auth.token) {
    return <Navigate to="/" />;
  }

  return children;
};

function AppRoutes() {
  const auth = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (auth !== null) {
      setIsAppReady(true);
    }
  }, [auth]);

  if (!isAppReady) {
    return <div>Carregando aplicação...</div>;
  }

  return (
    <Routes>
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/confirmation"
        element={
          <ProtectedRoute>
            <ProfileConfirmation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
