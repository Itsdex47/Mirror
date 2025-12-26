
import React from 'react';
import { Market } from '../types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MarketRowProps {
  market: Market;
}

const MarketRow: React.FC<MarketRowProps> = ({ market }) => {
  const navigate = useNavigate();
  const isUp = market.price_change_24h > 0;

  const getStatusDisplay = (status: Market['status']) => {
    switch (status) {
      case 'open':
        return { label: 'Active', className: 'text-indigo-500' };
      case 'closed':
        return { label: 'Locked', className: 'text-muted-foreground/40' };
      case 'resolved':
        return { label: 'Settled', className: 'text-foreground/60' };
      default:
        return { label: status, className: 'text-muted-foreground' };
    }
  };

  const statusInfo = getStatusDisplay(market.status);

  return (
    <motion.div 
      whileTap={{ scale: 0.98, opacity: 0.8 }}
      onClick={() => navigate(`/market/${market.id}`)}
      className="flex items-center justify-between py-6 px-1 border-b border-border/10 cursor-pointer group active:bg-muted/5 transition-colors rounded-xl"
    >
      <div className="flex-1 min-w-0 pr-6">
        <h4 className="text-[16px] font-bold text-foreground/90 truncate leading-tight tracking-tight mb-2 group-hover:text-foreground transition-colors">
          {market.title}
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.15em]">
            {market.venue}
          </span>
          <div className="w-1 h-1 rounded-full bg-border/40" />
          <div className="flex items-center gap-1.5">
            <div className={`w-1 h-1 rounded-full ${statusInfo.className.replace('text-', 'bg-')}`} />
            <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${statusInfo.className}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end shrink-0 gap-1">
        <div className="px-3 py-1.5 bg-muted/20 rounded-lg border border-border/20">
          <span className="text-[17px] font-black text-foreground tracking-tighter">
            {(market.yes_price * 100).toFixed(0)}<span className="text-[11px] ml-0.5 opacity-40 uppercase">¢</span>
          </span>
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${isUp ? 'text-green-500' : 'text-muted-foreground/40'}`}>
          {isUp ? '+' : ''}{(market.price_change_24h * 100).toFixed(0)}%
        </span>
      </div>
    </motion.div>
  );
};

export default MarketRow;
