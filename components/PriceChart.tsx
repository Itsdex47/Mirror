
import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';

interface PriceChartProps {
  data: number[];
  color?: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, color = 'var(--foreground)' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const hoverX = useMotionValue(0);
  const springX = useSpring(hoverX, { stiffness: 400, damping: 40 });

  const width = 400;
  const height = 180;
  const padding = 30;

  const { points, min, max, lastPoint, firstPoint, stability, bias } = useMemo(() => {
    if (!data || data.length === 0) {
      return { points: [], min: 0, max: 0, lastPoint: { x: 0, y: 0, val: 0 }, firstPoint: { x: 0, y: 0, val: 0 }, stability: 0, bias: 'Neutral' };
    }

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal;
    
    const pts = data.map((val, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - padding - ((val - minVal) / (range || 1)) * (height - padding * 2),
      val
    }));

    const first = pts[0];
    const last = pts[pts.length - 1];
    
    // Realistic stability: 1 - range (assuming data is 0-1 prob space)
    const stabilityScore = Math.max(0, Math.min(100, Math.round((1 - range) * 100)));
    
    // Bias: strictly based on start vs end of the visible window
    const biasType = last.val > first.val ? 'Bull' : last.val < first.val ? 'Bear' : 'Flat';

    return { 
      points: pts, 
      min: minVal, 
      max: maxVal, 
      lastPoint: last,
      firstPoint: first,
      stability: stabilityScore,
      bias: biasType
    };
  }, [data]);

  const pathData = useMemo(() => {
    return points.reduce((acc, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + point.x) / 2;
      return `${acc} C ${cx} ${prev.y}, ${cx} ${point.y}, ${point.x} ${point.y}`;
    }, "");
  }, [points]);

  const areaPathData = useMemo(() => {
    return `${pathData} L ${width} ${height} L 0 ${height} Z`;
  }, [pathData]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    hoverX.set(Math.min(Math.max(x, 0), width));
  };

  const activeIndex = useTransform(springX, (x) => {
    const idx = Math.min(Math.round((x / width) * (data.length - 1)), data.length - 1);
    return idx;
  });

  const activeValue = useTransform(activeIndex, (idx) => {
    return (data[idx] * 100).toFixed(0);
  });

  const activeY = useTransform(springX, (x) => {
    const idx = Math.min(Math.round((x / width) * (data.length - 1)), data.length - 1);
    return points[idx]?.y || 0;
  });

  const [displayValue, setDisplayValue] = useState((data[data.length - 1] * 100).toFixed(0));

  useMotionValueEvent(activeValue, "change", (latest) => {
    setDisplayValue(latest);
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[220px] cursor-crosshair touch-none select-none group pt-4 text-foreground"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerMove={handlePointerMove}
    >
      {/* Absolute Market Health Tags */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-1 pointer-events-none z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mb-0.5">Stability</span>
            <span className="text-[10px] font-bold text-foreground">{stability}%</span>
          </div>
          <div className="w-[1px] h-3 bg-border" />
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] mb-0.5">Bias</span>
            <span className={cn(
              "text-[10px] font-bold",
              bias === 'Bull' ? 'text-indigo-500' : bias === 'Bear' ? 'text-amber-500' : 'text-muted-foreground'
            )}>
              {bias}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-muted/30 rounded-full border border-border/50 backdrop-blur-sm">
           <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
           <span className="text-[8px] font-black text-foreground uppercase tracking-widest">Live</span>
        </div>
      </div>

      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glassGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>

          <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dynamic Grid Bands */}
        {[0, 0.5, 1].map((p) => {
          const y = padding + (height - padding * 2) * p;
          return (
            <g key={p}>
              <line
                x1="0"
                y1={y}
                x2={width}
                y2={y}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-foreground/5"
              />
            </g>
          );
        })}

        {/* Fluid Area Fill */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          d={areaPathData}
          fill="url(#glassGradient)"
        />

        {/* The Core High-Contrast Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          d={pathData}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#pathGlow)"
        />

        {/* Real-time Tracking HUD (Hover State) */}
        <AnimatePresence>
          {isHovering && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.line
                x1={springX}
                x2={springX}
                y1={0}
                y2={height}
                stroke="currentColor"
                strokeWidth="0.5"
                className="opacity-20"
              />
              
              <motion.circle
                cx={springX}
                cy={activeY}
                r="5"
                fill="currentColor"
                stroke="hsl(var(--background))"
                strokeWidth="2"
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Static Markers (Extrema) */}
        <g className="pointer-events-none opacity-20">
          {points.find(p => p.val === max) && (
            <circle cx={points.find(p => p.val === max)!.x} cy={points.find(p => p.val === max)!.y} r="1.5" fill="currentColor" />
          )}
          {points.find(p => p.val === min) && (
            <circle cx={points.find(p => p.val === min)!.x} cy={points.find(p => p.val === min)!.y} r="1.5" fill="currentColor" />
          )}
        </g>
      </svg>
      
      {/* Floating HUD Tooltip - Refined to be subtle and out of the way */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-0 right-0 pointer-events-none z-20 pt-3 pr-1"
          >
            <div className="bg-foreground/90 backdrop-blur-md text-background px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/10">
              <span className="text-[8px] font-black uppercase tracking-[0.1em] opacity-60">Prob.</span>
              <span className="text-sm font-black tracking-tight leading-none">{displayValue}¢</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceChart;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
