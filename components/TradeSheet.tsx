
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Market } from '../types';
import { X, TrendingUp, Info, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { Tabs } from './ui/Tabs';

interface TradeSheetProps {
  market: Market;
  onClose: () => void;
}

const TradeSheet: React.FC<TradeSheetProps> = ({ market, onClose }) => {
  const [size, setSize] = useState(100);
  const [side, setSide] = useState<'yes' | 'no'>('yes');
  const [executionMode, setExecutionMode] = useState('Manual'); // 'Manual' or 'Agent'
  const [duration, setDuration] = useState(60); // minutes for Agent

  const price = side === 'yes' ? market.yes_price : market.no_price;
  const potentialReturn = (size / price);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-background rounded-t-[2rem] p-6 border-t border-border shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
        
        <header className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Review Order</h2>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 flex items-center gap-1">
              <TrendingUp size={12} strokeWidth={2.5} /> {market.venue} Direct Execution
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-muted rounded-full active:scale-90 transition-all">
            <X size={16} className="text-foreground" strokeWidth={2.5} />
          </button>
        </header>

        {/* Execution Mode Selector */}
        <div className="mb-8">
          <div className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mb-3">Execution Mode</div>
          <Tabs 
            tabs={['Manual', 'Agent']} 
            activeTab={executionMode} 
            onTabChange={setExecutionMode} 
            className="p-1 bg-muted rounded-2xl"
          />
        </div>

        <AnimatePresence mode="wait">
          {executionMode === 'Manual' ? (
            <motion.div 
              key="manual"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex gap-2 mb-8 bg-muted/50 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setSide('yes')}
                  className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${
                    side === 'yes' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground/60'
                  }`}
                >
                  YES {(market.yes_price * 100).toFixed(0)}¢
                </button>
                <button 
                  onClick={() => setSide('no')}
                  className={`flex-1 py-4 rounded-xl text-xs font-black transition-all ${
                    side === 'no' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground/60'
                  }`}
                >
                  NO {(market.no_price * 100).toFixed(0)}¢
                </button>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Size ($USD)</span>
                  <span className="text-3xl font-black tracking-tighter">${size}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="1000" 
                  step="10" 
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
                />
              </div>

              <div className="space-y-4 mb-8 bg-muted/20 p-5 rounded-2xl border border-border/40">
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-muted-foreground">Estimated Payout</span>
                  <span className="text-foreground font-bold tracking-tight">${potentialReturn.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="text-foreground font-bold tracking-tight">${(size * 0.001).toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="agent"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <Zap size={18} className="text-indigo-500" strokeWidth={2.5} />
                  <h3 className="text-sm font-bold text-indigo-500">Autonomous Arbitrage</h3>
                </div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                  Mirror Agent will monitor cross-venue discrepancies and liquidity spikes. 
                  It executes trades only when target implied probability matches your criteria.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Bot Runtime</span>
                    <span className="text-xs font-bold text-foreground mt-1">{duration} Minutes</span>
                  </div>
                  <Clock size={16} className="text-muted-foreground/40 mb-1" />
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="240" 
                  step="5" 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between mt-3 text-[8px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                   <span>5m</span>
                   <span>4 hours max</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 bg-muted/20 rounded-xl border border-border/40">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Exit Strategy</span>
                  <span className="text-[11px] font-bold text-foreground">Convergence</span>
                </div>
                <div className="p-4 bg-muted/20 rounded-xl border border-border/40">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Max Slippage</span>
                  <span className="text-[11px] font-bold text-foreground">0.2% Fixed</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 mb-8 p-4 bg-muted/10 rounded-2xl">
          <ShieldCheck size={16} className="text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground font-medium">
            Collateral is locked in escrow during active execution. Smart-contract audited.
          </p>
        </div>

        <Button 
          onClick={() => {
            const msg = executionMode === 'Manual' 
              ? `Order for ${side.toUpperCase()} dispatched.` 
              : `Agent active for ${duration}m. Monitoring arbitrage...`;
            alert(msg);
            onClose();
          }}
          className={`w-full h-16 rounded-2xl text-sm font-bold tracking-tight transition-all active:scale-[0.98] ${
            executionMode === 'Agent' ? 'bg-indigo-600 text-white' : 'bg-foreground text-background'
          }`}
        >
          {executionMode === 'Manual' ? `Confirm ${side.toUpperCase()} Purchase` : 'Deploy Intelligence Agent'}
        </Button>
        
        <div className="safe-bottom h-8" />
      </motion.div>
    </div>
  );
};

export default TradeSheet;
