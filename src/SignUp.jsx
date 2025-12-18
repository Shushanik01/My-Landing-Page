import { Box, Grid, Typography, TextField, Button, Alert } from '@mui/material';
import { useState } from 'react';

function SignUp() {

    const BASE_URL = 'https://693d65e6f55f1be79302b8fb.mockapi.io'

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    let Validation = () => {
        if (!credentials.name.trim()) {
            setError('Name is essential');
            return false
        } if (!credentials.email.trim()) {
            setError('Email is essential');
            return false
        }

        // if (!credentials.email.includes('@')) {
        //     setError('Wrong email adress');
        //     return false
        // } 
        if (!credentials.password.trim()) {
            setError('Creating password is essential');
            return false
        } if (credentials.password.length < 6) {
            setError('password should include at least 6 characters');
            return false
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            setError('Invalid email format');
            return false;
        }

        return true
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setCredentials(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
    };

    const handleSignIn = () => {
        window.location.href = '/signIn'
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Validation()) {
            setSuccess(true);
            console.log('Validation process went successful');
        }
        try {
            let request = await fetch(`${BASE_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            let data = await request.json()
            if (request.ok) {
                setSuccess(true);
                setError(null)

                localStorage.clear();
                localStorage.setItem('username', data.name);
                localStorage.setItem('userId', data.id);

                window.location.href = '/dashboard';

                const token = btoa(JSON.stringify({
                    username: data.name,
                    email: data.email,
                    userId: data.id
                }));

                localStorage.setItem('token', token);
            }
        } catch (error) {
            console.log(error);
            setError('Server Error');
        }
    }
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                // flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2
            }}
        >
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 3,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    maxWidth: 450,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >

                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976d2',
                            mb: 1
                        }}
                    >
                        Sign Up
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary'
                        }}
                    >
                        Sign up to continue
                    </Typography>
                </Box>
                {error && (
                    <Alert severity='error' onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity='success'>
                        Account created successfully! Redirecting...
                    </Alert>
                )}
                <TextField
                    label='Enter your name'
                    variant='outlined'
                    fullWidth
                    name='name'
                    value={credentials.name}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            '&:hover fieldset': {
                                borderColor: '#1976d2'
                            }
                        }
                    }}
                />

                <TextField
                    label='Enter your email'
                    type='email'
                    variant='outlined'
                    fullWidth
                    name='email'
                    value={credentials.email}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                        }
                    }}
                />

                <TextField
                    label='Create password'
                    type='password'
                    variant='outlined'
                    fullWidth
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                        }
                    }}
                />


                <Button
                    type='submit'
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        padding: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        textTransform: 'none',
                        boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            boxShadow: '0 6px 16px rgba(25,118,210,0.4)'
                        }
                    }}

                >
                    Sign Up
                </Button>

                <Typography
                    variant="body2"
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mt: 2
                    }}
                >
                    Already have an account?{' '}
                    <Box
                        onClick={handleSignIn}
                        component="span"
                        sx={{
                            color: '#1976d2',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Sign In
                    </Box>
                </Typography >
            </Box>
        </Grid>
    )
}
export default SignUp