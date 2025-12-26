
import React from 'react';
import { Cluster } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Zap, BarChart3, Radio } from 'lucide-react';

interface ClusterCardProps {
  cluster: Cluster;
}

const ClusterCard: React.FC<ClusterCardProps> = ({ cluster }) => {
  const navigate = useNavigate();
  const isHighAlpha = cluster.alpha_score && cluster.alpha_score > 85;

  return (
    <motion.div 
      whileTap={{ scale: 0.98, opacity: 0.9 }}
      onClick={() => navigate(`/cluster/${cluster.cluster_id}`)}
      className="mb-4 p-5 rounded-[2rem] bg-muted/20 border border-border/50 hover:border-border transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* High Alpha Background Glow */}
      {isHighAlpha && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-[40px] pointer-events-none" />
      )}

      <div className="flex flex-col gap-4">
        {/* Header: Title and Indicators */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-foreground leading-tight tracking-tight truncate">
                {cluster.title}
              </h3>
              {cluster.signal_count > 0 && (
                <div className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isHighAlpha ? 'bg-indigo-400' : 'bg-blue-400'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isHighAlpha ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-blue-500'}`}></span>
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-muted-foreground/80 leading-relaxed line-clamp-2">
              {cluster.subtitle}
            </p>
          </div>
          
          {isHighAlpha && (
            <div className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              <Zap size={10} className="text-indigo-500 fill-indigo-500" />
              <span className="text-[9px] font-black text-indigo-500 tracking-wider uppercase">Alpha</span>
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-1.5">
          {cluster.sample_markets.slice(0, 3).map((market, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-bold uppercase text-muted-foreground/50 tracking-widest bg-muted/40 px-2.5 py-1 rounded-lg border border-border/30"
            >
              {market}
            </span>
          ))}
        </div>

        {/* Footer Metrics */}
        <div className="pt-4 mt-1 border-t border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] flex items-center gap-1">
                <BarChart3 size={8} /> Volume
              </span>
              <span className="text-[11px] font-bold text-foreground tracking-tight">
                {cluster.volume || 'N/A'}
              </span>
            </div>
            
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] flex items-center gap-1">
                <Radio size={8} /> Signals
              </span>
              <span className="text-[11px] font-bold text-foreground tracking-tight">
                {cluster.signal_count} Detected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end gap-0.5">
               <span className="text-[8px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Rating</span>
               <span className="text-[11px] font-black text-foreground">{cluster.alpha_score || '--'}</span>
             </div>
             <ChevronRight size={14} className="text-muted-foreground/20 group-hover:text-muted-foreground/60 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClusterCard;
