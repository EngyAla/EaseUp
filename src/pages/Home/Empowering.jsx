import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';


const Empowering = () => {
    let cardData = [
        {icon: <SentimentVerySatisfiedIcon sx={{ fontSize: 28 }} />, title: "Mood Tracking", description: "Daily check-ins to monitor emotional trends and identify patterns over time."},
        {icon: <SmartToyOutlinedIcon sx={{ fontSize: 28 }} />, title: "AI Chatbot Support", description: "24/7 conversational support providing immediate resources and empathetic listening."},
        {icon: <TrackChangesOutlinedIcon sx={{ fontSize: 28 }} />, title: "Goal Management", description: "Set and achieve personal wellness milestones tailored to your academic schedule."},
        {icon: <AcUnitOutlinedIcon sx={{ fontSize: 28 }} />, title: "Emergency Monitoring", description: "Real-time alerts for immediate professional intervention when safety is a priority."},
    ]
    return (
        <Box id={"Features"} sx={{ display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#F8FAFC", mb: 5, px: 5, py: 7,  }}>
            <Typography variant='h4' sx={{ color: "#0F172A", fontWeight: 500, textAlign: "center",}}>Empowering Student Well-Being</Typography>
            <Typography variant='body1' sx={{ color: "#475569", fontWeight: 400, textAlign: "center", mt: 2, mb: 4}}>Designed specifically for the modern student experience with privacy and <br />accessibility in mind.</Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                {cardData.map((e, index) =>{
                    return(
                        <Grid size={{ xs: 12, md: 3 }} key={index}>
                            <Card sx={{ boxShadow: 0, border: "1px solid #F1F5F9", scale: 1, transition: ".32s ease-in-out",
                            ":hover":{ scale: 1.05,} }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Box>
                                            <Typography sx={{width: "fit-content", bgcolor: "#00796B1A", px: 2, py: 1, mb: 2, borderRadius: 2,  color: "#00796B"}}>{e.icon}</Typography>
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

export default Empowering;