import { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import './Quiz.css'

const Quiz = () => {

    const location = useLocation()
    const { quiz, quizConfig, deck, type, cards } = location.state || {}

    const [quizType, setQuizType] = useState(type) // 'multiple-choice' | 'fill-in-the-blank' | 'use-in-sentence'
    const [currQuestionIndex, setCurrQuestionIndex] = useState(0)

    const { deckId } = useParams()
    const questions = quiz?.questions ? quiz.questions : []
    const currQuestion = questions[currQuestionIndex]

    // Multiple choice state
    const [MCAnswers, setMCAnswers] = useState({})
    
    console.log(currQuestion)

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
        
    }

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

                {/* Hardcoded toggle for testing */}
                {/* <div className='quiz-type-toggle'>
                    <button className={quizType === 'multiple-choice' ? 'active' : ''} onClick={() => setQuizType('multiple-choice')}>
                        Multiple Choice
                    </button>
                    <button className={quizType === 'fill-in-the-blank' ? 'active' : ''} onClick={() => setQuizType('fill-in-the-blank')}>
                        Fill in the Blank
                    </button>
                    <button className={quizType === 'use-in-sentence' ? 'active' : ''} onClick={() => setQuizType('use-in-sentence')}>
                        Use in Sentence
                    </button>
                </div> */}

                <div className='quiz-content'>
                    {/* Multiple Choice UI */}
                    {quizType === 'multiple-choice' && (
                        <div className='question-card'>
                            <h2 className='question-text'>
                                {currQuestion?.question}
                            </h2>

                            <div className='options-list'>
                                {
                                    currQuestion.options.map((x, i)=> <button key={x} className='option-btn' onClick={() => handleSelectMultipleChoiceOption(i)}>{x}</button>)
                                }
                            </div>

                            <div className='result-feedback'>
                                <p className='correct'>Correct!</p>
                                <p className='incorrect'>Incorrect!</p>
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

                    {/* Fill in the Blank UI */}
                    {quizType === 'fill-in-the-blank' && (
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
                    {quizType === 'use-in-sentence' && (
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
