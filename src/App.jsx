import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import Server from './pages/Server';
import Storage from './pages/Storage';
import HCI from './pages/HCI';
import Backup from './pages/Backup';
import Vision from './pages/Vision';
import History from './pages/History';
import Contact from './pages/Contact';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import AdminLogin from './pages/AdminLogin';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load admin components to prevent dependency issues affecting the main site
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AdminEditor = React.lazy(() => import('./pages/AdminEditor'));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/server" element={<Server />} />
              <Route path="products/storage" element={<Storage />} />
              <Route path="products/hci" element={<HCI />} />
              <Route path="products/backup" element={<Backup />} />
              <Route path="vision" element={<Vision />} />
              <Route path="history" element={<History />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/news/new" element={<AdminEditor />} />
            <Route path="/admin/news/edit/:id" element={<AdminEditor />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;
