import { formatDistanceToNow } from 'date-fns';

export function formatRelativeTime(date: string | Date): string {
  return `Updated ${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
}
