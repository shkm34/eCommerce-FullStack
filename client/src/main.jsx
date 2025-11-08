import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ToasterComponent from "./components/common/Toaster.jsx";
import { CartProvider } from "./context/CartContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
        <ToasterComponent />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
