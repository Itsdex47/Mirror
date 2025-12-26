
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, Zap, Activity, Info, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import { CLUSTERS, MARKETS, SIGNALS, RELATIONSHIPS, ACTIVITY_LOG } from '../mockData';
import MarketRow from '../components/MarketRow';
import { getSignalInsight } from '../services/gemini';
import { Tabs } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';

const TABS = ['Compare', 'Signals', 'Activity'];

const ClusterView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Compare');
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [aiInsights, setAiInsights] = useState<Record<string, string>>({});
  const [loadingInsights, setLoadingInsights] = useState(false);

  const cluster = CLUSTERS.find(c => c.cluster_id === id);
  if (!cluster) return <div className="p-8 text-center text-muted-foreground font-bold">Cluster not found</div>;

  const clusterMarkets = MARKETS.filter(m => cluster.market_ids.includes(m.id));
  const clusterSignals = SIGNALS.filter(s => cluster.signal_ids.includes(s.signal_id));
  const clusterRelationships = RELATIONSHIPS.filter(r => cluster.relationship_ids.includes(r.relationship_id));
  const clusterActivity = ACTIVITY_LOG.filter(a => a.cluster_id === id);

  const handleSignalExplain = async (signalId: string) => {
    if (aiInsights[signalId]) return;
    setLoadingInsights(true);
    const signal = SIGNALS.find(s => s.signal_id === signalId);
    if (signal) {
      const insight = await getSignalInsight(signal, clusterMarkets);
      setAiInsights(prev => ({ ...prev, [signalId]: insight }));
    }
    setLoadingInsights(false);
  };

  const relationshipGroups = useMemo(() => {
    return clusterRelationships.map(rel => {
      const markets = clusterMarkets.filter(m => rel.market_ids.includes(m.id));
      return { ...rel, markets };
    });
  }, [clusterRelationships, clusterMarkets]);

  const onTabChange = (newTab: string) => {
    const currentIndex = TABS.indexOf(activeTab);
    const newIndex = TABS.indexOf(newTab);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTab);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    const currentIndex = TABS.indexOf(activeTab);
    
    if (info.offset.x < -threshold && currentIndex < TABS.length - 1) {
      // Swipe Left -> Go Right
      onTabChange(TABS[currentIndex + 1]);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      // Swipe Right -> Go Left
      onTabChange(TABS[currentIndex - 1]);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-50%' : '50%',
      opacity: 0,
    }),
  };

  return (
    <div className="pb-32 min-h-screen bg-background overflow-x-hidden">
      <header className="px-6 pt-12 mb-10 sticky top-0 bg-background/95 backdrop-blur-2xl z-20 pb-4 border-b border-border/10">
        <button onClick={() => navigate(-1)} className="mb-6 p-2 -ml-2 text-foreground active:scale-90 transition-transform">
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-[28px] font-extrabold tracking-tighter leading-tight">{cluster.title}</h1>
          {cluster.alpha_score && cluster.alpha_score > 85 && (
             <div className="px-2 py-0.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
               <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">Alpha</span>
             </div>
          )}
        </div>
        <p className="text-[13px] text-muted-foreground/80 font-medium mb-6 leading-relaxed max-w-[90%]">{cluster.subtitle}</p>
        <Tabs 
          tabs={TABS} 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          className="bg-muted/40 p-1 rounded-2xl"
        />
      </header>

      <motion.div 
        className="px-6"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            {activeTab === 'Compare' && (
              <div className="space-y-12">
                {relationshipGroups.length > 0 ? (
                  relationshipGroups.map((group) => (
                    <div key={group.relationship_id} className="relative">
                      <div className="flex flex-col gap-1 mb-6 px-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${group.type === 'threshold' ? 'bg-amber-500' : 'bg-indigo-500'}`} />
                          <span className="text-[10px] font-black uppercase text-foreground/70 tracking-[0.25em]">{group.type} Relationship</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground/90 leading-snug">{group.description}</p>
                      </div>
                      
                      <div className="space-y-1">
                        {group.markets.map((market, mIdx) => (
                          <div key={market.id} className="relative">
                            {mIdx < group.markets.length - 1 && (
                              <div className="absolute left-4 top-10 bottom-0 w-[1px] bg-gradient-to-b from-border/80 via-border/40 to-transparent z-0" />
                            )}
                            <div className="relative z-10">
                              <MarketRow market={market} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-1">
                    {clusterMarkets.map(market => (
                      <MarketRow key={market.id} market={market} />
                    ))}
                  </div>
                )}

                {clusterMarkets.length === 0 && (
                  <div className="py-24 flex flex-col items-center text-center">
                     <div className="w-16 h-16 bg-muted/30 rounded-[2rem] flex items-center justify-center mb-6">
                       <Info size={24} className="text-muted-foreground/30" />
                     </div>
                     <h3 className="text-base font-bold text-foreground mb-1 uppercase tracking-widest">Nodes Dormant</h3>
                     <p className="text-xs font-medium text-muted-foreground max-w-[200px] leading-relaxed">Comparative data is currently being indexed for this cluster.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Signals' && (
              <div className="space-y-8 pt-2">
                {clusterSignals.length > 0 ? (
                  clusterSignals.map(signal => (
                    <div key={signal.signal_id} className="flex flex-col">
                      <div className="flex items-center justify-between mb-4 px-2">
                         <div className="flex items-center gap-2">
                           <div className={`p-1.5 rounded-lg ${
                              signal.severity === 'high' ? 'bg-red-500/10 text-red-500' : 
                              signal.severity === 'med' ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-500'
                           }`}>
                             <AlertTriangle size={14} />
                           </div>
                           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{signal.type.replace(/_/g, ' ')}</span>
                         </div>
                         <span className={`text-[9px] font-black uppercase tracking-widest ${
                           signal.severity === 'high' ? 'text-red-500' : 'text-muted-foreground/60'
                         }`}>{signal.severity} priority</span>
                      </div>

                      <div className="p-8 rounded-[2.5rem] bg-muted/10 border border-border/40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.02] blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />
                        
                        <h3 className="text-xl font-bold leading-tight tracking-tight mb-8 pr-2 text-foreground/90">{signal.explanation}</h3>
                        
                        <AnimatePresence>
                          {aiInsights[signal.signal_id] && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-6 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-3xl text-[13px] font-medium text-muted-foreground leading-relaxed mb-8 shadow-inner"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <Sparkles size={14} className="text-indigo-500" />
                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Mirror Intelligence</span>
                              </div>
                              {aiInsights[signal.signal_id]}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <div className="flex flex-col gap-3">
                          {!aiInsights[signal.signal_id] && (
                            <Button 
                              variant="secondary"
                              onClick={() => handleSignalExplain(signal.signal_id)}
                              disabled={loadingInsights}
                              className="w-full h-14 rounded-2xl bg-muted/50 border border-border/50 text-[11px] font-black uppercase tracking-widest hover:bg-muted transition-all"
                            >
                              {loadingInsights ? 'Analyzing Node...' : 'Request AI Deep-Dive'}
                            </Button>
                          )}
                          <Button 
                            className="w-full h-14 rounded-2xl bg-foreground text-background font-bold text-[11px] uppercase tracking-wider"
                            onClick={() => navigate(`/market/${signal.related_market_ids[0]}`)}
                          >
                            Capitalize on Inconsistency
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-24 text-center">
                     <div className="w-16 h-16 bg-muted/30 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                       <ShieldCheck size={28} className="text-muted-foreground/20" />
                     </div>
                     <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-2">Market Parity</h4>
                     <p className="text-xs font-medium text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
                       Probabilities are currently balanced across reporting venues.
                     </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Activity' && (
              <div className="space-y-0 pt-2 relative">
                <div className="absolute left-[21px] top-6 bottom-0 w-[1px] bg-gradient-to-b from-border via-border/40 to-transparent" />

                <div className="flex items-center justify-between mb-8 px-2 relative z-10">
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                    <Activity size={12} className="text-indigo-500" /> Cluster Heartbeat
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/5 rounded-full border border-green-500/10">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Stable</span>
                  </div>
                </div>

                <div className="space-y-10">
                  {clusterActivity.length > 0 ? (
                    clusterActivity.map((log, idx) => (
                      <div key={log.id} className="flex gap-6 items-start relative z-10">
                        <div className={`mt-1.5 w-3 h-3 rounded-full shrink-0 border-2 border-background shadow-sm ${
                          log.type === 'signal' ? 'bg-indigo-500 shadow-indigo-500/20' : 
                          log.type === 'alert' ? 'bg-amber-500 shadow-amber-500/20' : 'bg-muted-foreground shadow-muted/20'
                        }`} />
                        <div className="flex-1 pb-2">
                          <div className="flex items-baseline justify-between gap-4 mb-2">
                            <h4 className="text-[13px] font-bold text-foreground tracking-tight">{log.title}</h4>
                            <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest whitespace-nowrap">{log.timestamp}</span>
                          </div>
                          <p className="text-[13px] font-medium text-muted-foreground leading-relaxed pr-4">{log.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ml-12 p-8 text-center bg-muted/10 rounded-[2.5rem] border border-dashed border-border/60">
                      <p className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Silence across the network</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-16 ml-12 p-8 bg-muted/10 border border-border/40 rounded-[2.5rem] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] blur-2xl" />
                   <h5 className="text-[10px] font-black text-foreground uppercase tracking-[0.3em] mb-4">Node Observations</h5>
                   <p className="text-[13px] font-medium text-muted-foreground leading-relaxed mb-8">
                     Predictive models show high confidence in current pricing structures. Liquidity remains robust at {cluster.volume}.
                   </p>
                   <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-border hover:bg-muted transition-all">
                     Export Historical Feed
                   </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ClusterView;
