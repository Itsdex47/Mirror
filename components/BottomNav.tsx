
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Compass, Bookmark, Zap, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Discover', Icon: Compass, path: '/' },
    { label: 'Watchlist', Icon: Bookmark, path: '/watchlist' },
    { label: 'Activity', Icon: Zap, path: '/activity' },
    { label: 'Profile', Icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-background/95 backdrop-blur-xl border-t border-border/40 safe-bottom z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <div
                className={cn(
                  "p-2 transition-all duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground/50"
                )}
              >
                <item.Icon size={20} strokeWidth={isActive ? 2.2 : 1.5} />
              </div>
              <span className={cn(
                "text-[9px] font-bold transition-opacity duration-300 tracking-tight",
                isActive ? "opacity-100" : "opacity-0"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
