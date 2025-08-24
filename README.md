# React Todo App

Vite + React で構築したシンプルな Todo アプリです。  
ローカルストレージに保存するため、ページをリロードしてもタスクは保持されます。

## 特徴

- **追加 / 削除 / 完了トグル** が可能
- **フィルタ機能**（すべて / 未完了 / 完了）
- **インライン編集**（ダブルクリックで編集 → Enter確定 / Escキャンセル）
- **ローカルストレージ保存**（再読み込みしてもタスクが消えない）

## 使用技術

- React 18
- Vite
- Custom Hook (`useLocalStorage`)
- CSS（変数・hover効果・簡単なレスポンシブ）

## 画面イメージ
<img width="367" height="454" alt="スクリーンショット 2025-08-24 204818" src="https://github.com/user-attachments/assets/4b5adf15-2fcc-4e80-8090-073bb9e36080" />


## セットアップ方法

```bash
git clone https://github.com/<yourname>/react-todo-app.git
cd react-todo-app
npm install
npm run dev
