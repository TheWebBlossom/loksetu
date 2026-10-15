// Mock data for LokSetu civic governance template
// All statistics, records, and identities are sample/demo placeholders for UI demonstration.

export const DEMO_STATS = {
  isDemo: true,
  lastUpdated: '13 Oct 2026, 09:30 AM IST',
  totalResolved: '18,482',
  slaAdherence: '94.6%',
  avgResolutionHours: '36.4 hrs',
  activeWards: '198 Wards',
  satisfactionRate: '87.2%',
  monthlySubmissions: '4,210',
};

export const SERVICE_CATEGORIES = [
  {
    id: 'solid-waste',
    name: 'Solid Waste & Sanitation',
    hindiName: 'ठोस कचरा एवं स्वच्छता',
    icon: 'Trash2',
    description: 'Garbage dump clearance, door-to-door segregation, bin overflow, and public toilet hygiene.',
    activeCases: 412,
    avgSLA: '24–48 Hours',
    tag: 'Sanitation Dept',
  },
  {
    id: 'roads-potholes',
    name: 'Roads & Potholes',
    hindiName: 'सड़क मरम्मत एवं गड्ढे',
    icon: 'Construction',
    description: 'Pothole patch-ups, damaged bituminous surface, missing manhole covers, and broken kerbs.',
    activeCases: 628,
    avgSLA: '72 Hours',
    tag: 'Engineering Cell',
  },
  {
    id: 'street-lighting',
    name: 'Street Lighting & Poles',
    hindiName: 'मार्ग प्रकाश एवं विद्युत',
    icon: 'Lightbulb',
    description: 'Non-functional streetlights, dark stretches, hanging electric wires, and damaged feeder boxes.',
    activeCases: 189,
    avgSLA: '24 Hours',
    tag: 'Electrical Dept',
  },
  {
    id: 'water-sewerage',
    name: 'Water Supply & Drainage',
    hindiName: 'जल आपूर्ति एवं सीवरेज',
    icon: 'Droplets',
    description: 'Contaminated water supply, pipeline bursts, low pressure, and sewage overflow in lanes.',
    activeCases: 341,
    avgSLA: '48 Hours',
    tag: 'Water Board / Jal Nigam',
  },
  {
    id: 'stormwater-drains',
    name: 'Stormwater Drains (Nallas)',
    hindiName: 'जल निकासी एवं नाले',
    icon: 'Waves',
    description: 'Pre-monsoon drain desilting, culvert blockage, and standing rainwater stagnation.',
    activeCases: 154,
    avgSLA: '48–72 Hours',
    tag: 'Stormwater Cell',
  },
  {
    id: 'parks-horticulture',
    name: 'Parks & Horticulture',
    hindiName: 'उद्यान एवं वृक्ष संवर्धन',
    icon: 'Trees',
    description: 'Pruning dangerously tilted branches, park walkway repair, and defunct children play units.',
    activeCases: 97,
    avgSLA: '72 Hours',
    tag: 'Horticulture Wing',
  },
  {
    id: 'stray-animals',
    name: 'Stray Animal Welfare',
    hindiName: 'पशु कल्याण एवं नियंत्रण',
    icon: 'Dog',
    description: 'Stray dog anti-rabies vaccination, cattle impounding from roads, and injured animal shelter alerts.',
    activeCases: 118,
    avgSLA: '24–48 Hours',
    tag: 'Veterinary Cell',
  },
  {
    id: 'encroachment-footpaths',
    name: 'Footpaths & Encroachment',
    hindiName: 'फुटपाथ एवं अतिक्रमण',
    icon: 'Footprints',
    description: 'Illegal barricades, footpath encroachment blocking pedestrian safety, and illegal hoardings.',
    activeCases: 142,
    avgSLA: '96 Hours',
    tag: 'Town Planning & Enforcement',
  },
];

