import React, { useState } from "react";
import "./App.css";
import { createWorker } from "tesseract.js";

function App() {
  const [textOcr, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const hadnlequickstart = async (path: string) => {
    try {
      console.log("###start");
      setLoading(true);

      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(path);
      console.log("####terminate: ", text);
      setText(() => {
        setLoading(false);
        return text;
      });
      await worker.terminate();
    } catch (err) {
      console.log(err);
      setText("");
      setLoading(false);
    }
  };
  console.log("###loading:", loading);
  return (
    <div className="App">
      <header className="App-header">
        <div
          className="row"
          style={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <a
            href="https://i.imgur.com/s5dvxXD.jpeg"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://i.imgur.com/s5dvxXD.jpeg" className="text-img" alt="img" />
          </a>
          <button
            onClick={() => hadnlequickstart("https://i.imgur.com/s5dvxXD.jpeg")}
          >
            check external image
          </button>
        </div>
        <div
          className="row"
          style={{ marginBottom: "50px" }}
        >
          <a
            href="/assets/demo.png"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/assets/demo.png" className="text-img" alt="img" />
          </a>
          <button
            onClick={() => hadnlequickstart("/assets/demo.png")}
          >
            check local image
          </button>
        </div>
        {loading && <h2 className="loading">Loading .......!!</h2>}
        <textarea value={textOcr}></textarea>
      </header>
    </div>
  );
}

export default App;
