
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import { Sun, Moon, Shield, Key, Bell, Info, LogOut, Settings } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Profile: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-5 pt-12"
    >
      <header className="flex flex-col items-center mb-12">
        <div className="relative">
          <div className="w-28 h-28 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-4xl font-black text-white">JT</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="absolute -bottom-2 -right-2 p-3 bg-background border border-border rounded-2xl shadow-xl text-foreground active:scale-90 transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <h1 className="text-2xl font-black tracking-tighter">John Trader</h1>
        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Founding Member</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-muted/30 border border-border p-5 rounded-[2rem]">
          <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Signals Caught</div>
          <div className="text-3xl font-black text-foreground">112</div>
        </div>
        <div className="bg-muted/30 border border-border p-5 rounded-[2rem]">
          <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Win Rate</div>
          <div className="text-3xl font-black text-indigo-500">64%</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Settings size={14} className="text-muted-foreground" />
          <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Preferences</h2>
        </div>
        
        <div className="bg-muted/20 rounded-[2rem] overflow-hidden border border-border/50 divide-y divide-border/50">
          {[
            { label: 'Push Notifications', icon: Bell },
            { label: 'API Integrations', icon: Key },
            { label: 'Privacy & Security', icon: Shield },
            { label: 'Mirror Handbook', icon: Info },
          ].map((item) => (
            <button 
              key={item.label}
              className="w-full flex items-center justify-between p-5 active:bg-accent transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} className="text-muted-foreground" />
                <span className="text-sm font-bold text-foreground">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-muted-foreground/40" />
            </button>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost"
        className="w-full mt-10 text-red-500 hover:bg-red-500/10 hover:text-red-600 rounded-2xl"
      >
        <LogOut size={16} className="mr-2" />
        <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
      </Button>
    </motion.div>
  );
};

// Helper internal icon component
const ChevronRight = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Profile;
