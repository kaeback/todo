import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const PRIORITY_CONFIG = {
  low:    { bar: 'bg-sky-400',   badge: 'text-sky-600 bg-sky-50',   label: '낮음' },
  medium: { bar: 'bg-amber-400', badge: 'text-amber-600 bg-amber-50', label: '보통' },
  high:   { bar: 'bg-red-400',   badge: 'text-red-600 bg-red-50',   label: '높음' },
};

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  const cfg = PRIORITY_CONFIG[todo.priority];

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setEditText(todo.text);
    setEditing(true);
  };

  const commit = () => {
    onUpdate(todo.id, editText);
    setEditing(false);
  };

  const cancel = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
    if (e.key === 'Escape') cancel();
  };

  return (
    <div className="todo-enter flex items-center gap-3 px-4 py-3 group hover:bg-slate-50/80 transition-colors">
      {/* Priority indicator */}
      <div
        className={`w-0.5 h-7 rounded-full flex-shrink-0 transition-opacity ${cfg.bar} ${
          todo.completed ? 'opacity-25' : 'opacity-100'
        }`}
      />

      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        }`}
        aria-label={todo.completed ? '미완료로 변경' : '완료로 변경'}
      >
        {todo.completed && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Text or edit input */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commit}
            className="w-full text-sm text-slate-700 bg-transparent border-b-2 border-indigo-400 outline-none pb-px"
          />
        ) : (
          <span
            onDoubleClick={startEdit}
            title="더블클릭하여 수정"
            className={`text-sm block truncate select-none transition-all ${
              todo.completed ? 'line-through text-slate-400' : 'text-slate-700 cursor-text'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span
          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 transition-opacity ${cfg.badge} ${
            todo.completed ? 'opacity-30' : 'opacity-80'
          }`}
        >
          {cfg.label}
        </span>
      )}

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
        className="opacity-0 group-hover:opacity-100 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-slate-300 hover:text-red-400 hover:bg-red-50 transition-all"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1L9 9M9 1L1 9" />
        </svg>
      </button>
    </div>
  );
}
