import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// Assuming result is an object with candidates and usageMetadata properties
interface GeminiResult {
  candidates: string[];
  usageMetadata: object;
}
const text =
  "The palace still shook occasionally as the earth rumbled in memory, groaned as if it would deny what had happened. Bars of sunlight cast through rents in the walls made motes of dust glitter where they yet hung in the air. Scorch-marks marred the walls, the floors, the ceilings. Broad black smears crossed the blistered paints and gilt of once-bright murals, soot overlaying crumbling friezes of men and animals which seemed to have attempted to walk before the madness grew quiet. The dead lay everywhere, men and women and children, struck down in attempted flight by the lightnings that had flashed down every corridor, or seized by the fires that had stalked them, or sunken into stone of the palace, the stones that had flowed and sought, almost alive, before stillness came again. In odd counterpoint, colorful tapestries and paintings, masterworks all, hung undisturbed except where bulging walls had pushed them awry. Finely carved furnishings, inlaid with ivory and gold, stood untouched except where rippling floors had toppled them. The mind-twisting had struck at the core, ignoring peripheral things.";
function App() {
  const [result, setResult] = useState<GeminiResult | null>(null);

  useEffect(() => {
    fetchGeminiResult(text)
      .then((result) => {
        console.log(result);
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
        {result && (
          <div>
            <p>Candidates:</p>
            <ul>
              {result.candidates.map((candidate, index) => (
                <li key={index}>{candidate}</li>
              ))}
            </ul>
            <p>Usage Metadata: {JSON.stringify(result.usageMetadata)}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
