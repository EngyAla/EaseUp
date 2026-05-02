import React from 'react'
import NavBar from './NavBar'
import Box from '@mui/material/Box';
import Hero from './Hero';
import Empowering from './Empowering';
import Footer from './Footer';
import HIW from './HIW';
import Stores from './StuStories/Stories';

const Home = () => {
    return (
        <Box sx={{ bgcolor: "#F6F7F8" }}>
            <NavBar />
            <Box sx={{ }}>
                <Hero />
                <Empowering />
                <HIW />
                <Stores />
                <Footer />
            </Box>
        </Box>
    )
}

export default Home;