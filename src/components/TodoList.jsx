import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onRemove, onUpdate }) {
  if (!todos || todos.length === 0) {
    return <p className="empty">タスクはありません</p>;
  }

  return (
    <ul className="todo-list" role="list" aria-live="polite">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onRemove={() => onRemove(t.id)}
          onUpdate={(nextText) => onUpdate(t.id, nextText)} // ← 追加
        />
      ))}
    </ul>
  );
}
