import { useState } from 'react'
import Navbar from '../components/Navbar'
import './DeckDetail.css'

const DeckDetail = () => {

    const [cards, setCards] = useState([
        { id: 1, term: 'Photosynthesis', answer: 'The process by which plants convert light energy into chemical energy' },
        { id: 2, term: 'Mitochondria', answer: 'The powerhouse of the cell, responsible for producing ATP' },
        { id: 3, term: 'DNA', answer: 'Deoxyribonucleic acid, the molecule that carries genetic information' },
        { id: 4, term: 'Cell Membrane', answer: 'A protective barrier that controls what enters and exits the cell' },
        { id: 5, term: 'Ribosome', answer: 'Cellular structure responsible for protein synthesis' }
    ])

    return (
        <div className='page-wrapper'>
            <Navbar />
            <div className='right-frame'>
                <div className='deck-header'>
                    <div className='deck-header-left'>
                        <button className='back-btn'>
                            ← Back to Decks
                        </button>
                        <h1 className='deck-title-large'>Biology 101</h1>
                        <span className='deck-card-count'>5 cards</span>
                    </div>
                    <div className='deck-header-right'>
                        <button className='deck-action-btn edit-btn'>Edit Deck</button>
                        <button className='deck-action-btn delete-btn'>Delete Deck</button>
                    </div>
                </div>

                <div className='tabs'>
                    <button className='tab tab-active'>
                        Cards
                    </button>
                    <button className='tab'>
                        Study
                    </button>
                    <button className='tab'>
                        Quiz
                    </button>
                </div>

                <div className='cards-tab'>
                    <div className='cards-toolbar'>
                        <input
                            type='text'
                            className='search-input'
                            placeholder='Search cards...'
                        />
                        <button className='add-card-btn'>
                            + Add Card
                        </button>
                    </div>

                    <div className='cards-list'>
                        {[
                            { id: 1, term: 'Photosynthesis', answer: 'The process by which plants convert light energy into chemical energy' },
                            { id: 2, term: 'Mitochondria', answer: 'The powerhouse of the cell, responsible for producing ATP' },
                            { id: 3, term: 'DNA', answer: 'Deoxyribonucleic acid, the molecule that carries genetic information' },
                            { id: 4, term: 'Cell Membrane', answer: 'A protective barrier that controls what enters and exits the cell' },
                            { id: 5, term: 'Ribosome', answer: 'Cellular structure responsible for protein synthesis' }
                        ].map((card, index) => (
                            <div key={card.id} className='card-item'>
                                <div className='card-number'>{index + 1}</div>
                                <div className='card-content'>
                                    <div className='card-term'>{card.term}</div>
                                    <div className='card-answer'>{card.answer}</div>
                                </div>
                                <div className='card-actions'>
                                    <button className='edit-card-btn'>Edit</button>
                                    <button className='delete-card-btn'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='study-tab' style={{display: 'none'}}>
                    <div className='study-progress'>
                        Card 1 of 5
                    </div>
                    <div className='flashcard'>
                        <div className='flashcard-inner'>
                            <div className='flashcard-front'>
                                <div className='flashcard-label'>Term</div>
                                <div className='flashcard-text'>Photosynthesis</div>
                                <div className='flashcard-hint'>Click to flip</div>
                            </div>
                            <div className='flashcard-back'>
                                <div className='flashcard-label'>Answer</div>
                                <div className='flashcard-text'>The process by which plants convert light energy into chemical energy</div>
                                <div className='flashcard-hint'>Click to flip</div>
                            </div>
                        </div>
                    </div>
                    <div className='study-controls'>
                        <button className='study-btn'>
                            ← Previous
                        </button>
                        <button className='study-btn shuffle-btn'>
                            Shuffle
                        </button>
                        <button className='study-btn'>
                            Next →
                        </button>
                    </div>
                </div>

                <div className='quiz-tab' style={{display: 'none'}}>
                    <h2 className='quiz-title'>Choose a Quiz Type</h2>
                    <div className='quiz-types'>
                        <div className='quiz-type-card'>
                            <div className='quiz-icon'>📝</div>
                            <h3>Fill in the Blank</h3>
                            <p>Complete sentences using terms from your deck</p>
                            <button className='start-quiz-btn'>Start Quiz</button>
                        </div>
                        <div className='quiz-type-card'>
                            <div className='quiz-icon'>✍️</div>
                            <h3>Use in Sentence</h3>
                            <p>Write sentences using the given terms</p>
                            <button className='start-quiz-btn'>Start Quiz</button>
                        </div>
                        <div className='quiz-type-card'>
                            <div className='quiz-icon'>🎯</div>
                            <h3>Multiple Choice</h3>
                            <p>Test your knowledge with multiple choice questions</p>
                            <button className='start-quiz-btn'>Start Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeckDetail
