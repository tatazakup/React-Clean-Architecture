import React from "react";
import ReactDOM from "react-dom/client";
import { TodoPage } from "@pages/TodoPage/TodoPage";
import "./styles/styles.css";

export const CoreProvider: React.FC = () => {
  return <TodoPage />;
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<CoreProvider />);
} else {
  console.error("Element with ID 'root' not found in the DOM.");
}
