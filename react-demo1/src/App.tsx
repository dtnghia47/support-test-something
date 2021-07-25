import React from "react";
import "./App.css";
import quickstart from "./utils";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => quickstart()}>Demo button</button>
      </header>
    </div>
  );
}

export default App;
