import React, { useState } from "react";
import "./App.css";
import { createWorker } from "tesseract.js";

const fileToDataUri = (file:any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event: any) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
  })

function App() {
  const [textOcr, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLanguage] = useState('eng+vie');

  const handleUploadImage = (event: any) => {
    fileToDataUri(event.target.files[0])
      .then((dataUri: any) => {
        hadnlequickstart(dataUri);
      })
  };

  const hadnlequickstart = async (path: string) => {
    try {
      setLoading(true);
      const worker = createWorker({
        workerBlobURL: true,
      });
      
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      const {
        data: { text },
      } = await worker.recognize(path);
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

  const onChangeLang = (e: any) => {
    setLanguage(e.target.value);
    // window.location.href = `/${e.target.value}`;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <div
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
        </div> */}
        <div style={{ marginBottom: "20px" }}>Select language</div>
        <select onChange={onChangeLang} defaultValue={lang}>
          <option value="eng">English</option>
          <option value="vie">Vietnamese</option>
          <option value="eng+vie">All</option>
        </select>
        <input
          style={{ marginTop: "50px" }}
          accept="image/*"
          onChange={handleUploadImage}
          id="contained-button-file"
          multiple
          type="file"
        />
        <div></div>
        {loading && <h2 className="loading">Loading .......!!</h2>}
        <textarea defaultValue={textOcr} onChange={(e) => setText(e.target.value)}></textarea>
      </header>
    </div>
  );
}

export default App;
