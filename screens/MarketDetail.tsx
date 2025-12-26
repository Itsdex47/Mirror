
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { MARKETS } from '../mockData';
import TradeSheet from '../components/TradeSheet';
import { Button } from '../components/ui/Button';
import PriceChart from '../components/PriceChart';

const MarketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showTrade, setShowTrade] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  // Simulated chart data
  const mockChartData = [0.45, 0.48, 0.42, 0.55, 0.51, 0.58, 0.62, 0.65];

  const market = MARKETS.find(m => m.id === id);
  if (!market) return <div className="p-8 text-center text-muted-foreground">Market not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32"
    >
      <header className="sticky top-0 bg-background/80 backdrop-blur-md z-40 px-6 pt-10 pb-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-foreground">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{market.venue}</span>
        <button className="p-2 -mr-2 text-foreground">
          <Bookmark size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="px-6">
        <section className="mb-8 mt-4">
          <h1 className="text-2xl font-extrabold text-foreground mb-8 leading-tight tracking-tighter">
            {market.title}
          </h1>
          
          <div className="mb-10">
            <div className="text-[11px] font-bold text-muted-foreground/50 uppercase tracking-widest mb-1">Current Probability</div>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-extrabold text-foreground tracking-tighter">
                {(market.yes_price * 100).toFixed(0)}<span className="text-3xl">¢</span>
              </span>
              <div className={`flex items-center text-sm font-bold ${market.price_change_24h > 0 ? 'text-green-500' : 'text-muted-foreground'}`}>
                {market.price_change_24h > 0 ? '↑' : '↓'} {(Math.abs(market.price_change_24h) * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <PriceChart data={mockChartData} color="currentColor" />
            <div className="flex justify-between mt-4">
               <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest">24 Hours Ago</span>
               <span className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-widest">Now</span>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <p className={`text-sm text-muted-foreground leading-relaxed font-medium ${descExpanded ? '' : 'line-clamp-3'}`}>
            {market.description}
          </p>
          <button 
            onClick={() => setDescExpanded(!descExpanded)}
            className="text-[11px] font-bold text-foreground mt-4 uppercase tracking-widest underline decoration-muted-foreground/30"
          >
            {descExpanded ? 'Less' : 'Market Info'}
          </button>
        </section>

        <section className="space-y-6 pt-6 border-t border-border/40 mb-20">
           <div className="flex justify-between items-center">
             <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Resolution</span>
             <span className="text-sm font-bold text-foreground">{market.resolution_date}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Open Interest</span>
             <span className="text-sm font-bold text-foreground">$14,290,111</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Liquidity</span>
             <span className="text-sm font-bold text-foreground uppercase tracking-tight">{market.liquidity_level}</span>
           </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-md z-40 max-w-md mx-auto flex gap-4">
           <Button 
            onClick={() => setShowTrade(true)}
            size="lg"
            className="flex-1 h-14 rounded-2xl bg-foreground text-background font-bold text-sm tracking-tight"
          >
            Open Position
          </Button>
        </div>
      </main>

      {showTrade && (
        <TradeSheet market={market} onClose={() => setShowTrade(false)} />
      )}
    </motion.div>
  );
};

export default MarketDetail;
