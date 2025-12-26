
export type LiquidityLevel = 'low' | 'med' | 'high';
export type Severity = 'low' | 'med' | 'high';
export type SignalType = 'threshold_violation' | 'cross_venue_divergence' | 'implied_probability_inconsistency';
export type RelationshipType = 'threshold' | 'equivalence' | 'conditional';

export interface Market {
  id: string;
  title: string;
  category: string;
  venue: string;
  yes_price: number;
  no_price: number;
  spread: number;
  liquidity_level: LiquidityLevel;
  resolution_date: string;
  status: 'open' | 'closed' | 'resolved';
  price_change_24h: number;
  description: string;
}

export interface Relationship {
  relationship_id: string;
  type: RelationshipType;
  description: string;
  market_ids: string[];
}

export interface Signal {
  signal_id: string;
  type: SignalType;
  severity: Severity;
  explanation: string;
  related_market_ids: string[];
}

export interface Cluster {
  cluster_id: string;
  title: string;
  subtitle: string;
  sample_markets: string[];
  signal_count: number;
  market_ids: string[];
  relationship_ids: string[];
  signal_ids: string[];
  alpha_score?: number; // 0-100 score for arbitrage/idealness
  volume?: string;      // Volume indicator
}

export interface TradeLeg {
  market_id: string;
  side: 'buy_yes' | 'buy_no';
  venue: string;
  estimated_price: number;
}
