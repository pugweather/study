import { useState } from 'react'
import Navbar from '../components/Navbar'
import './Signup.css'

const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    function handleSubmit() {
        // TODO: do this next
    }
 
    function handleChange(e) {
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <div className='page-wrapper text-blue'>
            <Navbar />
            <div className='right-frame'>
                <div className='signup-container'>
                    <h1 className='signup-title'>Create Account</h1>
                    <form className='signup-form'>
                        <div className='form-group'>
                            <label>Name</label>
                            <input 
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                className='signup-input'
                            />
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
                        </div>

                        <button type='submit' className='signup-btn'>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup