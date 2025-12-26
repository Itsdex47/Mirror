
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("flex bg-muted p-1 rounded-xl relative", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex-1 py-1.5 text-[11px] font-bold tracking-tight relative z-10 transition-colors duration-200",
              isActive ? "text-foreground" : "text-muted-foreground/60"
            )}
          >
            {tab}
            {isActive && (
              <motion.div
                layoutId="tab-highlight"
                className="absolute inset-0 bg-background rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.08)]"
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                style={{ zIndex: -1 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
