import './Quiz.css'

const Quiz = () => {
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

                <div className='quiz-content'>
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
                </div>
            </div>
        </div>
    )
}

export default Quiz
