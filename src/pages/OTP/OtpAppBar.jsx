import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../../../public/assets/logo3.png';
import ShieldIcon from '@mui/icons-material/Shield';


function OtpAppBar() {

    return (
        <AppBar position="static" sx={{ bgcolor: "#fff", color: "#0F172A"}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <img src={logo} style={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: "50px" }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                mx: 1,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
                }}
            >
                EaseUp
            </Typography>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#"
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,  
                // fontFamily: 'monospace',
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                EaseUp
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1}}>
                <Typography variant='body2' sx={{ color: "#64748B" }}>Secure Session</Typography>
                <IconButton sx={{ p: 1, bgcolor: "#EAF3FD" }}>
                    <ShieldIcon sx={{ color: "#00796B", }}/>
                </IconButton>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
}
export default OtpAppBar;