export const RESOLVED_STORIES = [
  {
    id: 'LS-2026-DL-08492',
    category: 'Roads & Potholes',
    title: 'Severe road cavity repaired near Mother Dairy Junction',
    ward: 'Ward 42 — Mayur Vihar Phase-1',
    city: 'East Delhi Municipal Zone',
    reportedDate: '09 Oct 2026',
    resolvedDate: '11 Oct 2026',
    turnaround: '41 hours (Within 72h SLA)',
    officer: 'Er. Rajeshwar Tyagi, Junior Engineer (PWD/MCD)',
    citizenRating: 5,
    citizenComment: 'Fast turnaround! Cold mix patch done properly before monsoon showers. Photo confirmation received via SMS.',
    beforeSummary: 'Deep 4-foot pothole causing vehicular congestion & two-wheeler skids.',
    afterSummary: 'Compacted bitumen filling with asphalt sealing and painted warning markings.',
  },
  {
    id: 'LS-2026-KA-09115',
    category: 'Street Lighting & Poles',
    title: '8 LED streetlights restored on 12th Cross residential stretch',
    ward: 'Ward 112 — Indiranagar',
    city: 'Bruhat Bengaluru Mahanagara Palike',
    reportedDate: '10 Oct 2026',
    resolvedDate: '11 Oct 2026',
    turnaround: '19 hours (Within 24h SLA)',
    officer: 'Sunil Kumar V., Assistant Executive Engineer (Elec)',
    citizenRating: 5,
    citizenComment: 'Street had been dark for a week. Logged on LokSetu at night, linesman arrived by 11 AM next morning.',
    beforeSummary: 'Feeder box relay tripped; entire cross road plunged into pitch darkness.',
    afterSummary: 'MCB replacement and driver unit upgrade completed with citizen sign-off.',
  },
  {
    id: 'LS-2026-MH-07384',
    category: 'Solid Waste & Sanitation',
    title: 'Illegal dump yard cleared and sanitized with community dustbins',
    ward: 'Ward 68 — Bandra West',
    city: 'Brihanmumbai Municipal Corporation',
    reportedDate: '07 Oct 2026',
    resolvedDate: '08 Oct 2026',
    turnaround: '22 hours (Within 24h SLA)',
    officer: 'Farhan Merchant, Ward Sanitary Inspector',
    citizenRating: 5,
    citizenComment: 'Blackspot transformed! BMC team cleared 3 tonnes of waste and placed green wet/dry bins.',
    beforeSummary: 'Overnight dumping of commercial packaging blocking footpath walkway.',
    afterSummary: 'Complete bobcat clearing, bleaching powder spray, and warning signage erected.',
  },
];

