
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BellRing, Sparkles } from 'lucide-react';
import { CLUSTERS, MARKETS } from '../mockData';
import ClusterCard from '../components/ClusterCard';
import MarketRow from '../components/MarketRow';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';

const Watchlist: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Clusters');

  const watchedClusters = CLUSTERS.slice(0, 2);
  const watchedMarkets = MARKETS.slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-5 pt-8"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter text-foreground">Watchlist</h1>
        <p className="text-muted-foreground text-sm font-medium mt-1">High-conviction market monitoring.</p>
      </header>

      <Tabs 
        tabs={['Clusters', 'Markets']} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        className="mb-8"
      />

      <section className="min-h-[40vh]">
        <AnimatePresence mode="wait">
          {activeTab === 'Clusters' ? (
            <motion.div 
              key="clusters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {watchedClusters.map(cluster => (
                <ClusterCard key={cluster.cluster_id} cluster={cluster} />
              ))}
              <button className="w-full py-6 border-2 border-dashed border-border rounded-[2rem] text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all flex flex-col items-center justify-center gap-2 group">
                <Plus size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Discover More Clusters</span>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="markets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-muted/20 border border-border rounded-[2.5rem] p-6"
            >
              {watchedMarkets.map(market => (
                <MarketRow key={market.id} market={market} />
              ))}
              <Button 
                variant="ghost"
                className="w-full mt-4 h-12 text-[10px] font-black uppercase tracking-widest"
              >
                <Plus size={14} className="mr-2" /> Add Direct Market
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="mt-12">
        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={80} />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-indigo-500/10 rounded-2xl">
              <BellRing size={18} className="text-indigo-500" />
            </div>
            <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em]">Edge Alerts</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6 font-medium leading-relaxed">
            Mirror surfaces price inconsistencies automatically. Enable alerts to never miss a cross-venue divergence.
          </p>
          <Button 
            className="w-full bg-indigo-500 text-white hover:bg-indigo-600 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20"
          >
            Configure Alert Engine
          </Button>
        </div>
      </section>
    </motion.div>
  );
};

export default Watchlist;
