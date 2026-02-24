import type { SubmissionStatus } from '@/lib/types';

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  read: 'bg-stone-100 text-stone-600',
  replied: 'bg-green-100 text-green-700',
  archived: 'bg-amber-100 text-amber-700',
};

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: 'New',
  read: 'Read',
  replied: 'Replied',
  archived: 'Archived',
};

interface StatusBadgeProps {
  status: SubmissionStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