export const PUBLIC_COMPLAINTS = [
  {
    id: 'LS-2026-DL-08492',
    category: 'Roads & Potholes',
    title: 'Severe road cavity repaired near Mother Dairy Junction',
    ward: 'Ward 42 — Mayur Vihar',
    city: 'Delhi',
    status: 'Resolved',
    urgency: 'High',
    filedDate: '09 Oct 2026',
    slaRemaining: 'Completed on time',
    slaStatus: 'on-time',
    description: 'Deep 4-foot pothole on main artery causing traffic gridlock during peak school hours.',
    upvotes: 38,
    assignedDept: 'Road Works Division IV',
    officer: 'Er. Rajesh Tyagi (JE)',
    timeline: [
      { step: 'Grievance Registered', date: '09 Oct 2026, 08:15 AM', status: 'completed', note: 'Geo-tagged with GPS coordinate 28.5912° N, 77.2941° E' },
      { step: 'Ward JE Assigned', date: '09 Oct 2026, 10:30 AM', status: 'completed', note: 'Er. Rajesh Tyagi conducted initial site inspection' },
      { step: 'Work Order Issued', date: '10 Oct 2026, 09:00 AM', status: 'completed', note: 'Contractor dispatched with cold-mix asphalt vehicle' },
      { step: 'Work Completed & Inspected', date: '11 Oct 2026, 01:20 AM', status: 'completed', note: 'Bitumen leveling verified by Ward Assistant Engineer' },
      { step: 'Citizen Verification', date: '11 Oct 2026, 11:30 AM', status: 'completed', note: 'Complainant confirmed resolution. Case closed.' },
    ]
  },
  {
    id: 'LS-2026-KA-09144',
    category: 'Solid Waste & Sanitation',
    title: 'Secondary waste dump overflowing near 4th Cross School',
    ward: 'Ward 112 — Indiranagar',
    city: 'Bengaluru',
    status: 'In Progress',
    urgency: 'High',
    filedDate: '12 Oct 2026',
    slaRemaining: '14 hrs remaining',
    slaStatus: 'within-sla',
    description: 'Municipal waste compactor failed to arrive for 2 consecutive days. Stray dogs scattering waste across pavement.',
    upvotes: 46,
    assignedDept: 'Solid Waste Management Cell',
    officer: 'D. Ramesh, Health Inspector',
    timeline: [
      { step: 'Grievance Registered', date: '12 Oct 2026, 07:45 AM', status: 'completed', note: 'Citizen photo evidence verified by automated classifier' },
      { step: 'Ward Sanitary Inspector Assigned', date: '12 Oct 2026, 08:30 AM', status: 'completed', note: 'Health Inspector dispatched emergency tipper truck' },
      { step: 'Compactor Vehicle Dispatched', date: '12 Oct 2026, 02:15 PM', status: 'in-progress', note: 'Tipper truck currently clearing priority wards' },
      { step: 'Disinfection & Sanitization', date: 'Pending', status: 'pending', note: 'Lime powder spray scheduled post-clearance' },
      { step: 'Citizen Verification', date: 'Pending', status: 'pending', note: 'Awaiting citizen OTP confirmation' },
    ]
  },
  {
    id: 'LS-2026-TN-04981',
    category: 'Water Supply & Drainage',
    title: 'Foul odour and reddish turbidity in Metro Water pipeline',
    ward: 'Ward 124 — Mylapore',
    city: 'Chennai',
    status: 'Under Review',
    urgency: 'Critical',
    filedDate: '13 Oct 2026',
    slaRemaining: '32 hrs remaining',
    slaStatus: 'within-sla',
    description: 'Drinking water supplied this morning smells heavily of drainage. Suspected cross-contamination in line near South Mada St.',
    upvotes: 84,
    assignedDept: 'Chennai Metro Water & Sewerage Board',
    officer: 'K. Senthil Nathan, Assistant Engineer',
    timeline: [
      { step: 'Grievance Registered', date: '13 Oct 2026, 06:10 AM', status: 'completed', note: 'High priority flag raised due to drinking water health risk' },
      { step: 'Water Sample Collection Scheduled', date: '13 Oct 2026, 08:00 AM', status: 'in-progress', note: 'Lab technician team en route for TDS and coliform testing' },
      { step: 'Pipeline Leakage Isolation', date: 'Pending', status: 'pending', note: 'Awaiting laboratory water quality test report' },
      { step: 'Pressure Flushing', date: 'Pending', status: 'pending', note: 'Fresh chlorination planned post-isolation' },
      { step: 'Citizen Verification', date: 'Pending', status: 'pending', note: 'Awaiting citizen sign-off' },
    ]
  },
  {
    id: 'LS-2026-MH-07312',
    category: 'Street Lighting & Poles',
    title: 'Streetlights unlit along SV Road junction for 4 nights',
    ward: 'Ward 68 — Bandra West',
    city: 'Mumbai',
    status: 'Resolved',
    urgency: 'Medium',
    filedDate: '08 Oct 2026',
    slaRemaining: 'Resolved in 18 hrs',
    slaStatus: 'on-time',
    description: 'Dark stretch creates hazardous crossing conditions for women and senior citizens near railway station feeder road.',
    upvotes: 29,
    assignedDept: 'BEST Undertaking / Streetlight Wing',
    officer: 'S. Kadam, Electrical Sub-Engineer',
    timeline: [
      { step: 'Grievance Registered', date: '08 Oct 2026, 08:30 PM', status: 'completed', note: 'Logged with ward reference ID' },
      { step: 'Feeder Inspection', date: '09 Oct 2026, 09:15 AM', status: 'completed', note: 'Found neutral line burnt due to load fluctuation' },
      { step: 'Cable Replacement Done', date: '09 Oct 2026, 02:30 PM', status: 'completed', note: 'Replaced 45m armoured aluminum cable' },
      { step: 'Field Illumination Test', date: '09 Oct 2026, 06:45 PM', status: 'completed', note: 'All 14 fixtures successfully lit' },
      { step: 'Citizen Verification', date: '09 Oct 2026, 07:15 PM', status: 'completed', note: 'Complainant confirmed over WhatsApp/SMS bot' },
    ]
  },
  {
    id: 'LS-2026-TS-06219',
    category: 'Stormwater Drains (Nallas)',
    title: 'Concrete slab missing over deep culvert near Jubilee Hills Gate 3',
    ward: 'Ward 89 — Banjara Hills',
    city: 'Hyderabad',
    status: 'Resolved',
    urgency: 'Critical',
    filedDate: '06 Oct 2026',
    slaRemaining: 'Resolved in 26 hrs',
    slaStatus: 'on-time',
    description: 'Pedestrian risk: 6-foot deep drain open on walking path without any barricade or reflector warning.',
    upvotes: 62,
    assignedDept: 'GHMC Engineering Section',
    officer: 'Mohd. Abdul Qadir, Executive Engineer',
    timeline: [
      { step: 'Grievance Registered', date: '06 Oct 2026, 04:00 PM', status: 'completed', note: 'Citizen uploaded geo-tagged photograph' },
      { step: 'Emergency Barricading', date: '06 Oct 2026, 05:45 PM', status: 'completed', note: 'Reflective red ribbons & safety cones placed immediately' },
      { step: 'Pre-cast RCC Slab Dispatched', date: '07 Oct 2026, 11:00 AM', status: 'completed', note: 'Standard heavy-duty slab installed with crane' },
      { step: 'Cement Sealing', date: '07 Oct 2026, 04:15 PM', status: 'completed', note: 'Mortar grouting completed to prevent slippage' },
      { step: 'Citizen Verification', date: '07 Oct 2026, 06:00 PM', status: 'completed', note: 'Citizen marked Satisfied in LokSetu portal' },
    ]
  },
  {
    id: 'LS-2026-UP-03108',
    category: 'Parks & Horticulture',
    title: 'Fallen neem branch obstructing school bus access route',
    ward: 'Ward 54 — Hazratganj',
    city: 'Lucknow',
    status: 'Resolved',
    urgency: 'Medium',
    filedDate: '11 Oct 2026',
    slaRemaining: 'Resolved in 14 hrs',
    slaStatus: 'on-time',
    description: 'Heavy thunderstorm branch broke off and blocked half the carriage way near St. Francis College lane.',
    upvotes: 19,
    assignedDept: 'LMC Horticulture & Garden Wing',
    officer: 'Virendra Singh, Tree Officer',
    timeline: [
      { step: 'Grievance Registered', date: '11 Oct 2026, 06:20 AM', status: 'completed', note: 'Auto-routed to tree cutting quick response team' },
      { step: 'Chainsaw Team Deployed', date: '11 Oct 2026, 08:30 AM', status: 'completed', note: 'Branch cut into movable logs' },
      { step: 'Tractor Haulage', date: '11 Oct 2026, 11:45 AM', status: 'completed', note: 'Wood transported to municipal composting yard' },
      { step: 'Road Swept Clean', date: '11 Oct 2026, 12:30 PM', status: 'completed', note: 'Debris and twigs cleared by ward sweepers' },
      { step: 'Citizen Verification', date: '11 Oct 2026, 08:20 PM', status: 'completed', note: 'Resident association secretary closed ticket' },
    ]
  },
  {
    id: 'LS-2026-RJ-02941',
    category: 'Street Lighting & Poles',
    title: 'Defunct high-mast lighting pole in Sector 4 Community Park',
    ward: 'Ward 31 — Malviya Nagar',
    city: 'Jaipur',
    status: 'In Progress',
    urgency: 'Low',
    filedDate: '12 Oct 2026',
    slaRemaining: '28 hrs remaining',
    slaStatus: 'within-sla',
    description: 'High-mast lights have been flickering and dying out; children and elderly unable to use park after dusk.',
    upvotes: 15,
    assignedDept: 'JMC Electrical Division South',
    officer: 'Prakash Sharma, Junior Engineer',
    timeline: [
      { step: 'Grievance Registered', date: '12 Oct 2026, 09:10 AM', status: 'completed', note: 'Logged with park committee memo' },
      { step: 'Hydraulic Ladder Requested', date: '12 Oct 2026, 03:00 PM', status: 'completed', note: 'Sky-lift vehicle requisitioned for 16-meter pole height' },
      { step: 'Floodlight Ballast Repair', date: '13 Oct 2026', status: 'in-progress', note: 'Maintenance crew on site' },
      { step: 'Citizen Verification', date: 'Pending', status: 'pending', note: 'Awaiting citizen sign-off' },
    ]
  },
  {
    id: 'LS-2026-GJ-05523',
    category: 'Footpaths & Encroachment',
    title: 'Commercial construction debris dumped in residential walkway',
    ward: 'Ward 76 — Navrangpura',
    city: 'Ahmedabad',
    status: 'Under Review',
    urgency: 'Medium',
    filedDate: '13 Oct 2026',
    slaRemaining: '72 hrs remaining',
    slaStatus: 'within-sla',
    description: 'Renovation debris and concrete rubble left in pedestrian footpath for 5 days without builder safety nets.',
    upvotes: 22,
    assignedDept: 'AMC Estate & Town Planning',
    officer: 'Ketan Patel, Town Planning Inspector',
    timeline: [
      { step: 'Grievance Registered', date: '13 Oct 2026, 11:00 AM', status: 'completed', note: 'Complainant uploaded photographs with geotag' },
      { step: 'Notice Generation', date: '13 Oct 2026, 02:30 PM', status: 'in-progress', note: 'Drafting Section 260 notice to building owner' },
      { step: 'Debris Removal & Penalty', date: 'Pending', status: 'pending', note: 'Scheduled within 48 hours under C&D Waste Rules' },
      { step: 'Citizen Verification', date: 'Pending', status: 'pending', note: 'Awaiting citizen verification' },
    ]
  }
];

