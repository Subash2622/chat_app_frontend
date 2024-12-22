import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import toast from "react-hot-toast";

function App() {
  return (
    <div>
      <h1>This is the main page</h1>
      <button
        onClick={() => {
          toast.success("This is toast message");
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
