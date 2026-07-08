export const MOCK_TEAM_MEMBERS = [
  { id: 'tm-1', name: 'Alex Rivera', role: 'UI/UX Designer', initials: 'AR', bgClass: 'bg-indigo-500 text-white' },
  { id: 'tm-2', name: 'Sarah Chen', role: 'Lead Frontend', initials: 'SC', bgClass: 'bg-pink-500 text-white' },
  { id: 'tm-3', name: 'John Doe', role: 'Backend Engineer', initials: 'JD', bgClass: 'bg-emerald-500 text-white' },
  { id: 'tm-4', name: 'Emily Watson', role: 'Product Manager', initials: 'EW', bgClass: 'bg-amber-500 text-white' },
  { id: 'tm-5', name: 'Liam Davies', role: 'DevOps Engineer', initials: 'LD', bgClass: 'bg-rose-500 text-white' },
  { id: 'tm-6', name: 'Sophia Patel', role: 'Fullstack Engineer', initials: 'SP', bgClass: 'bg-cyan-500 text-white' },
  { id: 'tm-7', name: 'Marcus Vance', role: 'QA Engineer', initials: 'MV', bgClass: 'bg-violet-500 text-white' },
];

export const COLOR_OPTIONS = [
  { name: 'Blue', value: 'blue', hex: '#3B82F6', textClass: 'text-blue-500', bgClass: 'bg-blue-500', bgLight: 'bg-blue-500/10' },
  { name: 'Purple', value: 'purple', hex: '#A855F7', textClass: 'text-purple-500', bgClass: 'bg-purple-500', bgLight: 'bg-purple-500/10' },
  { name: 'Emerald', value: 'emerald', hex: '#10B981', textClass: 'text-emerald-500', bgClass: 'bg-emerald-500', bgLight: 'bg-emerald-500/10' },
  { name: 'Rose', value: 'rose', hex: '#F43F5E', textClass: 'text-rose-500', bgClass: 'bg-rose-500', bgLight: 'bg-rose-500/10' },
  { name: 'Orange', value: 'orange', hex: '#F97316', textClass: 'text-orange-500', bgClass: 'bg-orange-500', bgLight: 'bg-orange-500/10' },
  { name: 'Cyan', value: 'cyan', hex: '#06B6D4', textClass: 'text-cyan-500', bgClass: 'bg-cyan-500', bgLight: 'bg-cyan-500/10' },
  { name: 'Pink', value: 'pink', hex: '#EC4899', textClass: 'text-pink-500', bgClass: 'bg-pink-500', bgLight: 'bg-pink-500/10' },
  { name: 'Indigo', value: 'indigo', hex: '#6366F1', textClass: 'text-indigo-500', bgClass: 'bg-indigo-500', bgLight: 'bg-indigo-500/10' },
];

