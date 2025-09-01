import { Box, Button, Typography } from "@mui/material";
import { SiHtmx } from "react-icons/si";



const PracticeProblem = () => {
    return(
        <>
        <Box 
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={3}

        sx={{
            backgroundColor:'#4a90e2',
            height:'200px',
            width: '100%',
            borderRadius:'10px'


        }}
        >
            <Typography variant="h4" color="#ffffff" fontWeight={600}>
                Ready to Practice?
            </Typography>
            <Typography variant="h6" color="#ffffff" >
                Test your knowledge with curated linked list problems
            </Typography>
            <Button sx={{padding:3, border:'1px solid #4a90e2', height:'20px', color:'#4a90e2', backgroundColor:'#ffffff', fontWeight:'600', '&:hover':{backgroundColor:'#4a90e2', color:'#ffffff', border:'1px solid #ffffff'}}}>
                <SiHtmx style={{marginRight:5}} /> Start Practice Problem
            </Button>

        </Box>
        </>
    );
}

export default PracticeProblem;