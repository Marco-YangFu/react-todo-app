import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
    const [value, setValue] = useState("");

    const submit = (e) => {
        e.preventDefault();
        onAdd(value);
        setValue("");
    };

    return (
        <form className="todo-input" onSubmit={submit}>
            <input 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="タスクを入力"
                aria-label="タスクを入力"
            />
            <button type="submit">
                追加
            </button>
        </form>
    );
}


