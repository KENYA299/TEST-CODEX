const patterns = [
  { platform: 'TikTok', regex: /tiktok\.com/i, contentType: 'Video Post' },
  { platform: 'YouTube', regex: /(youtube\.com|youtu\.be)/i, contentType: 'Video Post' },
  { platform: 'Instagram', regex: /instagram\.com/i, contentType: 'Video Post' },
  { platform: 'Twitch', regex: /twitch\.tv/i, contentType: 'Live Stream' },
  { platform: 'Spotify', regex: /spotify\.com/i, contentType: 'Music Track' },
  { platform: 'Apple Music', regex: /music\.apple\.com/i, contentType: 'Music Track' },
  { platform: 'Website', regex: /^https?:\/\//i, contentType: 'Website Page' }
];

export function detectFromLink(link) {
  const matched = patterns.find((item) => item.regex.test(link));
  return matched || { platform: 'Unknown', contentType: 'Unknown' };
}
