import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';

const HIW = () => {
    let cardData = [
        {icon: <DrawOutlinedIcon sx={{ fontSize: 30 }} />, title: "1. Track Your Mood", description: "Log your daily feelings through a simple 10-second interface every morning."},
        {icon: <PsychologyOutlinedIcon sx={{ fontSize: 30, transform: "scaleX(-1)" }} />, title: "2. Receive AI Insights", description: "Our AI analyzes patterns to provide personalized advice and identify early stressors."},
        {icon: <VolunteerActivismOutlinedIcon sx={{ fontSize: 30 }} />, title: "3. Get Support", description: "Connect with university counselors or resources the moment you need them."},
    ]
    return (
        <Box id={"Process"} sx={{ display: "flex", flexDirection: "column", alignItems: "center",  mb: 5, px: 5, py: 5,  }}>
            <Typography variant='h4' sx={{ color: "#0F172A", fontWeight: 500, textAlign: "center", mb: 5}}>How It Works</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {cardData.map((e, index) =>{
                    return(
                        <Grid size={{ xs: 12, md: 4 }} key={index}>
                            <Card sx={{ bgcolor: "transparent", boxShadow: 0, border: "none", scale: 1, transition: ".32s ease-in-out",
                            ":hover":{ scale: 1.05,} }}>
                                <CardActionArea>
                                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
                                        <Box>
                                            <Typography sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "70px", height: "70px",  border: "3px solid #00796B", boxShadow: 2,  mb: 2, borderRadius: "50%",  color: "#00796B"}}>{e.icon}</Typography>
                                        </Box>
                                        <Typography variant="h5" sx={{ color: "#0F172A", fontWeight: 500 }}>
                                            {e.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
                                            {e.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default HIW;