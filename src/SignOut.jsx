import { Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

function SignOut() {

    let navigate = useNavigate()

const handleSignOut = ()=>{
  if(window.confirm('are you sure you want to sign out?')){
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/')
  }
}
    return (
        <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon/>}
            onClick={handleSignOut}
>
            Sign Out
        </Button>
    )
}
export default SignOut