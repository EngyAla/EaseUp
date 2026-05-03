import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import heroImage from '../../../public/assets/hero.png';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const Hero = () => {
    return (
        <Grid id={"Home"} container spacing={{ xs: 2, md: 3 }} columns={12} alignItems="center" sx={{ mb: 10, px: 5, py: 5,  }}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' },  }}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: {xs: "center", md: "flex-start"}}}>
                        <Typography variant='body2' sx={{ width: "fit-content", bgcolor: "#00796B1A", px: 2, py: .5, mb: 2, borderRadius: 5, color: "#00796B" }}>Trusted by 50+ Universities</Typography>
                    </Box>
                    <Typography variant='h2' sx={{ fontWeight: 900, lineHeight: 1, color: "#0F172A", fontSize: { xs: '2.5rem', md: '3.75rem' } }}>Your Safe Space <br /> for Student</Typography>
                    <Typography variant='h2' sx={{ fontWeight: 900, lineHeight: 1, color: "#00796B", fontSize: { xs: '2.5rem', md: '3.75rem' } }}>Mental Well-Being</Typography>
                    <Typography variant='body1' sx={{ fontWeight: 400, color: "#475569", width: { xs: "100%", md: "70%" }, mt: 2 }}>EaseUp provides a comprehensive monitoring system designed to support students' mental health through innovative tracking, AI-driven insights, and professional connectivity.</Typography>
                    <Box sx={{ display: "flex", justifyContent: {xs: "center", md: "flex-start"}, flexWrap: "wrap",  mt: {xs: 2, md: 5}, gap: 1 }}>
                        <Button variant="contained" sx={{ bgcolor: "#00796B",}}>Get Started</Button>
                        <Button variant="" sx={{ color: "#00796B", border: "1px solid #00796B",}}>Learn More</Button>
                    </Box>
                </Box>
            </Grid>
            <Box sx={{ flexGrow: 1 }} />
            <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, width: "100%", maxWidth: { xs: 400, md: 350 }, mt: { xs: 2, md: 0 } }}>
                    <img src={heroImage} style={{ borderRadius: 15 }} width={"100%"} />
                </Box>
            </Grid>
        </Grid>
    )
}

export default Hero;