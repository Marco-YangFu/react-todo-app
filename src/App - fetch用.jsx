// App.jsx
import { useEffect, useState } from "react";

const STORAGE_KEY = "users";

export default function App () {
  const [users, setUsers] = useState(() => {
    // 初期復元（存在しなければ null）
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(!users);
  const [error, setError] = useState(null);

  // 取得（マウント時/初期復元がない時）
  useEffect(() => {
    if(users) return; // もう復元済みであればfetchしない
    const ctrl = new AbortController();
    
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message ?? "unknown error");
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort(); // アンマウント時に中断
  }, [users]);

  // 永続化（users が変わるたび保存）
  useEffect(() => {
    if (users) localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "crimson"}}>Error: {error}</p>;
  if (!users) return <p>No data</p>;

  return (
    <main>
      <h1>Users</h1>
      <button onClick={() => setUsers(null)}>再取得</button>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  );

}