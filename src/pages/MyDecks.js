import { useState } from 'react'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import './MyDecks.css'

const MyDecks = () => {

    const [decks, setDecks] = useState(null)
    const [isNewDeckModalOpened, setIsNewDeckModalOpened] = useState(false)
    const [newDeckName, setNewDeckName] = useState('')

    const handleOpenNewDeckModal = () => {
        setIsNewDeckModalOpened(true)
    }

    const handleSaveDeck = () => {

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
                            console.log(deck)
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
                                />
                            </div>

                            <div className="modal-footer">
                                <button className="cancel-button" onClick={() => setIsNewDeckModalOpened(false)}>
                                    Cancel
                                </button>
                                <button className="save-button">
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
