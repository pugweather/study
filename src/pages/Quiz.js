import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './Quiz.css'

const Quiz = () => {

    const location = useLocation()
    const { quiz, quizConfig, deck, type, cards } = location.state || {}

    const [currQuestionIndex, setCurrQuestionIndex] = useState(0)

    const { deckId } = useParams()
    const questions = quiz?.questions ? quiz.questions : []
    const currQuestion = questions[currQuestionIndex]

    // Multiple choice state
    const [MCAnswers, setMCAnswers] = useState({})
    
    console.log(MCAnswers)

    function getQuizTypeLabel(type) {
        const bank = {
            'multiple-choice': 'Multiple Choice',
            'fill-in-the-blank': 'Fill in the Blank',
            'use-in-sentence': 'Use in Sentence'
        }
        return bank[type] || 'Quiz'
    }

    // Multiple choice
    function handleSelectMultipleChoiceOption(selectedIndex) {
        const correctAnswerIndex = Number(currQuestion?.correctAnswer)
        setMCAnswers(prevAnswers => ({...prevAnswers, [currQuestionIndex]: {selected: selectedIndex, correct: selectedIndex === correctAnswerIndex ? true : false}}))
    }
    
    // General util functions
    function handleGoNextQuestion() {
        if (currQuestionIndex === questions.length - 1) {
            console.log("Quiz complete!")
            return
        }
        setCurrQuestionIndex(prev => prev + 1)
    }

    function handleGoPrevQuestion() {
        if (currQuestionIndex === 0) {
            return
        }
        setCurrQuestionIndex(prev => prev - 1)
    }
    
    // console.log(MCAnswers)
    console.log(currQuestion)

    return (
        <div className='quiz-page'>
            <div className='quiz-container'>
                <div className='quiz-header'>
                    <Link className='back-btn' to={`/decks/${deckId}`}>
                        ← Back to Decks
                    </Link>
                    <h1 className='quiz-title'>{deck.title} - {getQuizTypeLabel(type)}</h1>
                    <span className='quiz-progress'>
                        Question 1 {quizConfig.numQuestions ? `of ${quizConfig.numQuestions}` : ''}
                    </span>
                </div>

                <div className='quiz-content'>
                    {/* Multiple Choice UI */}
                    {type === 'multiple-choice' && (
                        <div className='question-card'>
                            <h2 className='question-text'>
                                {currQuestion?.question}
                            </h2>

                            <div className='options-list'>
                                {currQuestion.options.map((x, i) => {
                                    return <button key={x} className={`option-btn ${MCAnswers?.[currQuestionIndex]?.correct === true ? "correct" : MCAnswers?.[currQuestionIndex]?.correct === false ? "incorrect" : ""}`} onClick={() => handleSelectMultipleChoiceOption(i)}>{x}</button>
                                })}
                            </div>

                            <div className='result-feedback'>
                                {MCAnswers?.[currQuestionIndex]?.correct === true && <p className='correct'>Correct!</p>}
                                {MCAnswers?.[currQuestionIndex]?.correct === false && <p className='incorrect'>Incorrect!</p>}
                            </div>

                            <div className='quiz-controls'>
                                <button className='control-btn' onClick={handleGoPrevQuestion}>
                                    ← Previous
                                </button>
                                <button className='control-btn' onClick={handleGoNextQuestion}>
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Fill in the Blank UI */}
                    {type === 'fill-in-the-blank' && (
                        <>
                            <div className='question-card'>
                                <h2 className='question-text'>
                                    The process by which plants convert light energy into chemical energy is called ____.
                                </h2>

                                <div className='input-answer'>
                                    <input type='text' placeholder='Type your answer...' />
                                </div>

                                <div className='result-feedback'>
                                    <p className='correct'>Correct! Photosynthesis</p>
                                </div>

                                <div className='quiz-controls'>
                                    <button className='control-btn'>
                                        ← Previous
                                    </button>
                                    <button className='control-btn'>
                                        Next →
                                    </button>
                                </div>
                            </div>
                            {cards && (
                                <div className='terms-grid'>
                                    {cards.map(card => (
                                        <div key={card.id} className='term-pill'>
                                            {card.term}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Use in Sentence UI */}
                    {type === 'use-in-sentence' && (
                        <div className='question-card'>
                            <h2 className='question-text'>
                                Use the term "Mitochondria" in a sentence.
                            </h2>

                            <div className='input-answer'>
                                <textarea placeholder='Write your sentence...' rows='4' />
                            </div>

                            <div className='result-feedback'>
                                <p className='correct'>Good usage!</p>
                            </div>

                            <div className='quiz-controls'>
                                <button className='control-btn'>
                                    ← Previous
                                </button>
                                <button className='control-btn'>
                                    Next →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Quiz
