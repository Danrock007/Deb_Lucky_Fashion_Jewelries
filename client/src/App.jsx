import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroOverlay from "./components/IntroOverlay";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AccountVerification from "./pages/AccountVerification";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CartProvider>
      <BrowserRouter>
        {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account/verify" element={<AccountVerification />} />
        </Routes>
        <Footer />
        <CartDrawer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;