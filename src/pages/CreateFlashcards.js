import React from 'react'
import Navbar from '../components/Navbar'
import './CreateFlashcards.css'

const CreateFlashcards = () => {
    return (
        <div className='page-wrapper text-blue'>
            <Navbar />
            <div className='right-frame'>
                <h1 className='page-title'>Create Flashcards</h1>
                
                <div className='tabs'>
                    <button className='tab tab-active'>Manual Entry</button>
                    <button className='tab'>AI Generate from Notes</button>
                </div>
                
                <div className='form-row' style={{ display: 'flex', alignItems: "center"}}>
                    <label style={{ marginRight: '1rem' }}>Select Deck</label>
                    <select className='deck-select'>
                        <option>Select a deck</option>
                    </select>
                </div>
                
                <div className='form-row'>
                    <label>Term</label>
                    <textarea className='input-field question-field' placeholder='Enter the term...'></textarea>
                </div>
                
                <div className='form-row'>
                    <label>Answer</label>
                    <textarea className='input-field answer-field' placeholder='The answer to your term...'></textarea>
                </div>
                
                <button className='add-flashcard-btn'>Add Flashcard</button>
            </div>
        </div>
    )
}

export default CreateFlashcards