export const MOCK_PROJECTS = [
  {
    id: 'proj-1',
    name: 'DevTrack Dashboard',
    description: 'Build a premium project tracking dashboard with real-time status updates and rich statistics analytics.',
    status: 'active',
    priority: 'high',
    dueDate: '2026-08-15',
    color: 'blue',
    teamMembers: ['tm-1', 'tm-2', 'tm-3'],
    milestones: [
      { id: 'm1-1', title: 'Component library selection & setup', completed: true, dueDate: '2026-07-01' },
      { id: 'm1-2', title: 'Sidebar layout & routing structure', completed: true, dueDate: '2026-07-05' },
      { id: 'm1-3', title: 'Project details module views', completed: false, dueDate: '2026-07-25' },
      { id: 'm1-4', title: 'Analytics dashboard & telemetry charts', completed: false, dueDate: '2026-08-10' },
    ],
    notes: [
      { id: 'n1-1', content: 'Optimizing rendering performance is crucial for the timeline charts.', author: 'Alex Rivera', createdAt: '2026-07-06T10:00:00Z' },
      { id: 'n1-2', content: 'Confirm with QA about edge cases in filter combinations.', author: 'Emily Watson', createdAt: '2026-07-07T12:00:00Z' }
    ],
    activities: [
      { id: 'a1-1', content: 'Sarah Chen completed milestone "Sidebar layout & routing structure"', createdAt: '2026-07-05T14:30:00Z' },
      { id: 'a1-2', content: 'Alex Rivera edited project information', createdAt: '2026-07-06T09:15:00Z' }
    ],
    createdAt: '2026-06-20T08:00:00Z',
    updatedAt: '2026-07-07T14:30:00Z',
  },
  {
    id: 'proj-2',
    name: 'Nova eCommerce Platform',
    description: 'Next-generation eCommerce web application including catalog navigation, basket checkout flow, and payment gateway.',
    status: 'planning',
    priority: 'medium',
    dueDate: '2026-10-10',
    color: 'purple',
    teamMembers: ['tm-4', 'tm-6'],
    milestones: [
      { id: 'm2-1', title: 'Market research & design mockups', completed: true, dueDate: '2026-07-01' },
      { id: 'm2-2', title: 'Database schema design & API definition', completed: false, dueDate: '2026-08-15' },
      { id: 'm2-3', title: 'Checkout system & Stripe gateway integration', completed: false, dueDate: '2026-09-30' },
    ],
    notes: [
      { id: 'n2-1', content: 'Stripe webhook security must be reviewed before staging.', author: 'Sophia Patel', createdAt: '2026-07-02T15:00:00Z' }
    ],
    activities: [
      { id: 'a2-1', content: 'Emily Watson created the project', createdAt: '2026-06-25T11:00:00Z' },
      { id: 'a2-2', content: 'Sophia Patel completed milestone "Market research & design mockups"', createdAt: '2026-07-01T17:45:00Z' }
    ],
    createdAt: '2026-06-25T11:00:00Z',
    updatedAt: '2026-07-01T17:45:00Z',
  },
  {
    id: 'proj-3',
    name: 'Aether Mobile App',
    description: 'Cross-platform mobile application utilizing React Native for on-the-go workspace notifications and task management.',
    status: 'completed',
    priority: 'high',
    dueDate: '2026-06-30',
    color: 'emerald',
    teamMembers: ['tm-2', 'tm-3', 'tm-5', 'tm-7'],
    milestones: [
      { id: 'm3-1', title: 'React Native boilerplate & setup', completed: true, dueDate: '2026-05-10' },
      { id: 'm3-2', title: 'Notification service integration', completed: true, dueDate: '2026-05-25' },
      { id: 'm3-3', title: 'Offline sync engine implementation', completed: true, dueDate: '2026-06-10' },
      { id: 'm3-4', title: 'App store submission & release approval', completed: true, dueDate: '2026-06-28' },
    ],
    notes: [
      { id: 'n3-1', content: 'App approved on Apple App Store on first attempt!', author: 'Marcus Vance', createdAt: '2026-06-28T09:00:00Z' }
    ],
    activities: [
      { id: 'a3-1', content: 'Liam Davies completed milestone "App store submission & release approval"', createdAt: '2026-06-28T09:00:00Z' },
      { id: 'a3-2', content: 'Project marked as Completed', createdAt: '2026-06-29T10:00:00Z' }
    ],
    createdAt: '2026-05-01T09:00:00Z',
    updatedAt: '2026-06-29T10:00:00Z',
  },
  {
    id: 'proj-4',
    name: 'Vortex CI/CD DevOps Pipeline',
    description: 'Robust deployment orchestration system that builds, tests, and deploys workspace applications onto staging clusters.',
    status: 'paused',
    priority: 'high',
    dueDate: '2026-09-01',
    color: 'rose',
    teamMembers: ['tm-5', 'tm-3'],
    milestones: [
      { id: 'm4-1', title: 'Infrastructure configuration audit', completed: true, dueDate: '2026-06-15' },
      { id: 'm4-2', title: 'Kubernetes Helm charts deployment automation', completed: false, dueDate: '2026-08-30' },
    ],
    notes: [
      { id: 'n4-1', content: 'Paused due to cluster infrastructure migration. Resumes early August.', author: 'Liam Davies', createdAt: '2026-07-01T10:00:00Z' }
    ],
    activities: [
      { id: 'a4-1', content: 'Liam Davies paused project Vortex CI/CD DevOps Pipeline', createdAt: '2026-07-01T10:00:00Z' }
    ],
    createdAt: '2026-06-01T08:00:00Z',
    updatedAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'proj-5',
    name: 'Solaria Data Analytics',
    description: 'Real-time Apache Spark analytics platform feeding metric charts, reporting templates, and security logs.',
    status: 'active',
    priority: 'medium',
    dueDate: '2026-11-20',
    color: 'orange',
    teamMembers: ['tm-1', 'tm-4'],
    milestones: [
      { id: 'm5-1', title: 'Data pipeline ingestion layer setup', completed: true, dueDate: '2026-06-30' },
      { id: 'm5-2', title: 'Aggregated analytics spark queries', completed: true, dueDate: '2026-07-05' },
      { id: 'm5-3', title: 'Dashboard charts UI visualization', completed: false, dueDate: '2026-08-30' },
      { id: 'm5-4', title: 'Automated monthly PDF export report', completed: false, dueDate: '2026-09-30' },
      { id: 'm5-5', title: 'Anomaly detection threshold alert trigger', completed: false, dueDate: '2026-10-31' },
    ],
    notes: [
      { id: 'n5-1', content: 'Tested anomaly detection with sample data; accuracy is around 94%.', author: 'Alex Rivera', createdAt: '2026-07-05T16:00:00Z' }
    ],
    activities: [
      { id: 'a5-1', content: 'Alex Rivera completed milestone "Aggregated analytics spark queries"', createdAt: '2026-07-05T16:00:00Z' }
    ],
    createdAt: '2026-06-10T10:00:00Z',
    updatedAt: '2026-07-05T16:00:00Z',
  },
  {
    id: 'proj-6',
    name: 'Chronos Browser Extension',
    description: 'Chrome Manifest V3 browser extension for tracking developer productivity and blocking distracting tabs.',
    status: 'active',
    priority: 'low',
    dueDate: '2026-07-25',
    color: 'cyan',
    teamMembers: ['tm-1', 'tm-2', 'tm-5', 'tm-6'],
    milestones: [
      { id: 'm6-1', title: 'Manifest V3 setup & context script config', completed: true, dueDate: '2026-06-25' },
      { id: 'm6-2', title: 'Chrome storage sync sync layout', completed: true, dueDate: '2026-06-30' },
      { id: 'm6-3', title: 'Popup panel UI design & action tabs list', completed: true, dueDate: '2026-07-06' },
      { id: 'm6-4', title: 'Extension beta testing validation & feedback', completed: false, dueDate: '2026-07-20' },
    ],
    notes: [
      { id: 'n6-1', content: 'Popup UI is complete. Check tab block response times.', author: 'Sarah Chen', createdAt: '2026-07-06T18:00:00Z' }
    ],
    activities: [
      { id: 'a6-1', content: 'Sarah Chen completed milestone "Popup panel UI design & action tabs list"', createdAt: '2026-07-06T18:00:00Z' }
    ],
    createdAt: '2026-06-15T09:00:00Z',
    updatedAt: '2026-07-06T18:00:00Z',
  },
  {
    id: 'proj-7',
    name: 'Zenith Branding & UI Portal',
    description: 'Corporate static asset store containing brand templates, SVG icons, fonts, and Figma components for teams.',
    status: 'planning',
    priority: 'low',
    dueDate: '2026-12-05',
    color: 'pink',
    teamMembers: ['tm-7', 'tm-4'],
    milestones: [
      { id: 'm7-1', title: 'Figma component library definition', completed: false, dueDate: '2026-08-31' },
      { id: 'm7-2', title: 'Static site portal setup & asset host config', completed: false, dueDate: '2026-10-31' },
    ],
    notes: [
      { id: 'n7-1', content: 'Initial layout sketches look promising.', author: 'Marcus Vance', createdAt: '2026-07-05T10:00:00Z' }
    ],
    activities: [
      { id: 'a7-1', content: 'Emily Watson created the project', createdAt: '2026-07-05T09:00:00Z' }
    ],
    createdAt: '2026-07-05T09:00:00Z',
    updatedAt: '2026-07-05T09:00:00Z',
  },
  {
    id: 'proj-8',
    name: 'Helios Smart Home API Gateway',
    description: 'Unified GraphQL gateway layer communicating with smart IoT appliances, tracking events, and reporting states.',
    status: 'completed',
    priority: 'medium',
    dueDate: '2026-05-15',
    color: 'indigo',
    teamMembers: ['tm-5', 'tm-6'],
    milestones: [
      { id: 'm8-1', title: 'IoT networking layer implementation', completed: true, dueDate: '2026-04-10' },
      { id: 'm8-2', title: 'GraphQL resolvers & schema mapping', completed: true, dueDate: '2026-04-28' },
      { id: 'm8-3', title: 'Security compliance and access audit', completed: true, dueDate: '2026-05-12' },
    ],
    notes: [
      { id: 'n8-1', content: 'Penetration testing cleared with 0 high alerts.', author: 'Sophia Patel', createdAt: '2026-05-12T16:00:00Z' }
    ],
    activities: [
      { id: 'a8-1', content: 'Sophia Patel completed milestone "Security compliance and access audit"', createdAt: '2026-05-12T16:00:00Z' },
      { id: 'a8-2', content: 'Project marked as Completed', createdAt: '2026-05-14T09:00:00Z' }
    ],
    createdAt: '2026-04-01T09:00:00Z',
    updatedAt: '2026-05-14T09:00:00Z',
  },
];
