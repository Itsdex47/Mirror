
import { Market, Cluster, Relationship, Signal } from './types';

export const MARKETS: Market[] = [
  // Cluster 1: FOMC
  {
    id: 'm1',
    title: 'Fed lowers rates by 25bps in March',
    category: 'Economics',
    venue: 'Polymarket',
    yes_price: 0.65,
    no_price: 0.35,
    spread: 0.02,
    liquidity_level: 'high',
    resolution_date: '2024-03-31',
    status: 'open',
    price_change_24h: 0.05,
    description: 'Will the Federal Open Market Committee (FOMC) announce a target range for the federal funds rate that is 25 basis points lower than the previous range following their March meeting?'
  },
  {
    id: 'm2',
    title: 'Fed lowers rates by 50bps in March',
    category: 'Economics',
    venue: 'Polymarket',
    yes_price: 0.15,
    no_price: 0.85,
    spread: 0.03,
    liquidity_level: 'med',
    resolution_date: '2024-03-31',
    status: 'open',
    price_change_24h: -0.02,
    description: 'Will the FOMC announce a target range 50 basis points lower following their March meeting?'
  },
  {
    id: 'm3',
    title: 'March Rate Cut (25bps)',
    category: 'Economics',
    venue: 'Kalshi',
    yes_price: 0.68,
    no_price: 0.32,
    spread: 0.01,
    liquidity_level: 'high',
    resolution_date: '2024-03-31',
    status: 'open',
    price_change_24h: 0.04,
    description: 'Binary option on a 25bps rate cut in the March FOMC meeting.'
  },
  // Cluster 2: SpaceX
  {
    id: 'm4',
    title: 'SpaceX Starship reaches orbit on IFT-3',
    category: 'Science',
    venue: 'Polymarket',
    yes_price: 0.42,
    no_price: 0.58,
    spread: 0.04,
    liquidity_level: 'med',
    resolution_date: '2024-04-15',
    status: 'open',
    price_change_24h: 0.12,
    description: 'Will the SpaceX Starship vehicle successfully reach an orbital velocity during its third integrated flight test?'
  },
  {
    id: 'm5',
    title: 'SpaceX Starship successfully de-orbits',
    category: 'Science',
    venue: 'Polymarket',
    yes_price: 0.28,
    no_price: 0.72,
    spread: 0.05,
    liquidity_level: 'low',
    resolution_date: '2024-04-15',
    status: 'open',
    price_change_24h: 0.05,
    description: 'Will the Starship vehicle perform a controlled re-entry and splashdown?'
  },
  // Cluster 3: US Election
  {
    id: 'm6',
    title: 'Donald Trump wins 2024 Election',
    category: 'Politics',
    venue: 'Polymarket',
    yes_price: 0.52,
    no_price: 0.48,
    spread: 0.01,
    liquidity_level: 'high',
    resolution_date: '2024-11-05',
    status: 'open',
    price_change_24h: 0.01,
    description: 'Will Donald Trump be elected the next President of the United States?'
  },
  {
    id: 'm7',
    title: 'Trump wins Popular Vote',
    category: 'Politics',
    venue: 'Polymarket',
    yes_price: 0.38,
    no_price: 0.62,
    spread: 0.02,
    liquidity_level: 'high',
    resolution_date: '2024-11-05',
    status: 'open',
    price_change_24h: -0.01,
    description: 'Will Donald Trump win the majority of the popular vote in the 2024 US Presidential Election?'
  },
  // Cluster 4: Crypto
  {
    id: 'm8',
    title: 'Spot ETH ETF Approved by May 31',
    category: 'Crypto',
    venue: 'Polymarket',
    yes_price: 0.45,
    no_price: 0.55,
    spread: 0.03,
    liquidity_level: 'high',
    resolution_date: '2024-05-31',
    status: 'open',
    price_change_24h: 0.08,
    description: 'Will the SEC approve a spot Ethereum exchange-traded fund by the specified date?'
  },
  {
    id: 'm9',
    title: 'Ethereum Spot ETF (May)',
    category: 'Crypto',
    venue: 'Kalshi',
    yes_price: 0.49,
    no_price: 0.51,
    spread: 0.02,
    liquidity_level: 'med',
    resolution_date: '2024-05-31',
    status: 'open',
    price_change_24h: 0.06,
    description: 'SEC approval of Spot ETH ETF listing.'
  },
  // Cluster 6: NBA
  {
    id: 'm10',
    title: 'Boston Celtics win NBA Finals',
    category: 'Sports',
    venue: 'Polymarket',
    yes_price: 0.35,
    no_price: 0.65,
    spread: 0.04,
    liquidity_level: 'high',
    resolution_date: '2024-06-25',
    status: 'open',
    price_change_24h: 0.02,
    description: 'Will the Boston Celtics be crowned the 2023-24 NBA Champions?'
  },
  {
    id: 'm11',
    title: 'Celtics to win Title',
    category: 'Sports',
    venue: 'DraftKings (Sim)',
    yes_price: 0.41,
    no_price: 0.59,
    spread: 0.05,
    liquidity_level: 'high',
    resolution_date: '2024-06-25',
    status: 'open',
    price_change_24h: 0.01,
    description: 'Moneyline on Celtics winning the NBA Championship.'
  },
  // Cluster 7: Geopolitics
  {
    id: 'm12',
    title: 'Ceasefire in Gaza by April 1',
    category: 'Global',
    venue: 'Polymarket',
    yes_price: 0.22,
    no_price: 0.78,
    spread: 0.03,
    liquidity_level: 'med',
    resolution_date: '2024-04-01',
    status: 'open',
    price_change_24h: -0.10,
    description: 'Will a formal ceasefire be reached in the Gaza conflict by April 1?'
  },
  {
    id: 'm13',
    title: 'Hostage Release Agreement signed',
    category: 'Global',
    venue: 'Polymarket',
    yes_price: 0.28,
    no_price: 0.72,
    spread: 0.04,
    liquidity_level: 'low',
    resolution_date: '2024-04-01',
    status: 'open',
    price_change_24h: -0.05,
    description: 'Will a hostage exchange deal be signed between Israel and Hamas?'
  }
];

