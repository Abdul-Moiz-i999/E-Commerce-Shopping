import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
