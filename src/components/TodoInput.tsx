import { useState, useRef, type KeyboardEvent } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const PRIORITIES: { value: Priority; label: string; activeClass: string; inactiveClass: string }[] = [
  {
    value: 'low',
    label: '낮음',
    activeClass: 'bg-sky-500 text-white border-sky-500',
    inactiveClass: 'text-sky-500 border-sky-200 hover:bg-sky-50',
  },
  {
    value: 'medium',
    label: '보통',
    activeClass: 'bg-amber-500 text-white border-amber-500',
    inactiveClass: 'text-amber-500 border-amber-200 hover:bg-amber-50',
  },
  {
    value: 'high',
    label: '높음',
    activeClass: 'bg-red-500 text-white border-red-500',
    inactiveClass: 'text-red-500 border-red-200 hover:bg-red-50',
  },
];

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="space-y-2.5">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요..."
          className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-700 placeholder-slate-300 bg-slate-50 focus:bg-white"
          autoFocus
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="px-5 py-2.5 bg-indigo-500 text-white text-sm font-semibold rounded-xl hover:bg-indigo-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          추가
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] text-slate-400 font-medium">우선순위</span>
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            onClick={() => setPriority(p.value)}
            className={`text-[11px] px-2.5 py-1 rounded-full border font-semibold transition-all ${
              priority === p.value ? p.activeClass : p.inactiveClass
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