export const RELATIONSHIPS: Relationship[] = [
  {
    relationship_id: 'r1',
    type: 'threshold',
    description: 'A 50bps cut implies a 25bps cut. Price of 50bps must be <= 25bps.',
    market_ids: ['m1', 'm2']
  },
  {
    relationship_id: 'r2',
    type: 'equivalence',
    description: 'Same event, different venues. Prices should converge.',
    market_ids: ['m1', 'm3']
  },
  {
    relationship_id: 'r3',
    type: 'conditional',
    description: 'De-orbit success is dependent on reaching orbit first.',
    market_ids: ['m4', 'm5']
  },
  {
    relationship_id: 'r4',
    type: 'threshold',
    description: 'Trump popular vote win implies overall win.',
    market_ids: ['m6', 'm7']
  },
  {
    relationship_id: 'r5',
    type: 'equivalence',
    description: 'Cross-venue ETH ETF approval monitoring.',
    market_ids: ['m8', 'm9']
  },
  {
    relationship_id: 'r6',
    type: 'equivalence',
    description: 'Prediction Market vs Sportsbook discrepancy.',
    market_ids: ['m10', 'm11']
  },
  {
    relationship_id: 'r7',
    type: 'conditional',
    description: 'Hostage deal is a likely prerequisite for ceasefire.',
    market_ids: ['m12', 'm13']
  }
];

export const SIGNALS: Signal[] = [
  {
    signal_id: 's1',
    type: 'cross_venue_divergence',
    severity: 'high',
    explanation: 'Polymarket (65%) and Kalshi (68%) are showing a 3% discrepancy on the FOMC rate cut.',
    related_market_ids: ['m1', 'm3']
  },
  {
    signal_id: 's2',
    type: 'implied_probability_inconsistency',
    severity: 'med',
    explanation: 'The conditional probability of de-orbit given orbit success is unusually low (0.28/0.42 = 66%).',
    related_market_ids: ['m4', 'm5']
  },
  {
    signal_id: 's3',
    type: 'threshold_violation',
    severity: 'high',
    explanation: 'Popular vote (38%) is pricing Trump higher than historical correlation to Electoral College win (52%).',
    related_market_ids: ['m6', 'm7']
  },
  {
    signal_id: 's4',
    type: 'cross_venue_divergence',
    severity: 'high',
    explanation: '4% gap between Polymarket (45%) and Kalshi (49%) on ETH ETF approval probability.',
    related_market_ids: ['m8', 'm9']
  },
  {
    signal_id: 's5',
    type: 'cross_venue_divergence',
    severity: 'med',
    explanation: 'Polymarket is significantly more bearish on Celtics (35%) than traditional sportsbooks (41%).',
    related_market_ids: ['m10', 'm11']
  }
];

