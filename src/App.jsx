import React, { useEffect, useState} from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "vite_react_todos_v1";

export default function App() {
  // State: Todos は配列。{id, text, done}の要素を持つ
  const [todos, setTodos] = useState(() => {
    // 初回レンダー時に localStorage から復元
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // State: フィルタ(all / active / done)
  const [filter, setFilter] = useState("all");

  // 副作用: todos が変わったら localStorage に保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Todo を追加
  const addTodo = (text) => {
    if (!text || !text.trim()) return;
    const newTodo = { id: Date.now(), text: text.trim(), done: false};
    setTodos((prev) => [newTodo, ...prev]);
  }; 

  // 完了トグル
  const toggleTodo = (id) => {
    setTodos((prev) => 
      prev.map((t) => (t.id === id ? { ...t, done: !t.done} : t))
    );
  };

  // 削除
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // フィルタ適用
  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div className="app">
      <h1>Vite + React Todo</h1>

      <TodoInput onAdd={addTodo} />

      <div className="controls">
        <div className="filters">
          <button
            type="button"
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            すべて
          </button>
          <button 
            type="button"
            className={filter === "active" ? "active" : ""}
            onClick={() => setFilter("active")}
          >
            未完了
          </button>
          <button
            type="button"
            className={filter === "done" ? "active" : ""}
            onClick={() => setFilter("done")}
          >
            完了
          </button>
        </div>

        <div className="summary">
          全 {todos.length} 件 / 完了 {todos.filter((t) => t.done).length} 件            
        </div>        
      </div>

    <TodoList
      todos={visibleTodos}
      onToggle={toggleTodo}
      onRemove={removeTodo}
    />
    </div>
  );



}