export const COMMUNITY_INITIATIVES = [
  {
    title: 'Ward Sabha Participatory Budgeting 2026–27',
    tag: 'Civic Democracy',
    ward: 'Wards 40 to 48',
    description: 'Citizens directly vote on ₹50 Lakhs ward development funds for pedestrian walkways, rainwater recharge wells, and solar streetlights.',
    date: 'Next Assembly: 24 Oct 2026',
    actionText: 'View Ward Proposals',
    stats: '1,840 Citizens Voted'
  },
  {
    title: 'Swachh Ward League: Zero Waste Model Lanes',
    tag: 'Sanitation Excellence',
    ward: 'City-wide Ward Ranking',
    description: '100% source segregation competition across apartment clusters and residential welfare associations with monthly ward trophies.',
    date: 'Live Monthly Cycle',
    actionText: 'Check Ward Standing',
    stats: '72 Wards Ranked 4★+'
  },
  {
    title: 'Monsoon Resilience: Ward Volunteer Desilting Watch',
    tag: 'Citizen Watchdog',
    ward: 'All Flood-prone Wards',
    description: 'Empowering local college students and RWAs to inspect roadside drains and upload geo-verified desilting proof before rainfall peaks.',
    date: 'Annual Preparedness',
    actionText: 'Join Volunteer Roster',
    stats: '340 Desilting Audits'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Geo-Tagged Complaint Filing',
    subtitle: '1-Minute Citizen Submission',
    description: 'Snap a picture or describe the civic failure. LokSetu auto-identifies your municipal corporation and ward boundary using GPS coordinates.',
    highlights: ['Automatic Ward Allocation', 'Bilingual Support (Hindi & English)', 'AI-assisted Duplicate Detection'],
    icon: 'MapPin'
  },
  {
    step: '02',
    title: 'Work Order & Engineer Assignment',
    subtitle: 'Transparent Chain of Responsibility',
    description: 'Your ticket is instantly assigned to the designated Junior Engineer (JE) and Sanitary Inspector of your specific ward with a binding SLA clock.',
    highlights: ['Public Name & Contact of Officer', 'SLA Clock Initiated (24h–72h)', 'SMS & WhatsApp Real-time Alerts'],
    icon: 'UserCheck'
  },
  {
    step: '03',
    title: 'On-Ground Municipal Action',
    subtitle: 'Field Execution & Verification',
    description: 'The ward field crew deploys to rectify the issue. The officer must document photographic proof and work-order completion before closing the ticket.',
    highlights: ['Geo-stamped Before/After Photos', 'Material Requisition Logs', 'Escalation to Zonal AEE on Breach'],
    icon: 'Wrench'
  },
  {
    step: '04',
    title: 'Citizen Sign-Off & Public Ledger',
    subtitle: 'You Decide When the Case Closes',
    description: 'The complaint is only marked Resolved after the citizen validates the fix with an OTP or rating. If unsatisfied, it auto-escalates to the Ward Ombudsman.',
    highlights: ['Citizen OTP Closure Authority', 'Ward Transparency Public Dashboard', 'Ward Councillor Oversight'],
    icon: 'CheckCircle2'
  }
];

