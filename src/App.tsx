import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { fetchGeminiResult } from "./apis/gemini";

function App() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetchGeminiResult("Hello World")
      .then((result) => {
        console.log("Gemini result:", result);
        setResult(result);
      })
      .catch((error) => {
        console.error("Error fetching Gemini result:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        {result && <p>Result: {result}</p>}
      </header>
    </div>
  );
}

export default App;
