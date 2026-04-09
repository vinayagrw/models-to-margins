const shortFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
});

const longFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC'
});

export function formatDisplayDate(date: Date, style: 'short' | 'long' = 'long') {
  return style === 'short' ? shortFormatter.format(date) : longFormatter.format(date);
}
