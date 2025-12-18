import { Box, Button, Typography } from '@mui/material'
import Header from './Header';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
// import SignIn from './SignIn';
import Blogs from './Blogs';
import { Fragment } from 'react';

function App() {
  const location = useLocation();

  const hideHeader = location.pathname === '/signIn' || location.pathname === '/signUp'

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
        {!hideHeader && <Header />}
        {/* <Header /> */}
        <Button color='inherit' component={Link} to='/signIn'
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
        >SignIn
        </Button>

        <Button color='inherit' component={Link} to='/signUp'
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
          SignUp
        </Button>
        <Blogs />

      </Box>

    </Fragment>
  );
}

export default App;
