import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidName, isValidEmail, isValidPassword, isValidUsername, startsAndEndsWithAlphanumeric} from '../utils/utils'
import Navbar from '../components/Navbar'
import './Signup.css'

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    async function handleSubmit(e) {

        e.preventDefault()

        let { name, username, email, password, confirmPassword } = formData

        name = name.trim()
        username = username.trim()
        email = email.trim()
        password = password.trim()
        confirmPassword = confirmPassword.trim()

        const newErrors = {}

        const fields = { name, username, email, password, confirmPassword }

        // General errors
        for (const [key, value] of Object.entries(fields)) {
            if (!value) {
            if (key === "confirmPassword") {
                newErrors[key] = "must enter password to confirm"
            } else {
                newErrors[key] = `${key} is required`
            }
            }
        }

        // Name
        if (name && (name.length < 3 || name.length > 50)) {
            newErrors.name = "name must be between 3 and 50 characters"
        } else if (name && !isValidName(name)) {
            newErrors.name =
            "name must only contain valid characters (A-Z, hyphens, and spaces)"
        }

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

        // Email
        if (email && !isValidEmail(email)) {
            newErrors.email = "please enter a valid email"
        }

        // Password
        if (password && password.length < 8) {
            newErrors.password = "password must be at least 8 characters"
        } else if (password && !isValidPassword(password)) {
            newErrors.password =
            "password must contain at least one letter and one number"
        }

        // Confirm password match (you said you'd add this — included it)
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confirmPassword = "passwords do not match"
        }

        setErrors(newErrors)

        // Don't fetch if we have errors
        if (Object.keys(newErrors).length > 0) return

        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, username, email, password})
            })
            if (!response.ok) {
                setErrors(prev => ({...prev, general: response.error || "Something went wrong"}))
                return
            }

            // Success
            navigate("/login")

        } catch(err) {
            setErrors(prev => ({...prev, general:  "Network error. Please try again"}))
        }

    }
 
    function handleChange(e) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    console.log(errors)

    return (
        <div className='page-wrapper text-blue'>
            <Navbar />
            <div className='right-frame'>
                <div className='signup-container'>
                    <h1 className='signup-title'>Create Account</h1>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label>Name</label>
                            <input 
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className='signup-input'
                                required
                            />
                            {errors["name"] && <div className='error-text'>{errors["name"]}</div>}
                        </div>
                        
                        <div className='form-group'>
                            <label>Username</label>
                            <input 
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                                className='signup-input'
                                required
                            />
                            {errors["username"] && <div className='error-text'>{errors["username"]}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Email</label>
                            <input 
                                type='email'
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className='signup-input'
                                required
                            />
                            {errors["email"] && <div className='error-text'>{errors["email"]}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input 
                                type='password'
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                className='signup-input'
                                required
                            />
                            {errors["password"] && <div className='error-text'>{errors["password"]}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Confirm Password</label>
                            <input 
                                type='password'
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                className='signup-input'
                                required
                            />
                            {errors["confirmPassword"] && <div className='error-text'>{errors["confirmPassword"]}</div>}
                        </div>

                        <button type='submit' className='signup-btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup