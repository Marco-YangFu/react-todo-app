import React from "react";

export default function TodoItem({ todo, onToggle, onRemove }) {
    return (
        <li className={`todo-item ${todo.done ? "done": ""}`}>
            <span className="text" onDoubleClick={onToggle}>
                {todo.text}
            </span>
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