function QuestionCard({
    question,
    index,
    selectedAnswer,
    handleAnswer
}) {
    return (
        <div className="question-card" key={index}>

            <div className="question-number">
              Question {index + 1}
            </div>

            <h2 className="question">
              {question.question}
            </h2>

            <div className="options-container">

              {question.options.map((opt, i) => {

                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === question.correctAnswer;

                return (
                  <button
                    className={`option-btn ${
                      isSelected
                        ? isCorrect
                          ? "correct"
                          : "wrong"
                        : ""
                    }`}
                    key={i}
                    onClick={() => handleAnswer(index, opt)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + i)}
                    </span>

                    <span>{opt}</span>
                  </button>
                );
              })}

            </div>

            {selectedAnswer && (

              <div
                className={
                  selectedAnswer === question.correctAnswer
                    ? "answer-feedback correct-feedback"
                    : "answer-feedback wrong-feedback"
                }
              >

                {selectedAnswer === question.correctAnswer ? (
                  <>
                    <span className="feedback-icon">✓</span>
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="feedback-icon">✕</span>

                    <span>
                      Wrong! Correct answer:{" "}
                      <strong>{question.correctAnswer}</strong>
                    </span>
                  </>
                )}

              </div>

            )}

        </div>
    );
}

export default QuestionCard;