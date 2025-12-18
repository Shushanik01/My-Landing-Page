import { Box, Button, Typography } from '@mui/material';
import Header from './Header';
import { Link } from 'react-router-dom';
import Blogs from './Blogs';
import { Fragment } from 'react';

function App() {
    return (
        <Fragment>
            <Box
                sx={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/IMG_1794.jpeg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100vh'
                }}
            >
                <Header />
                
                <Button 
                    color='inherit' 
                    component={Link} 
                    to='/signIn'
                    sx={{
                        position: 'absolute',
                        top: 75,
                        right: 15,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 30px rgba(25,118,210,0.5)'
                        }
                    }}
                >
                    Sign In
                </Button>
                
                <Button 
                    color='inherit' 
                    component={Link} 
                    to='/signUp'
                    sx={{
                        position: 'absolute',
                        top: 75,
                        right: 80,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 30px rgba(25,118,210,0.5)'
                        }
                    }}
                >
                    Sign Up
                </Button>
                
                <Blogs />
            </Box>
        </Fragment>
    );
}

export default App;