'use client';

interface AnchorBarItem {
  id: string;
  label: string;
}

interface AnchorBarProps {
  items: AnchorBarItem[];
  activeId?: string;
}

export default function AnchorBar({ items, activeId }: AnchorBarProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className="sticky top-0 z-20 overflow-x-auto"
      style={{ background: 'white', borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="flex max-w-4xl mx-auto px-4 sm:px-6">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-active={isActive ? 'true' : undefined}
              className="shrink-0 px-4 py-3 text-sm font-medium transition-colors no-underline"
              style={{
                color: isActive ? 'var(--color-primary)' : 'var(--color-mid)',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
