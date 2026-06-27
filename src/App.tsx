import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import FilterTabs from './components/FilterTabs';

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  const allDone = totalCount > 0 && activeCount === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/20 py-12 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="mb-7 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500 shadow-lg shadow-indigo-200 mb-4">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 11L9 16L18 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Todos</h1>
          <p className="mt-1.5 text-sm text-slate-500">
            {totalCount === 0
              ? '할 일을 추가해보세요'
              : allDone
              ? '모든 할 일을 완료했습니다!'
              : `${activeCount}개 남음 / 전체 ${totalCount}개`}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">

          {/* Input */}
          <div className="p-4 border-b border-slate-100">
            <TodoInput onAdd={addTodo} />
          </div>

          {/* Filter tabs */}
          {totalCount > 0 && (
            <div className="px-4 py-2.5 border-b border-slate-50">
              <FilterTabs
                filter={filter}
                onFilterChange={setFilter}
                totalCount={totalCount}
                activeCount={activeCount}
                completedCount={completedCount}
              />
            </div>
          )}

          {/* Todo list */}
          <div>
            {todos.length === 0 ? (
              <div className="py-14 text-center text-slate-400">
                <div className="text-4xl mb-3 opacity-50">
                  {filter === 'completed' ? '😮' : '📋'}
                </div>
                <p className="text-sm">
                  {filter === 'completed'
                    ? '완료된 항목이 없습니다'
                    : filter === 'active'
                    ? '진행 중인 항목이 없습니다'
                    : '할 일을 추가해보세요'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {completedCount > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
              <span className="text-xs text-slate-400">{completedCount}개 완료됨</span>
              <button
                onClick={clearCompleted}
                className="text-xs text-red-400 hover:text-red-500 font-medium transition-colors"
              >
                완료 항목 모두 삭제
              </button>
            </div>
          )}
        </div>

        {/* Hint */}
        <p className="text-center text-[11px] text-slate-400 mt-5">
          더블클릭으로 수정 &middot; Enter 저장 &middot; Esc 취소
        </p>
      </div>
    </div>
  );
}
