// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
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