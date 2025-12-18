import { AppBar, Toolbar, Typography, Button } from '@mui/material'

function Header() {

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' sx={{flexGrow: 1}}>
                    My landing Page
                </Typography>
                {/* <Button color='inherit'>Home</Button>
                <Button color='inherit'>About</Button>
                <Button color='inherit'>Contact</Button> */}
            </Toolbar>
        </AppBar>
    )
}
export default Header 