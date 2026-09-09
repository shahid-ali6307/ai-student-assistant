import QuestionCard from "./questionCard";
import "./quiz.css";

function Quiz({
    questions,
    selectedAnswers,
    handleAnswer
}) {
    return (
        <div className="quiz-Container">
            {questions.map((question,index) => (
                <QuestionCard
                    key = {index}
                    question = {question}
                    index={index}
                    selectedAnswer = {selectedAnswers[index]}
                    handleAnswer={handleAnswer}
                />

            ))}
        </div>
    );
}

export default Quiz;