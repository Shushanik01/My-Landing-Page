import { Box, Typography, TextField, Button, Alert } from '@mui/material'
import { useEffect, useState } from 'react'

function SignIn() {

    const BASE_URL = 'https://693d65e6f55f1be79302b8fb.mockapi.io'

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError(null)
    }

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('Username is required')
            return false
        } if (!formData.password.trim()) {
            setError('Password is required')
            return false
        } if (formData.username.length < 6) {
            setError('Username must include at least 6 characters')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return
        setLoading(true)
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/users`);

            const users = await response.json();
            console.log('All users from server:', users);
            
            const user = users.find(user => user.username === formData.username && user.password === formData.password)

            if(user){
                console.log('Account found successfully');
                setSuccess(true)
                setError(null);

                localStorage.clear();

                const token = btoa(JSON.stringify({
                    username: user.username
                }));
                localStorage.setItem('token', token);
                localStorage.setItem('username', user.username);
                console.log('Token saved');

                window.location.href = '/dashboard'
                
            } else {
                console.log('User not found');
                setError('No such account')
                return
            }

        }
        finally{
            setLoading(false)
        }
    }
    return (
        <Box
            sx={{
                backgroundImage: 'url("/signInPage.jpeg")',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',

            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: 450,
                    backgroundColor: 'white',
                    padding: 4
                }}
            >

                <Typography
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#1976d2'
                    }}
                >SignIn to your account  </Typography>

                {error && (
                    <Alert
                        sx={{ mb: 2 }}
                        severity='error'
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity='success'
                        sx={{ mb: 2 }}
                    >
                        Sign in was succesfull
                    </Alert>
                )}

                <TextField
                    label='Enter username'
                    name='username'
                    variant='outlined'
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loading}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label='Enter password'
                    name='password'
                    variant='outlined'
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    sx={{ mb: 3 }}
                />
                <Button color='#1976d2'
                    label="Password"
                    type="submit"
                    variant="outlined"
                    fullWidth

                    sx={{
                        mt: 2,
                        height: 48
                    }}
                    disabled={loading}

                >{loading ? 'Signing In...' : 'Sign In'}</Button>
            </Box>
        </Box>
    )
}
export default SignIn




