import { useState } from 'react'
import Navbar from '../components/Navbar'
import './MyDecks.css'

const MyDecks = () => {

    const [decks, setDecks] = useState(null)

    return (
        <div className='page-wrapper'>
            <Navbar />
            <div className='right-frame'>
                <div className='page-header'>
                    <h1 className='page-title'>My Decks</h1>
                    <button className='new-deck-btn'>
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
    )
}

export default MyDecks
