import { useState } from 'react'
import './Quiz.css'

const Quiz = () => {
    const [quizType, setQuizType] = useState('multiple-choice') // 'multiple-choice' | 'fill-blank' | 'use-in-sentence'

    return (
        <div className='quiz-page'>
            <div className='quiz-container'>
                <div className='quiz-header'>
                    <button className='back-btn'>
                        ← Back to Deck
                    </button>
                    <h1 className='quiz-title'>Quiz</h1>
                    <span className='quiz-progress'>
                        Question 1 of 3
                    </span>
                </div>

                {/* Hardcoded toggle for testing */}
                <div className='quiz-type-toggle'>
                    <button className={quizType === 'multiple-choice' ? 'active' : ''} onClick={() => setQuizType('multiple-choice')}>
                        Multiple Choice
                    </button>
                    <button className={quizType === 'fill-blank' ? 'active' : ''} onClick={() => setQuizType('fill-blank')}>
                        Fill in the Blank
                    </button>
                    <button className={quizType === 'use-in-sentence' ? 'active' : ''} onClick={() => setQuizType('use-in-sentence')}>
                        Use in Sentence
                    </button>
                </div>

                <div className='quiz-content'>
                    {/* Multiple Choice UI */}
                    {quizType === 'multiple-choice' && (
                        <div className='question-card'>
                            <h2 className='question-text'>
                                What is the powerhouse of the cell?
                            </h2>

                            <div className='options-list'>
                                <button className='option-btn'>
                                    Nucleus
                                </button>
                                <button className='option-btn'>
                                    Mitochondria
                                </button>
                                <button className='option-btn'>
                                    Ribosome
                                </button>
                                <button className='option-btn'>
                                    Golgi apparatus
                                </button>
                            </div>

                            <div className='result-feedback'>
                                <p className='correct'>Correct!</p>
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
                    {quizType === 'fill-blank' && (
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
