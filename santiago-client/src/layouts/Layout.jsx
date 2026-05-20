// components/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Simulated global loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900">
      <NavBar />
      <main className="flex-grow pb-16 pt-20">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-600">
            Loading...
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;