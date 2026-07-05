// Lineage Proof — dummy dataset (fictional ShopBot customer-service agent)
// Wired directly into the dashboard mockup. Internally consistent with the
// measurement model in the PRD (§4, §8).

const leaves = {
  delivery_status: {
    id: 'delivery_status', name: 'Delivery Status', level: 'Order Status',
    traffic: 8400, stakes: 3, state: 'amber', reason: 'false_alarm',
    t1: 70, t1feature: 'carrier_status, order_age', t1explained: 0.97,
    t2: 'flat', t3: 0.0, trips: 0,
    skeleton: [
      { label: 'classify_delivery_intent', kind: 'skill', v: 'v4' },
      { label: 'fetch_order', kind: 'api' },
      { label: 'carrier_lookup', kind: 'api' },
      { label: 'carrier_status', kind: 'branch' },
      { label: 'compose_status_reply', kind: 'skill', v: 'v2' },
    ],
    dist: [
      { label: 'in-transit path', share: 70 },
      { label: 'lost-package sub-flow', share: 30 },
    ],
    predicates: [
      { text: 'every lost-package trace opens an investigation', rate: 0.0, trend: 'flat' },
    ],
    series: [70, 71, 69, 70, 70, 71, 70],
    cost: { expected: 1850, avg: 1800, residual: -50, unit: 'tokens' },
    note: 'Low Tier 1 here is a legitimate world-state branch, not wobble. Conditioned on carrier_status the explained-variation is 0.97 — amber means investigate, and the investigation resolves to "fine."',
  },
  return_status: {
    id: 'return_status', name: 'Return Status', level: 'Order Status',
    traffic: 3200, stakes: 2, state: 'green',
    t1: 96, t1feature: 'return_reason', t2: 'flat', t3: 0.0, trips: 0,
    skeleton: [
      { label: 'classify_return_intent', kind: 'skill', v: 'v3' },
      { label: 'fetch_return', kind: 'api' },
      { label: 'return_state_lookup', kind: 'api' },
      { label: 'compose_return_reply', kind: 'skill', v: 'v2' },
    ],
    dist: [
      { label: 'standard return', share: 96 },
      { label: 'expired-window', share: 4 },
    ],
    predicates: [
      { text: 'every trace fetches current return state before replying', rate: 0.0, trend: 'flat' },
    ],
    series: [96, 95, 96, 97, 96, 96, 96],
    cost: { expected: 1450, avg: 1400, residual: -50, unit: 'tokens' },
  },
  cancellation_status: {
    id: 'cancellation_status', name: 'Cancellation Status', level: 'Order Status',
    traffic: 1900, stakes: 2, state: 'green', isNew: true,
    t1: 93, t1feature: 'ship_status', t2: 'flat', t3: 0.2, trips: 0,
    skeleton: [
      { label: 'classify_cancel_intent', kind: 'skill', v: 'v1' },
      { label: 'fetch_order', kind: 'api' },
      { label: 'cancel_window_lookup', kind: 'api' },
      { label: 'compose_cancel_reply', kind: 'skill', v: 'v1' },
    ],
    dist: [
      { label: 'pre-ship cancel', share: 93 },
      { label: 'already-shipped redirect', share: 7 },
    ],
    predicates: [
      { text: 'cancellation checks order ship-status before confirming', rate: 0.2, trend: 'flat' },
    ],
    series: [93, 92, 93, 94, 93, 93, 93],
    cost: { expected: 1200, avg: 1200, residual: 0, unit: 'tokens' },
  },
  refund_eligibility: {
    id: 'refund_eligibility', name: 'Refund Eligibility', level: 'Refunds',
    traffic: 6100, stakes: 5, state: 'red', reason: 'money_quadrant',
    t1: 99.4, t1feature: 'refund_type, order_age', t2: 'flat', t3: 100, trips: 0,
    skeleton: [
      { label: 'classify_refund', kind: 'skill', v: 'v6' },
      { label: 'fetch_order', kind: 'api' },
      { label: 'window_check', kind: 'decision', missing: true, note: 'dropped after Mon skill update' },
      { label: 'eligibility_decision', kind: 'decision' },
      { label: 'issue_or_deny', kind: 'skill', v: 'v6' },
    ],
    dist: [
      { label: 'current path (no window-check)', share: 99.4 },
      { label: 'previous path (with window-check)', share: 0.6 },
    ],
    predicates: [
      { text: 'a window-check runs before the eligibility decision', rate: 100, was: 0, trend: 'up', money: true },
    ],
    series: [99.5, 99.4, 99.4, 99.4, 99.4, 99.3, 99.4],
    cost: { expected: 2050, avg: 2100, residual: 50, unit: 'tokens' },
    callout: 'Consistent (99.4%) AND violating (100%). The agent reliably does the wrong thing — high consistency is hiding a dropped compliance step. This cell is invisible to consistency alone.',
    note: 'A classify_refund skill update on Mon removed window_check from the path. Tier 1 rose; Tier 3 caught what Tier 1 cannot.',
  },
  refund_processing: {
    id: 'refund_processing', name: 'Refund Processing', level: 'Refunds',
    traffic: 5500, stakes: 4, state: 'red', reason: 'drift',
    t1: 78, t1prev: 94, t1feature: 'refund_amount_band', t2: 'down', t2note: '94 → 78 Tue', t3: 0.3, trips: 0,
    skeleton: [
      { label: 'classify_refund', kind: 'skill', v: 'v6' },
      { label: 'fetch_order', kind: 'api' },
      { label: 'refund_policy_lookup', kind: 'kb', v: 'v8' },
      { label: 'process_refund', kind: 'skill', v: 'v4' },
      { label: 'confirm_refund', kind: 'skill', v: 'v4' },
    ],
    dist: [
      { label: 'policy v8 path', share: 78 },
      { label: 'fallback A', share: 14 },
      { label: 'fallback B', share: 8 },
    ],
    predicates: [
      { text: 'every refund issues a confirmation receipt', rate: 0.3, trend: 'flat' },
    ],
    series: [94, 94, 94, 78, 78, 77, 78],
    seriesLabels: ['Mon', 'Tue AM', 'Tue 13h', 'Tue PM', 'Wed', 'Thu', 'Fri'],
    event: { at: 3, label: 'refund_policy@v7 → v8 deployed Tue 14:00' },
    cost: { expected: 2200, avg: 2300, residual: 100, unit: 'tokens' },
    note: 'The movement is the signal, not the level. 78% is shruggable in isolation; the step-down is not. The clock earned its keep before any invariant was violated.',
  },
  availability: {
    id: 'availability', name: 'Availability', level: 'Product Inquiry',
    traffic: 140, stakes: 4, state: 'gray', reason: 'n_too_low', highStakes: true,
    t1: null, t1feature: 'sku_class', t2: null, t3: null, trips: 0,
    skeleton: [
      { label: 'classify_availability_intent', kind: 'skill', v: 'v1' },
      { label: 'fetch_inventory', kind: 'api' },
      { label: 'compose_availability_reply', kind: 'skill', v: 'v1' },
    ],
    dist: null,
    predicates: null,
    series: null,
    cost: { expected: 950, avg: 900, residual: null, unit: 'tokens' },
    note: '140 traces over 7 days is below the traffic floor. Any per-leaf number here would be noise dressed as signal, so we show a blank — not a fabricated 100%. Flagged because the stakes are high, not because a metric tripped.',
  },
  specifications: {
    id: 'specifications', name: 'Specifications', level: 'Product Inquiry',
    traffic: 2700, stakes: 2, state: 'green', isNew: true,
    t1: 95, t1feature: 'product_category', t2: 'flat', t3: 0.0, trips: 0,
    skeleton: [
      { label: 'classify_spec_intent', kind: 'skill', v: 'v1' },
      { label: 'fetch_product', kind: 'api' },
      { label: 'spec_kb_lookup', kind: 'kb', v: 'v2' },
      { label: 'compose_spec_reply', kind: 'skill', v: 'v1' },
    ],
    dist: [
      { label: 'single-product spec', share: 95 },
      { label: 'comparison spec', share: 5 },
    ],
    predicates: [
      { text: 'spec answers cite a product KB chunk', rate: 0.0, trend: 'flat' },
    ],
    series: [95, 94, 95, 96, 95, 95, 95],
    cost: { expected: 1600, avg: 1600, residual: 0, unit: 'tokens' },
  },
  address_change: {
    id: 'address_change', name: 'Address Change', level: 'Account Management',
    traffic: 1400, stakes: 3, state: 'green',
    t1: 97, t1feature: 'account_tier', t2: 'flat', t3: 0.0, trips: 0,
    skeleton: [
      { label: 'classify_account_intent', kind: 'skill', v: 'v2' },
      { label: 'verify_identity', kind: 'skill', v: 'v3' },
      { label: 'update_address', kind: 'api' },
      { label: 'confirm_change', kind: 'skill', v: 'v2' },
    ],
    dist: [
      { label: 'verified update', share: 97 },
      { label: 'step-up auth', share: 3 },
    ],
    predicates: [
      { text: 'identity is verified before any account mutation', rate: 0.0, trend: 'flat' },
    ],
    series: [97, 96, 97, 98, 97, 97, 97],
    cost: { expected: 820, avg: 800, residual: -20, unit: 'tokens' },
  },
  password_reset: {
    id: 'password_reset', name: 'Password Reset', level: 'Account Management',
    traffic: 4800, stakes: 3, state: 'green',
    t1: 99, t1feature: 'channel', t2: 'flat', t3: 0.0, trips: 0,
    skeleton: [
      { label: 'classify_account_intent', kind: 'skill', v: 'v2' },
      { label: 'verify_identity', kind: 'skill', v: 'v3' },
      { label: 'issue_reset_token', kind: 'api' },
      { label: 'send_reset', kind: 'api' },
    ],
    dist: [
      { label: 'email reset', share: 99 },
      { label: 'sms reset', share: 1 },
    ],
    predicates: [
      { text: 'identity is verified before issuing a reset token', rate: 0.0, trend: 'flat' },
    ],
    series: [99, 99, 98, 99, 99, 99, 99],
    cost: { expected: 620, avg: 600, residual: -20, unit: 'tokens' },
  },
  escalation: {
    id: 'escalation', name: 'Escalation / Handoff', level: null,
    traffic: 2050, stakes: 4, state: 'amber', reason: 'cost_tripwire',
    t1: 88, t1feature: 'queue', t2: 'flat', t3: 1.1, trips: 3,
    skeleton: [
      { label: 'classify_escalation', kind: 'skill', v: 'v2' },
      { label: 'summarize_context', kind: 'skill', v: 'v3' },
      { label: 'route_handoff', kind: 'kb', v: 'v3' },
      { label: 'create_ticket', kind: 'api' },
      { label: 'notify_agent', kind: 'api' },
    ],
    dist: [
      { label: 'standard handoff', share: 88 },
      { label: 'priority queue', share: 12 },
    ],
    predicates: [
      { text: 'every handoff creates a ticket carrying full context', rate: 1.1, trend: 'flat' },
    ],
    series: [88, 87, 88, 89, 88, 88, 88],
    cost: {
      expected: 1100, avg: 2400, residual: 1300, unit: 'tokens', baselineLatency: '45s',
      traces: [
        { id: 'tr_9f2a4c', tokens: 5200, latency: '58s', note: 'retry spiral ×7 — same skeleton, eventually completed' },
        { id: 'tr_7b13e0', tokens: 4800, latency: '51s', note: 'retry spiral ×6 — same skeleton, eventually completed' },
        { id: 'tr_4c88af', tokens: 6100, latency: '67s', note: 'retry spiral ×9 — same skeleton, eventually completed' },
      ],
    },
    replayAttribution: 'kb#handoff_routing@v3 retry behavior — infrastructure, not model wobble',
    note: 'All three structural tiers read green-ish (88% / flat / 1.1%) — they are blind to a loop on the same path. The cost tripwire is the only sensor that sees it.',
  },
};

