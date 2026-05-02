import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router';



const RightSideHeader = ({backToHome, title, subTitle}) => {
    return (
        <>
            {backToHome&& (
                <Link to={'/'} style={{ textDecoration: "none" }}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 1, color: "#8e949c", }}>
                        <ArrowBackIcon sx={{ fontSize: "16px" }}/>
                        <Typography variant='body2' sx={{  fontSize: "14px" }}>Back to home page</Typography>
                    </Box>
                </Link>
            )}
            <Box sx={{display: "flex", flexDirection: "column", my: 2}}>
                <Typography variant='h4' sx={{ fontSize: "30px", fontWeight: "700", color: "#0F172A"}}>{title}</Typography>
                <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: "400", color: "#64748B", mt: 1}}>{subTitle}</Typography>
            </Box>
        </>
    )
}

export default RightSideHeader;