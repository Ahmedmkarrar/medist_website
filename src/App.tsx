import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const pageTransition = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.4, ease: 'easeOut' as const } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' as const } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/"        element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about"   element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-[#F7F9FC]">
      <div className="text-center px-6">
        <p className="text-8xl font-bold gradient-text-teal mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>404</p>
        <h1 className="text-2xl font-bold text-[#0D1F3C] mb-3">Page not found</h1>
        <p className="text-[#8A9BB0] mb-8">The page you're looking for doesn't exist.</p>
        <a href="/"
          className="btn-teal inline-block px-7 py-3 text-white font-semibold rounded-full">
          Back to Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0A8C7A] focus:text-white focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <WhatsAppFloat />
    </BrowserRouter>
  );
}
