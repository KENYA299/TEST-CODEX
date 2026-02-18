export const platforms = {
  social: ['TikTok', 'Instagram', 'Facebook', 'X (Twitter)', 'LinkedIn', 'Pinterest', 'Snapchat'],
  video: ['YouTube', 'Twitch', 'Facebook Watch', 'TikTok'],
  music: ['Spotify', 'Apple Music', 'YouTube Music', 'Boomplay', 'Audiomack'],
  web: ['Website', 'Blog', 'Landing Page'],
  ads: ['Google Search', 'Google Display', 'YouTube Ads', 'App Ads (AdMob)']
};

export const contentTypes = ['Video Post', 'Music Track', 'Live Stream', 'Website Page', 'Ad Campaign', 'Business Promo Video'];

export const engagementTypes = [
  'Likes',
  'Views',
  'Comments',
  'Shares',
  'Clicks',
  'Join Buttons',
  'Subscriptions',
  'Chats',
  'Gifts',
  'Followers'
];

export const intents = [
  'Views',
  'Watch Time',
  'Comments',
  'Followers',
  'Likes',
  'Shares',
  'Music Streams',
  'Playlist Adds',
  'Donations',
  'Merchandise Sales',
  'Website Clicks',
  'SEO Growth',
  'Ad Clicks',
  'Subscription Growth',
  'Increased Ad Views'
];

export const defaultCampaign = {
  name: '',
  link: '',
  platform: 'TikTok',
  contentType: 'Video Post',
  intent: 'Views',
  engagementTypes: ['Views', 'Likes'],
  quantity: 100,
  rpmTarget: 3.5,
  serviceLevel: 'balanced',
  adViewPlan: {
    mode: 'weekly',
    dailyViews: 50,
    totalDays: 30
  },
  safeAutomation: true,
  notes: ''
};

export const taskTemplates = [
  'Rotate audience pools for safe delivery',
  'Schedule algorithm-friendly engagement pacing',
  'Queue ad view batches across selected period',
  'Enable multi-task baton flow for comments + shares + subscriptions',
  'Track RPM shift and retention variance'
];

export const sampleAnalytics = {
  social: { views: 381200, likes: 56240, comments: 9730, shares: 4410, followers: 18200, gifts: 410, chats: 1300 },
  music: { streams: 89220, playlistAdds: 3021, likes: 9180, shares: 2500 },
  video: { watchTimeHours: 15400, adViews: 112300, joinClicks: 2410, subscribers: 6200, likes: 30200, comments: 4100 },
  web: { traffic: 64210, backlinks: 1220, seoScore: 83, ctr: 6.2, optimizationScore: 86 },
  revenue: { donations: 940, tips: 430, merch: 2850, rpm: 5.2, retention: 62, businessPromo: 4120 }
};

export const sampleRevenue = {
  lastMonth: 7340,
  estimatedNextCampaign: 8920,
  perContent: [
    { title: 'YouTube Promo Video #17', earnings: 1200 },
    { title: 'TikTok Product Teaser', earnings: 760 },
    { title: 'Twitch Live Marathon', earnings: 1440 }
  ]
};

export const guidance = [
  { channel: 'TikTok', tip: 'Pair trending audio with short hooks in first 2 seconds.' },
  { channel: 'YouTube', tip: 'Lift watch time with tighter intros and chapter markers.' },
  { channel: 'Instagram', tip: 'Cross-post reels with clear CTA to profile links.' },
  { channel: 'Twitch', tip: 'Use recurring chat prompts and timed subscription reminders.' },
  { channel: 'Website', tip: 'Improve CTR with intent-based headlines and compressed media.' },
  { channel: 'Ads', tip: 'Scale slowly to preserve quality score and stabilize CPC.' }
];
