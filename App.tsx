
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './components/ThemeContext';
import BottomNav from './components/BottomNav';
import Discover from './screens/Discover';
import ClusterView from './screens/ClusterView';
import MarketDetail from './screens/MarketDetail';
import Watchlist from './screens/Watchlist';
import Activity from './screens/Activity';
import Profile from './screens/Profile';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Discover />} />
        <Route path="/cluster/:id" element={<ClusterView />} />
        <Route path="/market/:id" element={<MarketDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen pb-20 max-w-md mx-auto shadow-2xl bg-background text-foreground relative ring-1 ring-border overflow-hidden">
          <AnimatedRoutes />
          <BottomNav />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
