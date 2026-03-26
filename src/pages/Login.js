import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Login.css'

const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className='page-wrapper text-blue'>
            <Navbar />
            <div className='right-frame'>
                <div className='login-container'>
                    <h1 className='login-title'>Login</h1>
                    <form className='login-form'>
                        <div className='form-group'>
                            <label>Username</label>
                            <input
                                placeholder="Username"
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                                className='login-input'
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
                                className='login-input'
                            />
                        </div>

                        <button type='submit' className='login-btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
