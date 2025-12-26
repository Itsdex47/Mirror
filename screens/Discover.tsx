
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Radar, Zap, Loader2, Sun, Moon, Target } from 'lucide-react';
import ClusterCard from '../components/ClusterCard';
import { CLUSTERS } from '../mockData';
import { Cluster } from '../types';
import { useTheme } from '../components/ThemeContext';

const Discover: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [activeClusters, setActiveClusters] = useState<Cluster[]>(CLUSTERS);
  const [scanStatus, setScanStatus] = useState('');
  const [foundCount, setFoundCount] = useState(0);

  const scanSteps = [
    "Fetching cross-venue liquidity...",
    "Analyzing implied probabilities...",
    "Detecting divergence spikes...",
    "Calculating alpha scores...",
    "Finalizing market clusters..."
  ];

  const filteredClusters = useMemo(() => {
    return activeClusters.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      c.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activeClusters]);

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setFoundCount(0);
    
    // Cycle through status messages and "find" items
    let step = 0;
    const interval = setInterval(() => {
      if (step < scanSteps.length) {
        setScanStatus(scanSteps[step]);
        setFoundCount(prev => prev + Math.floor(Math.random() * 3) + 1);
        step++;
      }
    }, 600);

    // After scanning finish
    setTimeout(() => {
      clearInterval(interval);
      // Sort by Alpha Score (descending)
      const sorted = [...CLUSTERS].sort((a, b) => (b.alpha_score || 0) - (a.alpha_score || 0));
      setActiveClusters(sorted);
      setIsScanning(false);
      setScanStatus('');
    }, 3200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 px-5 pt-12 relative min-h-screen"
    >
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-[32px] font-extrabold tracking-tighter text-foreground">Mirror</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-muted text-foreground transition-all active:scale-90"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} strokeWidth={2.2} /> : <Moon size={18} strokeWidth={2.2} />}
            </button>
            <button 
              onClick={handleScan}
              disabled={isScanning}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 relative overflow-hidden ${
                isScanning ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-muted text-foreground'
              }`}
              aria-label="Scan network"
            >
              {isScanning ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Radar size={18} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <Radar size={18} strokeWidth={2.2} />
              )}
              
              {isScanning && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-indigo-500 rounded-full"
                />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="relative mb-10">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground/30" />
        </div>
        <input 
          type="text" 
          placeholder="Search markets or topics" 
          className="w-full bg-transparent border-b border-border/60 py-4 pl-8 pr-4 text-base font-medium focus:outline-none focus:border-foreground transition-all placeholder:text-muted-foreground/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="relative">
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.3em]">
            {isScanning ? 'Deep Scanning...' : 'Optimized Clusters'}
          </h2>
          {!isScanning && activeClusters[0]?.cluster_id === 'c3' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/5 rounded-full border border-indigo-500/10"
            >
              <Target size={10} className="text-indigo-500" />
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Arb Ranked</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {filteredClusters.length > 0 ? (
              filteredClusters.map((cluster, index) => (
                <motion.div
                  key={cluster.cluster_id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    delay: isScanning ? 0 : index * 0.04,
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35
                  }}
                >
                  <ClusterCard cluster={cluster} />
                </motion.div>
              ))
            ) : (
              <div className="py-24 text-center">
                <p className="text-muted-foreground font-semibold text-sm">No clusters match your criteria</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Full-screen scanning overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-3xl pointer-events-none"
          >
            <div className="relative w-64 h-64 mb-10 flex items-center justify-center">
              {/* Pulsing rings */}
              {[1, 1.3, 1.6].map((scale, i) => (
                <motion.div 
                  key={i}
                  className="absolute inset-0 border border-indigo-500/10 rounded-full"
                  animate={{ scale: [1, scale, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
              
              {/* Rotating radar sweep */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              <div className="p-10 bg-indigo-500/5 rounded-full border border-indigo-500/10 shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                <Radar className="text-indigo-500 w-16 h-16" strokeWidth={2.5} />
              </div>

              {/* Finding dots */}
              <AnimatePresence>
                {[...Array(foundCount % 6)].map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col items-center gap-6 px-10 text-center">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-indigo-500/5 rounded-full border border-indigo-500/10 backdrop-blur-md">
                <Loader2 size={16} className="text-indigo-500 animate-spin" />
                <span className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.3em]">Surfacing Edge Signals</span>
              </div>
              
              <div className="h-16 flex flex-col items-center justify-center">
                <motion.p 
                  key={scanStatus}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-bold text-foreground tracking-tight mb-1"
                >
                  {scanStatus}
                </motion.p>
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                   {foundCount} Inconsistencies Indexed
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Discover;
