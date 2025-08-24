import React, { useState } from "react";

export default function Counter({ label = "カウンター", step = 1, value = 0, onChange }) {
    const inc = () => onChange?.(value + step);
    const dec = () => onChange?.(value - step);
    const reset = () => onChange?.(0);

    return (
        <div style={{ display: "inline-flex", gap: 8, alignItems: "center"}}>
            <strong>{label}</strong>
            <span>{value}</span>
            <button type="button" onClick={inc}>+{step}</button>
            <button type="button" onClick={dec}>-{step}</button>
            <button type="button" onClick={reset}>リセット</button>
        </div>
    );
}