export const CLUSTERS: Cluster[] = [
  {
    cluster_id: 'c1',
    title: 'March FOMC Meeting',
    subtitle: 'Interest rate decisions and macro expectations',
    sample_markets: ['25bps Rate Cut', '50bps Rate Cut'],
    signal_count: 1,
    market_ids: ['m1', 'm2', 'm3'],
    relationship_ids: ['r1', 'r2'],
    signal_ids: ['s1'],
    alpha_score: 92,
    volume: '$4.2M'
  },
  {
    cluster_id: 'c2',
    title: 'Starship IFT-3 Progress',
    subtitle: 'Orbital milestones and re-entry testing',
    sample_markets: ['Orbital reach', 'Successful de-orbit'],
    signal_count: 1,
    market_ids: ['m4', 'm5'],
    relationship_ids: ['r3'],
    signal_ids: ['s2'],
    alpha_score: 78,
    volume: '$1.1M'
  },
  {
    cluster_id: 'c3',
    title: '2024 US Election',
    subtitle: 'Presidential and Congressional outcomes',
    sample_markets: ['Trump Win', 'Popular Vote'],
    signal_count: 1,
    market_ids: ['m6', 'm7'],
    relationship_ids: ['r4'],
    signal_ids: ['s3'],
    alpha_score: 95,
    volume: '$142M'
  },
  {
    cluster_id: 'c4',
    title: 'ETH ETF & SEC Policy',
    subtitle: 'Regulatory rulings and institutional crypto',
    sample_markets: ['Spot ETH ETF', 'SEC Approval'],
    signal_count: 1,
    market_ids: ['m8', 'm9'],
    relationship_ids: ['r5'],
    signal_ids: ['s4'],
    alpha_score: 88,
    volume: '$12.5M'
  },
  {
    cluster_id: 'c5',
    title: 'AI Governance',
    subtitle: 'Safety standards and model regulation',
    sample_markets: ['GPT-5 Release', 'OpenAI Board'],
    signal_count: 0,
    market_ids: [],
    relationship_ids: [],
    signal_ids: [],
    alpha_score: 30,
    volume: '$800K'
  },
  {
    cluster_id: 'c6',
    title: 'NBA Championship',
    subtitle: 'Season outcomes and playoff brackets',
    sample_markets: ['Finals Winner', 'MVP'],
    signal_count: 1,
    market_ids: ['m10', 'm11'],
    relationship_ids: ['r6'],
    signal_ids: ['s5'],
    alpha_score: 65,
    volume: '$8.9M'
  },
  {
    cluster_id: 'c7',
    title: 'Geopolitical Stability',
    subtitle: 'Conflict resolution and diplomatic efforts',
    sample_markets: ['Ceasefire Date', 'Agreement Sign'],
    signal_count: 1,
    market_ids: ['m12', 'm13'],
    relationship_ids: ['r7'],
    signal_ids: [],
    alpha_score: 95,
    volume: '$3.4M'
  },
  {
    cluster_id: 'c8',
    title: 'Energy Transition',
    subtitle: 'Nuclear expansion and green hydrogen',
    sample_markets: ['Fusion Target', 'EV Adoption'],
    signal_count: 0,
    market_ids: [],
    relationship_ids: [],
    signal_ids: [],
    alpha_score: 22,
    volume: '$1.9M'
  },
  {
    cluster_id: 'c9',
    title: 'UK General Election',
    subtitle: 'Westminster control and Tory vs Labour odds',
    sample_markets: ['Labour Majority', 'Sunak Exit'],
    signal_count: 1,
    market_ids: [],
    relationship_ids: [],
    signal_ids: [],
    alpha_score: 82,
    volume: '$1.2M'
  },
  {
    cluster_id: 'c10',
    title: 'US Debt Ceiling',
    subtitle: 'Fiscal policy deadlines and default risk',
    sample_markets: ['Default Probability', 'Bipartisan Deal'],
    signal_count: 1,
    market_ids: [],
    relationship_ids: [],
    signal_ids: [],
    alpha_score: 45,
    volume: '$500K'
  }
];

export const ACTIVITY_LOG = [
  {
    id: 'a1',
    type: 'signal',
    title: 'New High-Severity Signal',
    message: 'Arbitrage opportunity detected in March FOMC cluster between Kalshi and Polymarket.',
    timestamp: '2 mins ago',
    read: false,
    cluster_id: 'c1'
  },
  {
    id: 'a2',
    type: 'alert',
    title: 'Price Target Reached',
    message: 'Fed 25bps cut yes price crossed 65¢.',
    timestamp: '1 hour ago',
    read: true,
    cluster_id: 'c1'
  },
  {
    id: 'a3',
    type: 'system',
    title: 'Market Resolution',
    message: 'NVIDIA Q4 Earnings market has resolved to "YES".',
    timestamp: '4 hours ago',
    read: true,
    cluster_id: 'none'
  },
  {
    id: 'a4',
    type: 'signal',
    title: 'Probability Violation',
    message: 'Election threshold violation: Popular vote price exceeding electoral win implied floor.',
    timestamp: '10 mins ago',
    read: false,
    cluster_id: 'c3'
  },
  {
    id: 'a5',
    type: 'alert',
    title: 'Volatility Spike',
    message: 'ETH ETF approval probability jumped 8% in 15 minutes following SEC rumor.',
    timestamp: '30 mins ago',
    read: false,
    cluster_id: 'c4'
  }
];
