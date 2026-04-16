import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './DeckDetail.css'
import { useDebounce } from '../hooks/useDebounce'
import { findByRole } from '@testing-library/dom'
import Modal from '../components/Modal'

const DeckDetail = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [cards, setCards] = useState([])
    const [activeTab, setActiveTab] = useState("cards") // cards | study | quiz

    const debouncedValue = useDebounce(searchTerm, 500)
    const filteredCards = useMemo(() => {
        return cards.filter(x => x.term.toLowerCase().includes(debouncedValue) || x.answer.toLowerCase().includes(debouncedValue))
    }, [cards, debouncedValue])

    const { deckId } = useParams()

    // Cards tab state
    const [isNewCardOpened, setIsNewCardOpened] = useState(false)
    const [newCard, setNewCard] = useState({term: '', answer: ''})
    const [editingCard, setEditingCard] = useState({id: null, term: '', answer: ''})
    const [cardError, setCardError] = useState('')
    const [isDeleteDeckModalOpened, setIsDeleteDeckModalOpened] = useState(false)

    // Study tab state
    const [currCardIndex, setCurrCardIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [shuffledCards, setShuffledCards] = useState(null)
    const studyCards = shuffledCards || cards
    const currentCard = studyCards[currCardIndex]
    
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

    async function handleDeleteCard(cardId) {
        try {
            const response = await fetch(`http://localhost:8000/api/decks/${deckId}/cards/${cardId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error("Unable to delete card")
            }
            setCards(prevCards => prevCards.filter(card => card.id !== cardId))

        } catch(err) {
            console.error("Error:", err.message)
        }
    }

    // Card tab functions
    function handleOpenNewCard() {
        setIsNewCardOpened(true)
        handleCloseEditingCard()
    }

    function handleCloseNewCard() {
        setNewCard({term: '', answer: ''})
        setCardError('')
        setIsNewCardOpened(false)
    }

    async function handleAddNewCard() {

        const {term, answer} = newCard

        if (!term.length || !answer.length) {
            setCardError("term and answer must be at least one character long")
            return
        }

        try {
            
            const response = await fetch(`http://localhost:8000/api/decks/${deckId}/cards`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({term, answer})
            })
            if (!response.ok) {
                throw new Error("Error adding new card")
            }
            const newCardData = await response.json()
            setCardError('')
            setCards(prevCards => [...prevCards, newCardData])
            
        } catch(err) {
            console.error("Error: ", err.message)
        }
    }

    function handleSetCardToEditMode(card) {
        const {id, term, answer} = card
        setEditingCard({
            id: id,
            term: term,
            answer: answer
        })
        handleCloseNewCard()
    }

    function handleCloseEditingCard() {
        setEditingCard({
            id: null,
            term: '',
            answer: ''
        })
    }


    // Study tab functions
    function prevCard() {

        if (currCardIndex === 0) {
            setCurrCardIndex(filteredCards.length - 1)
        } else {
            setCurrCardIndex(prev => prev - 1)
        }
    }

    function nextCard() {
        setCurrCardIndex(prev => (prev + 1) % filteredCards.length)
    }

    function shuffleCards() {
        const shuffled = [...cards]
        for (let i = 0; i < shuffled.length - 1; i++) {
            const randomIndex = Math.floor(Math.random() * (shuffled.length - 1 - i)) + i;
            [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
        }
        return shuffled
    }

    function handleShuffleCards() {
        setShuffledCards(shuffleCards())
        setCurrCardIndex(0)
        setIsFlipped(false)
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
                    <button className={`tab ${activeTab === "cards" ? "tab-active" : ""}`} onClick={() => setActiveTab("cards")}>
                        Cards
                    </button>
                    <button className={`tab ${activeTab === "study" ? "tab-active" : ""}`} onClick={() => setActiveTab("study")}>
                        Study
                    </button>
                    <button className={`tab ${activeTab === "quiz" ? "tab-active" : ""}`} onClick={() => setActiveTab("quiz")}>
                        Quiz
                    </button>
                </div>

                {/* Cards tab */}
                {activeTab === "cards" && (
                    <div className='cards-tab'>
                        <div className='cards-toolbar'>
                            <input
                                type='text'
                                className='search-input'
                                placeholder='Search cards...'
                                onChange={handleFilterCards}
                            />
                            <button className='add-card-btn' onClick={handleOpenNewCard}>
                                + Add Card
                            </button>
                        </div>

                        <div className='cards-list'>

                            {/* Adding new card */}
                            {isNewCardOpened && (
                            <div className='add-card-form'>
                                <div className='add-card-form-header'>
                                    <h3>Add New Card</h3>
                                </div>
                                <div className='add-card-form-body'>
                                    <div className='form-group'>
                                        <label>Term</label>
                                        <input 
                                            type='text' 
                                            className='form-input'
                                            placeholder='Enter term...'
                                            onChange={(e) => setNewCard(prev => ({...prev, term: e.target.value}))}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Answer</label>
                                        <textarea 
                                            className='form-textarea'
                                            placeholder='Enter answer...'
                                            rows='3'
                                            onChange={(e) => setNewCard(prev => ({...prev, answer: e.target.value}))}
                                        />
                                    </div>
                                    {cardError && <p className='form-error'>{cardError}</p>}
                                    <div className='form-actions'>
                                        <button className='cancel-btn' onClick={handleCloseNewCard}>Cancel</button>
                                        <button className='save-btn' onClick={handleAddNewCard}>Save Card</button>
                                    </div>
                                </div>
                            </div>
                            )}

                            {/* Cards list */}
                            {filteredCards.map((card, index) => (
                                editingCard.id === card.id ? 
                                <div className='add-card-form'>
                                    <div className='add-card-form-header'>
                                        <h3>Add New Card</h3>
                                    </div>
                                    <div className='add-card-form-body'>
                                        <div className='form-group'>
                                            <label>Term</label>
                                            <input 
                                                type='text' 
                                                className='form-input'
                                                placeholder='Enter term...'
                                                value={editingCard.term}
                                                onChange={(e) => setEditingCard(prev => ({...prev, term: e.target.value}))}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label>Answer</label>
                                            <textarea 
                                                className='form-textarea'
                                                placeholder='Enter answer...'
                                                rows='3'
                                                value={editingCard.answer}
                                                onChange={(e) => setEditingCard(prev => ({...prev, answer: e.target.value}))}
                                            />
                                        </div>
                                        {cardError && <p className='form-error'>{cardError}</p>}
                                        <div className='form-actions'>
                                            <button className='cancel-btn' onClick={handleCloseEditingCard}>Cancel</button>
                                            <button className='save-btn' onClick={handleAddNewCard}>Save Card</button>
                                        </div>
                                    </div>
                                </div> :
                                <div key={card.id} className='card-item'>
                                    <div className='card-number'>{index + 1}</div>
                                    <div className='card-content'>
                                        <div className='card-term'>{card.term}</div>
                                        <div className='card-answer'>{card.answer}</div>
                                    </div>
                                    <div className='card-actions'>
                                        <button className='edit-card-btn' onClick={() => handleSetCardToEditMode(card)}>Edit</button>
                                        <button className='delete-card-btn' onClick={() => handleDeleteCard(card.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Modal isOpen={isDeleteDeckModalOpened} onClose={() => setIsDeleteDeckModalOpened(false)}>
                    <div className="modal-overlay" onClick={() => setIsDeleteDeckModalOpened(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Create New Deck</h2>
                                <button className="modal-close-btn" onClick={() => setIsDeleteDeckModalOpened(false)}>
                                    ×
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>Biology 101</strong>? This action cannot be undone.</p>
                            </div>

                            <div className="modal-footer">
                                <button className="cancel-btn" onClick={handleCloseDeleteDeckModal}>
                                    Cancel
                                </button>
                                <button className="save-btn" onClick={handleDeleteDeck}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Study tab tab */}
                {activeTab === "study" && (
                    <div className='study-tab'>
                        <div className='study-progress'>
                            Card {currCardIndex + 1} of {studyCards.length}
                        </div>
                        <div className='flashcard' onClick={() => setIsFlipped(!isFlipped)}>
                            <div className={`flashcard-inner ${isFlipped ? "flipped" : ''}`}>
                                <div className='flashcard-front'>
                                    <div className='flashcard-label'>Term</div>
                                    <div className='flashcard-text'>{currentCard.term}</div>
                                    <div className='flashcard-hint'>Click to flip</div>
                                </div>
                                <div className='flashcard-back'>
                                    <div className='flashcard-label'>Answer</div>
                                    <div className='flashcard-text'>{currentCard.answer}</div>
                                    <div className='flashcard-hint'>Click to flip</div>
                                </div>
                            </div>
                        </div>
                        <div className='study-controls'>
                            <button className='study-btn' onClick={prevCard}>
                                ← Previous
                            </button>
                            <button className='study-btn shuffle-btn' onClick={handleShuffleCards}>
                                Shuffle
                            </button>
                            <button className='study-btn' onClick={nextCard}>
                                Next →
                            </button>
                        </div>
                    </div>
                )}

                {/* Quiz tab */}
                {activeTab === "quiz" && (
                    <div className='quiz-tab'>
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
                )}
            </div>
        </div>
    )
}

export default DeckDetail
