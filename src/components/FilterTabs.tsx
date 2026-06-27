import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

const TABS: { value: Filter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'active', label: '진행 중' },
  { value: 'completed', label: '완료' },
];

export default function FilterTabs({ filter, onFilterChange, totalCount, activeCount, completedCount }: Props) {
  const counts: Record<Filter, number> = { all: totalCount, active: activeCount, completed: completedCount };

  return (
    <div className="flex gap-1">
      {TABS.map(tab => {
        const active = filter === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onFilterChange(tab.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              active
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${
                active ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {counts[tab.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
