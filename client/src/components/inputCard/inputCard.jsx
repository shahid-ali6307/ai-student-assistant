import "./inputCard.css";

function InputCard({
    textArea,
    setTextArea,
    mode,
    setMode,
    handleSubmit,
    isWaiting
}) {
    function handleTextChange(e) {
          setTextArea(e.target.value);
      }

      function handleModeChange(e) {
        setMode(e.target.value);
      }

      return (
 <div className="input-card">
    <textarea
      className="question-input"
      value={textArea}
      onChange={handleTextChange}
      placeholder="Type your question or text here...."
    />

    <div className="controls">

      <select
        className="mode-select"
        value={mode}
        onChange={handleModeChange}
      >
        <option value="explain">Explain a concept</option>
        <option value="summarize">Summarize a concept</option>
        <option value="improve">Improve a concept</option>
        <option value="mcq">MCQ</option>
      </select>

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={isWaiting}
      >
        {isWaiting ? "Generating..." : "Submit"}
      </button>

     </div>

    {isWaiting && (
      <p className="loading-text">
        The result is on the way...
      </p>
    )}

</div>
      );
}

export default InputCard;