const levels = [
  { id: 'order_status', name: 'Order Status', children: ['delivery_status', 'return_status', 'cancellation_status'] },
  { id: 'refunds', name: 'Refunds', children: ['refund_eligibility', 'refund_processing'] },
  { id: 'product_inquiry', name: 'Product Inquiry', children: ['availability', 'specifications'] },
  { id: 'account_management', name: 'Account Management', children: ['address_change', 'password_reset'] },
];

const topLeaves = ['escalation'];

const headerStats = {
  classifier: { value: 97.2, label: 'trustworthy' },
  measured: { above: 10, total: 11, note: 'Availability below traffic floor' },
  attention: 4,
  newLeaves: { count: 2, names: 'Cancellation Status · Specifications', spark: [0, 0, 1, 0, 0, 1, 0] },
  tripwires: { count: 3, where: 'all in Escalation / Handoff' },
};

// Priority order for "needs attention" — severity then stakes, never traffic.
const attention = [
  { id: 'refund_eligibility', reason: 'Money quadrant', tag: 'red', what: 'window-check dropped after Mon skill update — 100% of refund traces skip it while consistency reads 99.4%.' },
  { id: 'refund_processing', reason: 'Drift event', tag: 'red', what: 'dominant path fell 94% → 78% when refund_policy@v8 shipped Tue 14:00.' },
  { id: 'escalation', reason: 'Cost tripwire', tag: 'amber', what: '3 handoff traces looping on a retry spiral — 4–6× expected tokens, structural tiers blind to it.' },
  { id: 'availability', reason: 'n too low · high stakes', tag: 'gray', what: '140 traces / 7d is below the traffic floor — no trustworthy number yet, surfaced not buried.' },
];

const caveats = [
  'Tier-1 may read undramatically green — strict skill/KB guidance can push consistency to ~95%+ with dull residual.',
  'Tier-1 feature sets and Tier-2 thresholds are tunable inputs, not fixed constants.',
  'Tier-3 invariant coverage is harvested from policy and still expanding; cost-anomaly tuning is in progress.',
];

const meta = {
  agent: 'ShopBot — Customer Service Agent',
  tagline: 'Reliability proof for agent fleets — measured from the traces you already have, never by re-running the agent.',
  window: 'rolling 7 days',
};

export default { leaves, levels, topLeaves, headerStats, attention, caveats, meta };