export const WARDS_LIST = [
  { id: 'DL-42', name: 'Ward 42 — Mayur Vihar Phase-1', city: 'Delhi', officer: 'Er. Rajesh Tyagi', helpline: '011-2275-8901' },
  { id: 'KA-112', name: 'Ward 112 — Indiranagar', city: 'Bengaluru', officer: 'Sunil Kumar V. (AEE)', helpline: '080-2266-0000' },
  { id: 'MH-68', name: 'Ward 68 — Bandra West (H-West)', city: 'Mumbai', officer: 'Farhan Merchant (SI)', helpline: '022-2642-2311' },
  { id: 'TN-124', name: 'Ward 124 — Mylapore', city: 'Chennai', officer: 'K. Senthil Nathan', helpline: '044-2499-1234' },
  { id: 'TS-89', name: 'Ward 89 — Banjara Hills', city: 'Hyderabad', officer: 'Mohd. Abdul Qadir', helpline: '040-2111-1111' },
  { id: 'UP-54', name: 'Ward 54 — Hazratganj', city: 'Lucknow', officer: 'Virendra Singh', helpline: '0522-262-3401' },
  { id: 'RJ-31', name: 'Ward 31 — Malviya Nagar', city: 'Jaipur', officer: 'Prakash Sharma', helpline: '0141-274-1234' },
  { id: 'GJ-76', name: 'Ward 76 — Navrangpura', city: 'Ahmedabad', officer: 'Ketan Patel', helpline: '079-2658-0000' },
];

