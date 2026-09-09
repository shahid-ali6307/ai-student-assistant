 import { useState } from "react";
 import "./App.css";

 import InputCard from "./components/inputCard/inputCard";
 import Quiz from "./components/quiz/quiz";
 import TextResult from "./components/result/textResult";

 import {generateAIResponse} from "./services/aiServices";


function App() {

      const [textArea,setTextArea] = useState('');
      const[mode,setMode] = useState('explain');
      const[resData,setResData] = useState('');
      const[isWaiting,setIsWaiting] = useState(false);
      const [selectedAnswers, setSelectedAnswers] = useState({});

     

      async function handleSubmit(e) {
        e.preventDefault();

        if(!textArea.trim()) {
          alert("Please enter something first.");
          return;
        }

        setIsWaiting(true);
        setResData(null);

        try {
          const data = await generateAIResponse(textArea, mode);

          if(mode === "mcq") {
            const mcqData = JSON.parse(data.result);

            setResData({
               ...data,
               result: mcqData.questions
            });
          } else {
            setResData(data);
          }
        } catch(err) {
          alert(err.message);
        } finally {
          setIsWaiting(false);
        }
  }   

      const handleAnswer = (questionIndex, option) => {
          setSelectedAnswers(prev => ({
             ...prev,
             [questionIndex]: option
            }));
      };

      return(
        <div className="app-container">

         <InputCard 
               textArea={textArea}
               setTextArea={setTextArea}
               mode={mode}
               setMode={setMode}
               handleSubmit={handleSubmit}
               isWaiting={isWaiting}
         />


  {!isWaiting && resData?.result && (
    Array.isArray(resData.result) ? (
         <Quiz 
             questions={resData.result}
             selectedAnswers={selectedAnswers}
             handleAnswer={handleAnswer}
        />
     ) : (
                  <TextResult result={resData.result} />
         )

     )}
      
</div>
        
  );

}


export default App;