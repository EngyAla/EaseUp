import React, { useEffect, useState } from 'react'
import VibrationIcon from '@mui/icons-material/Vibration';
import { Box, Button, IconButton, Typography } from '@mui/material';
import OtpForm from './OtpForm';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router';

const OtpTxtContent = () => {
    const [timeLeft, setTimeLeft] = useState(300);
    useEffect(() => {
        if (timeLeft <= 0) return; 
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    return (
        <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: { xs: 3, md: 5 }, textAlign: "center", gap: 3}}>
            <IconButton sx={{ p: 2, bgcolor: "#EAF3FD"}}>
                <VibrationIcon sx={{ color: "#00796B", fontSize: { xs: "48px", md: "64px" } }}/>
            </IconButton>
            <Typography variant='h4' sx={{ color: "#0F172A", fontWeight: 600, fontSize: { xs: "1.5rem", md: "2.125rem" } }}>Two-Factor <br /> Authentication</Typography>
            <Typography variant='body2' sx={{ color: "#64748B" }}>We've sent a 6-digit verification code to your <br /> registered device. Please enter it below to <br /> securely log in.</Typography>
            <OtpForm />
            <Button variant='contained'>
                <Link to={'/login'} style={{ color: "#fff", textDecoration: "none" }}>
                    Verify Identity
                </Link>
            </Button>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 500, fontSize: 14, marginTop: -1}}>
                Didn't receive the code? &nbsp;
                <span style={{ color: "#00796B", textDecoration: "none" }}>
                    Resend Code
                </span>
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "#f0f1f3", px: 3, py: 1, borderRadius: "50px"}}> 
                <InfoIcon sx={{ color: "#94A3B8", fontSize: "16px"}} />
                <Typography variant='body2' sx={{ color: "#64748B"}}>
                    {timeLeft > 0 
                        ? `Code expires in ${formatTime(timeLeft)}` 
                        : "Code expired. Please resend."}
                </Typography>
            </Box>
        </Box>
        </>
    )
}

export default OtpTxtContent;