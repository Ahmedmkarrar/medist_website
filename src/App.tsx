import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SolutionsPage from './pages/SolutionsPage';
import ResourcesPage from './pages/ResourcesPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <Routes location={location}>
          <Route path="/"           element={<HomePage />} />
          <Route path="/products"   element={<ProductsPage />} />
          <Route path="/solutions"  element={<SolutionsPage />} />
          <Route path="/resources"  element={<ResourcesPage />} />
          <Route path="/about"      element={<AboutPage />} />
          <Route path="/contact"    element={<ContactPage />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center bg-white pt-[124px]">
      <div className="text-center px-6">
        <p className="text-6xl font-bold text-[#1558a7] mb-3">404</p>
        <h1 className="text-xl font-bold text-[#0f1e35] mb-2">Page not found</h1>
        <p className="text-[#64748b] text-sm mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary px-6 py-2.5 text-sm inline-block">Back to Home</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#1558a7] focus:text-white focus:rounded-lg focus:font-semibold">
        Skip to main content
      </a>
      <Navbar />
      <div className="pt-[124px]">
        <AnimatedRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  );
}
