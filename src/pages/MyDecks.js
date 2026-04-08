import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import './MyDecks.css'

const MyDecks = () => {

    const [decks, setDecks] = useState(null)
    const [isNewDeckModalOpened, setIsNewDeckModalOpened] = useState(false)
    const [newDeckName, setNewDeckName] = useState('')
    const [error, setError] = useState({})

    useEffect(() => {
        getDecks()
    }, [])

    const handleOpenNewDeckModal = () => {
        setIsNewDeckModalOpened(true)
    }
    const handleCloseNewDeckModal = () => {
        setIsNewDeckModalOpened(false)
        resetNewDeckNameInput()
    }

    const resetNewDeckNameInput = () => {
        setNewDeckName('')
    }

    async function getDecks() {
        try {
            const response = await fetch("http://localhost:8000/api/decks", {
                credentials: "include"
            })
            if (!response.ok) {
                throw new Error("Error: couldn't fetch decks for user")
            }
            const data = await response.json()
            setDecks(data)
        } catch(err) {
            console.error("Error:", err.message)
        }
    }

    async function handleSaveDeck () {
        try {
            const response = await fetch('http://localhost:8000/api/decks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({title: newDeckName})
            })
            if (!response.ok) {
                throw new Error("Failed to save new deck")
            }
            // Success
            handleCloseNewDeckModal()
        } catch(err) {
            setError({error: err.message})
        }
    }

    return (
        <>
            <div className='page-wrapper'>
                <Navbar />
                <div className='right-frame'>
                    <div className='page-header'>
                        <h1 className='page-title'>My Decks</h1>
                        <button className='new-deck-btn' onClick={handleOpenNewDeckModal}>
                            + New Deck
                        </button>
                    </div>

                    <div className='decks-grid'>
                        {decks?.map(deck => (
                            <div key={deck.id} className='deck-card'>
                                <h3 className='deck-title'>{deck.title}</h3>
                                <span className='card-count'>{deck.card_count || 0} cards</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={isNewDeckModalOpened} onClose={() => setIsNewDeckModalOpened(false)}>
                <div className="modal-overlay" onClick={() => setIsNewDeckModalOpened(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="new-deck-modal">
                            <div className="modal-header">
                                <h2>Create New Deck</h2>
                                <button className="close-button" onClick={() => setIsNewDeckModalOpened(false)}>
                                    ×
                                </button>
                            </div>
                            
                            <div className="modal-body">
                                <label htmlFor="deck-name">Deck Name</label>
                                <input
                                    id="deck-name"
                                    type="text"
                                    placeholder="Enter deck name..."
                                    autoFocus
                                    value={newDeckName}
                                    onChange={(e) => setNewDeckName(e.target.value)}
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="cancel-button" onClick={handleCloseNewDeckModal}>
                                    Cancel
                                </button>
                                <button className="save-button" onClick={handleSaveDeck}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MyDecks
