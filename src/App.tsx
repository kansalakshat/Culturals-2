import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ClubShowcase } from "./pages/ClubShowcase";
import { Events } from "./pages/Events";
import { Gallery } from "./pages/Gallery";
import { Contact } from "./pages/Contact";
import { Placeholder } from "./pages/Placeholder";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<ClubShowcase type="club" />} />
          <Route path="/societies" element={<ClubShowcase type="society" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Placeholder title="Not Found" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
