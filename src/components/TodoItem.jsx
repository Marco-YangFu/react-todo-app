import React, { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, onToggle, onRemove, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  // 編集に入ったら自動フォーカス
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      // 既存テキストを全選択したいなら次の行を有効化
      // inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const commitEdit = () => {
    const next = draft.trim();
    // 空は反映しない（そのまま戻す）
    if (next && next !== todo.text) onUpdate(next);
    setEditing(false);
  };

  return (
    <li className={`todo-item ${todo.done ? "done" : ""}`}>
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}                 // フォーカス外れたら確定
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit(); // Enterで確定
            if (e.key === "Escape") cancelEdit(); // Escでキャンセル
          }}
          aria-label="タスク名を編集"
        />
      ) : (
        <span className="text" onDoubleClick={startEdit}>
          {todo.text}
        </span>
      )}

      <div className="buttons">
        <button className="btn-done" onClick={onToggle}>
          {todo.done ? "戻す" : "完了"}
        </button>
        <button className="btn-delete" onClick={onRemove}>
          削除
        </button>
      </div>
    </li>
  );
}