export const FAQS = [
  {
    q: 'What is LokSetu and how does it differ from traditional municipal grievance portals?',
    a: 'LokSetu is a modern ward-centric civic governance platform. Unlike black-box portals where grievances disappear into department queues, LokSetu binds complaints directly to your specific Ward Committee, publishes real-time SLA countdowns, and requires citizen OTP sign-off before a case can be closed.'
  },
  {
    q: 'Can I track a complaint without creating an account or logging in?',
    a: 'Yes! LokSetu believes in radical public transparency. Anyone can track any public complaint using the unique Complaint Reference ID (e.g., LS-2026-DL-08492) via our "Track Complaint" search bar without logging in.'
  },
  {
    q: 'What happens if a municipal officer misses the resolution deadline (SLA breach)?',
    a: 'Every category has a legally defined Citizen Charter SLA (e.g., 24h for streetlights, 72h for potholes). When the timer expires without resolution, the ticket is automatically escalated to Level 2 (Assistant Executive Engineer) and notified to your elected Ward Councillor.'
  },
  {
    q: 'Can a complaint be closed if the work done is unsatisfactory?',
    a: 'No. When an officer marks a ticket as "Action Completed", an SMS and portal prompt is sent to the complainant. If you reject the resolution within 48 hours or upload proof that the problem persists, the ticket is reopened and flagged for Ombudsman inspection.'
  },
  {
    q: 'Is my personal information visible in the Public Grievance Directory?',
    a: 'No. To ensure citizen privacy and protection under the Digital Personal Data Protection Act, public listings display only the ward name, civic category, photo proof of the civic issue, and case timeline. Your personal identity, mobile number, and exact home unit are strictly masked.'
  },
  {
    q: 'How does LokSetu support local ward councillors and ward committees?',
    a: 'LokSetu provides elected councillors with a Ward Governance Dashboard showing real-time grievance heatmaps, SLA compliance metrics across municipal contractors, and ward participatory budgeting voting tools.'
  }
];
