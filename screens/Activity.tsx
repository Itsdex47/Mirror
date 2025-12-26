
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, Info, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { ACTIVITY_LOG } from '../mockData';

const Activity: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(ACTIVITY_LOG);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleMarkAllRead = () => {
    setActivities(prev => prev.map(item => ({ ...item, read: true })));
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleIntelClick = (e: React.MouseEvent, clusterId: string, activityId: string) => {
    e.stopPropagation();
    // Optionally mark this specific one as read when investigating
    setActivities(prev => prev.map(item => 
      item.id === activityId ? { ...item, read: true } : item
    ));
    
    if (clusterId && clusterId !== 'none') {
      navigate(`/cluster/${clusterId}`);
    }
  };

  const allRead = activities.every(a => a.read);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 px-5 pt-8 min-h-screen bg-background"
    >
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-foreground">Activity</h1>
          <p className="text-muted-foreground text-sm font-medium mt-1">Intelligence and system logs.</p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          disabled={allRead}
          className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full transition-all active:scale-95 ${
            allRead 
              ? 'bg-muted text-muted-foreground/40 cursor-default opacity-50' 
              : 'bg-indigo-500/5 text-indigo-500 hover:bg-indigo-500/10'
          }`}
        >
          <CheckCircle2 size={12} /> {allRead ? 'All Read' : 'Mark Read'}
        </button>
      </header>

      <div className="space-y-3">
        {activities.map((item, i) => {
          const isRead = item.read;
          const isExpanded = expandedId === item.id;

          return (
            <motion.div 
              key={item.id} 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => isRead && toggleExpand(item.id)}
              className={`overflow-hidden transition-all duration-300 ${
                isRead 
                  ? 'bg-muted/30 border border-transparent rounded-2xl cursor-pointer hover:bg-muted/50' 
                  : 'p-6 rounded-[2rem] border bg-indigo-500/[0.03] border-indigo-500/20 shadow-sm shadow-indigo-500/5'
              }`}
            >
              {/* Header/Collapsible Row */}
              <div className={`flex justify-between items-start ${isRead ? 'p-4' : 'mb-4'}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-xl shrink-0 transition-opacity ${
                    isRead ? 'opacity-30' : ''
                  } ${
                    item.type === 'signal' ? 'bg-indigo-500/10 text-indigo-500' : 
                    item.type === 'alert' ? 'bg-amber-500/10 text-amber-500' : 'bg-muted text-muted-foreground'
                  }`}>
                    {item.type === 'signal' ? <Zap size={14} /> : 
                     item.type === 'alert' ? <Bell size={14} /> : <Info size={14} />}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-black uppercase tracking-widest whitespace-nowrap ${isRead ? 'text-muted-foreground/40' : 'text-muted-foreground'}`}>
                        {item.type}
                      </span>
                    </div>
                    <h3 className={`text-sm font-bold tracking-tight truncate ${isRead ? 'text-muted-foreground/60' : 'text-foreground'}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                  <span className="text-[9px] text-muted-foreground/40 font-black uppercase tracking-widest whitespace-nowrap">
                    {item.timestamp}
                  </span>
                  {isRead && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="text-muted-foreground/20"
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Expandable Content for Read Items or Static Content for Unread */}
              <AnimatePresence initial={false}>
                {(!isRead || (isRead && isExpanded)) && (
                  <motion.div
                    initial={isRead ? { height: 0, opacity: 0 } : false}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                  >
                    <div className={isRead ? 'px-4 pb-4' : ''}>
                      <p className={`text-xs leading-relaxed font-medium ${isRead ? 'text-muted-foreground/50 border-t border-border/20 pt-3' : 'text-muted-foreground'}`}>
                        {item.message}
                      </p>
                      
                      {!isRead && item.type === 'signal' && (
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => handleIntelClick(e, item.cluster_id, item.id)}
                          className="w-full mt-4 pt-4 border-t border-indigo-500/10 flex items-center justify-between group transition-colors hover:text-indigo-600"
                        >
                          <div className="flex flex-col items-start">
                            <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest group-hover:underline decoration-indigo-500/30">Priority Intel</span>
                            <span className="text-[8px] font-bold text-muted-foreground/40 uppercase tracking-tight">Investigate Node</span>
                          </div>
                          <div className="p-2 rounded-full bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors">
                            <ArrowRight size={14} className="text-indigo-500" />
                          </div>
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <div className="w-1.5 h-1.5 bg-border rounded-full mx-auto mb-4" />
        <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.4em]">Chronicle Complete</p>
      </div>
    </motion.div>
  );
};

export default Activity;
