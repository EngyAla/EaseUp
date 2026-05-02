import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Google, Instagram, LinkedIn, Home, Email, Phone, Print, } from '@mui/icons-material';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';


const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#00796B', color: 'text.secondary',  }}>
        
        {/* Section: Social media */}
        <Box >
            <Box sx={{ 
            display: 'flex', 
            justifyContent: { xs: 'center', lg: 'space-between' }, 
            alignItems: 'center',
            px: 4, py: 2,
            borderBottom: 1, 
            borderColor: 'divider' 
            }}>
            <Box sx={{ display: { xs: 'none', lg: 'block' }, mr: 5 }}>
                <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
                Get connected with us on social networks:
                </Typography>
            </Box>

            <Box>
                {[Facebook, Twitter, Google, Instagram, LinkedIn].map((Icon, index) => (
                <IconButton key={index} color="inherit" size="small" sx={{ mr: 2, color: "#FFFFFF" }}>
                    <Icon fontSize="small" />
                </IconButton>
                ))}
            </Box>
            </Box>
        </Box>

        {/* Section: Links */}
        <Box maxWidth="lg" sx={{ mt: 3, px: 4, py: 2  }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
            
            {/* Company Info */}
            <Grid size={{ xs: 12, md: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', color: "#FFFFFF", fontSize: 22,  }}>
                <SpaOutlinedIcon sx={{ mr: 1, fontSize: 32 }} /> EaseUp
                </Typography>
                <Typography variant="body2" sx={{ color: "#c8cdd3" }}>
                Empowering students to prioritize
                their mental health through
                technology and human-centered
                design.
                </Typography>
            </Grid>
            <Box sx={{ flexGrow: 1 }}/>
            {/* Products */}
            <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: "#FFFFFF", fontSize: 18, }}>
                SERVICES
                </Typography>
                {['Mood Tracking', 'AI Insights', 'Goal Planner', 'Emergency Support'].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#c8cdd3" }}>
                    <Link href="#" color="inherit" underline="hover">{text}</Link>
                </Typography>
                ))}
            </Grid>

            {/* Useful links */}
            <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: "#FFFFFF", fontSize: 18, }}>
                Company
                </Typography>
                {['About Us', 'University Partners', 'Privacy Policy', 'Careers'].map((text) => (
                <Typography key={text} variant="body2" sx={{ mb: 1, color: "#c8cdd3" }}>
                    <Link href="#" color="inherit" underline="hover">{text}</Link>
                </Typography>
                ))}
            </Grid>

            {/* Contact */}
            <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: "#FFFFFF", fontSize: 18, }}>
                CONTACT
                </Typography>
                <Box sx={{color: "#c8cdd3"}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Home sx={{ mr: 2, fontSize: '1rem' }} /> <Typography variant="body2">123 Campus Drive, Boston, MA</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ mr: 2, fontSize: '1rem' }} /> <Typography variant="body2">support@easeup.edu</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Phone sx={{ mr: 2, fontSize: '1rem' }} /> <Typography variant="body2">+1 (555) 123-4567</Typography>
                    </Box>
                </Box>
            </Grid>
            </Grid>
        </Box>

        {/* Copyright */}
        <Box sx={{display:"flex", justifyContent: "space-between", px: 4, py: 2, bgcolor: 'rgba(0, 0, 0, 0.04)', mt: 4, color: "#c8cdd3" }}>
            <Typography variant="body2">
            © 2027 EaseUp System:{' '} All rights reserved.
            </Typography>
            <Typography variant="body2" >
            Terms of Service &nbsp; &nbsp; Cookie Policy.
            </Typography>
        </Box>
        </Box>
    );
};

export default Footer;