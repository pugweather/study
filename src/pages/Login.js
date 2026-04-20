import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidUsername, isValidPassword, startsAndEndsWithAlphanumeric } from '../utils/utils'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/Navbar'
import './Login.css'

const Login = () => {

    const navigate = useNavigate()
    const {user, getUser} = useAuth()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    // console.log(errors)

    async function handleSubmit(e) {

        e.preventDefault()

        let {username, password} = formData

        username = username.trim()

        const newErrors = {}

        // Username
        if (username && (username.length < 3 || username.length > 20)) {
            newErrors.username = "username must be between 3 and 20 characters"
        } else if (username && !isValidUsername(username)) {
            newErrors.username =
            "username must only contain letters, numbers, hyphens, and underscores"
        } else if (username && !startsAndEndsWithAlphanumeric(username)) {
            newErrors.username =
            "username must begin and end with either a letter or number"
        }

        // Password
        if (password && password.length < 8) {
            newErrors.password = "password must be at least 8 characters"
        } else if (password && !isValidPassword(password)) {
            newErrors.password =
            "password must contain at least one letter and one number"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length) return

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({username, password})
            })
            if (!response.ok) {
                const data = await response.json()
                setErrors(prev => ({...prev, password: data.error}))
                return
            }

            await getUser()

            // Success
            navigate('/my-decks')

        } catch(err) {
            setErrors(prev => ({...prev, general: err.message}))
        }

    }

    return (
        <div className='page-wrapper text-blue'>
            <Navbar />
            <div className='right-frame'>
                <div className='login-container'>
                    <h1 className='login-title'>Login</h1>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Username</label>
                            <input
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                                className='login-input'
                            />
                            {errors["username"] && <div className='error-text'>{errors["username"]}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                className='login-input'
                            />
                            {errors["password"] && <div className='error-text'>{errors["password"]}</div>}
                        </div>

                        <button type='submit' className='login-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
