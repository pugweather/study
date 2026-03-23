import './Navbar.css'
import { FaLayerGroup, FaPlus, FaQuestionCircle, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-container">
                <div className="top-nav-wrapper">
                    <img src="logo192.png" alt="Logo" />
                    <div>Luminora</div>
                </div>
                <ul>
                    <Link to="/my-decks"><li><span className='nav-vertical-bar'></span><FaLayerGroup className="nav-icon" />My Decks</li></Link>
                    <Link to="/create-flashcards"><li><span className='nav-vertical-bar'></span><FaPlus className="nav-icon" />Create Flashcards</li></Link>
                    <Link to="/generate-cards"><li><span className='nav-vertical-bar'></span><FaQuestionCircle className="nav-icon" />Generate Cards</li></Link>
                    <Link to="/progress"><li><span className='nav-vertical-bar'></span><FaChartBar className="nav-icon" />Progress</li></Link>
                </ul>
                <div className="auth-buttons">
                    <button className="signup-btn">Sign Up</button>
                    <button className="login-btn">Login</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar