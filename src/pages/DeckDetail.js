import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './DeckDetail.css'
import { useDebounce } from '../hooks/useDebounce'

const DeckDetail = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [cards, setCards] = useState([])

    const debouncedValue = useDebounce(searchTerm, 500)
    const filteredCards = useMemo(() => {
        return cards.filter(x => x.term.toLowerCase().includes(debouncedValue) || x.answer.toLowerCase().includes(debouncedValue))
    }, [cards, debouncedValue])

    const { deckId } = useParams()

    useEffect(() => {
        getCards()
    }, [])

    function handleFilterCards(e) {
        setSearchTerm(e.target.value)
    }

    async function getCards() {
        try {
            const response = await fetch(`http://localhost:8000/api/decks/${deckId}/cards`, {
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error("Couldn't fetch cards for deck")
            }
            const data = await response.json()
            setCards(data)
        } catch (err) {
            console.error("Error: ", err.message)
        }
    }

    return (
        <div className='page-wrapper'>
            <Navbar />
            <div className='right-frame'>
                <div className='deck-header'>
                    <div className='deck-header-left'>
                        <Link className='back-btn' to='/my-decks'>← Back to Decks</Link>
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
                            onChange={handleFilterCards}
                        />
                        <button className='add-card-btn'>
                            + Add Card
                        </button>
                    </div>

                    <div className='cards-list'>
                        {filteredCards.map((card, index) => (
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
