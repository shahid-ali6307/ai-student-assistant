 import { useState } from "react";

function App() {

      const [textArea,setTextArea] = useState('');
      const[mode,setMode] = useState('explain');
      const[resData,setResData] = useState('');
      const[isWaiting,setIsWaiting] = useState(false);

      function handleTextChange(e) {
          setTextArea(e.target.value);
      }

      function handleModeChange(e) {
        setMode(e.target.value);
      }

      async function handleSubmit(e) {
        e.preventDefault();
        setIsWaiting(true);
        const prompt = textArea;
        const response = await fetch('http://localhost:5000/api/ai/generate', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json',
          },
          body : JSON.stringify({prompt,mode})
        });
        const data = await response.json();
        setResData(data);
        if(response.status != 200) { 
          alert(data.message);
          setIsWaiting(false);
          return;
        }
        if(mode == "mcq") {
          try{
            const res_mcq = JSON.parse(data.result);
            setResData({ ...data, result: res_mcq.questions });
          } catch(err) {
            alert(err);
            setIsWaiting(false);
            return;
          }
        }
        setIsWaiting(false);
      }

      return(
        <div>
          
          <textarea value={textArea} onChange={handleTextChange} placeholder="Type your question or text here...." />

           <select value={mode} onChange={handleModeChange}>
                   <option value="explain"> Explain a concept </option>
                   <option value="summarize"> Summarize a concept </option>
                   <option value="improve"> Improve a concept </option>
                   <option value="mcq"> mcq </option>
           </select>

           <button onClick={handleSubmit} disabled={isWaiting}>
            {isWaiting ? "Generating..." : "Submit"}
           </button>

           {isWaiting && <p>The result is on the way...</p> }
           {!isWaiting && resData.result && (
  Array.isArray(resData.result) ? (
    <div>
      {resData.result.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          <ul>
            {q.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ) : (
    <p>{resData.result}</p>
  )
)}
          
        </div>
          
          )

}


export default App;