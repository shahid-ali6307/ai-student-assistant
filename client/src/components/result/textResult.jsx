import "./textResult.css"; 
function TextResult({ result }) {
    return (
        <div className="text-result">
           <p>{result}</p>
        </div>
    );
}

export default TextResult;