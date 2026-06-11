'use client';

interface TagProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export default function Tag({ label, onClick, active = false }: TagProps) {
  return (
    <span
      id={`tag-${label.toLowerCase().replace(/\s+/g, '-')}`}
      className={[
        'inline-block font-mono text-xs px-2 py-1 rounded border transition-all duration-200',
        active
          ? 'border-accent text-accent'
          : 'border-border text-muted hover:border-accent hover:text-accent',
        onClick ? 'cursor-pointer select-none' : 'cursor-default',
      ].join(' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}
