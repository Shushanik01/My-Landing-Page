import { Box, Container, Typography, Button } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"

function Blogs() {

    const navigate = useNavigate();
function handleClick(){
navigate('/dashboard')
}
    return (
        <Box
            sx={{
                minHeight: '80vh',
                // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3
            }}
        >
            <Container maxWidth='md'>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 6,
                        borderRadius: 4,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            color: '#1976d2',
                            mb: 2
                        }}
                    >
                        Join our online community</Typography>
                    <Typography variant="h6"
                        sx={{
                            color: 'text.secondary',
                            mb: 4
                        }}
                    >Click to see latest postst & news on our Blog 👇</Typography>
                    <Typography
                        paragraph
                        sx={{
                            fontSize: '18px',
                            lineHeight: 1.8,
                            color: 'text.primary',
                            mb: 4,
                            textAlign: 'justify'
                        }}
                    >Our community blog is a space for developers who love learning, sharing, and growing together.
                        We post interactive and engaging content, including tech insights, industry news, hands-on challenges, and thought-provoking discussions.
                        It’s an active, supportive community where programmers exchange ideas, improve their skills, and stay inspired.</Typography>
                    <Button
                     variant="contained"
                        size="large"
                        sx={{
                            backgroundColor: '#1976d2',    
                            color: 'white',                
                            padding: '14px 40px',          
                            fontSize: '18px',              
                            fontWeight: 'bold',            
                            borderRadius: 2,               
                            textTransform: 'none',         
                            boxShadow: '0 4px 20px rgba(25,118,210,0.4)', 
                            transition: 'all 0.3s ease',   
                            '&:hover': {
                                backgroundColor: '#1565c0', 
                                transform: 'translateY(-3px)', 
                                boxShadow: '0 8px 30px rgba(25,118,210,0.5)'  
                            }
                        }}
                        onClick={handleClick}
                    >Explore Blogs!</Button>
                </Box>
            </Container>
        </Box>
    )
}
export default Blogs