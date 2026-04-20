import './Navbar.css'
import { FaLayerGroup, FaPlus, FaQuestionCircle, FaChartBar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

const Navbar = () => {

    const {user, logout} = useAuth()

    return (
        <nav>
            <div className="nav-container">
                <div className="top-nav-wrapper">
                    <img src="/logo192.png" alt="Logo" />
                    <div>Luminora</div>
                </div>
                <ul>
                    <Link to="/my-decks"><li><span className='nav-vertical-bar'></span><FaLayerGroup className="nav-icon" />My Decks</li></Link>
                    <Link to="/progress"><li><span className='nav-vertical-bar'></span><FaChartBar className="nav-icon" />Progress</li></Link>
                </ul>
                <div className="auth-buttons">
                    {!user && <Link to="/signup" className="signup-btn">Sign Up</Link>}
                    {!user && <Link to="/login" className="login-btn">Login</Link>}
                    {user && <button className="logout-btn" onClick={logout}>Logout</button>}
                </div>
                {user && <div className="welcome-text">Welcome, {user.name}</div>}
            </div>
        </nav>
    )
}

export default Navbar