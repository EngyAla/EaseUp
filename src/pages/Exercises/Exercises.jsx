import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardContent, CardActions, Button, Chip, Stack, CardActionArea, CardMedia } from '@mui/material';
// import api from '../../api/axiosInstance';


const initialExercises = [
    { 
        id: 1, 
        title: 'Deep Breathing', 
        category: 'Breathing', 
        time: '5 MINS', 
        description: 'Reduce stress with breathing...', 
        video: 'https://www.youtube.com/watch?v=aXItOY0sLRY', 
        isCompleted: false, 
        image: '../../../public/assets/Deep Breathing.jpg' // المسار من داخل public
    },
    { 
        id: 2, 
        title: 'Morning Meditation', 
        category: 'Meditation', 
        time: '10 MINS', 
        description: 'Start your day calm...', 
        video: 'https://www.youtube.com/watch?v=ZToicYcHIOU', 
        isCompleted: false, 
        image: '../../../public/assets/Morning Meditation.jpg' 
    },
    { 
        id: 3, 
        title: 'Mindful Stretching', 
        category: 'Movement', 
        time: '8 MINS', 
        description: 'Release tension...', 
        video: 'https://www.youtube.com/watch?v=4BOTvaRaDjI', 
        isCompleted: false,
        image: '../../../public/assets/Gratitude Writing.jfif' 
    },
    { 
        id: 4, 
        title: 'Relaxation', 
        category: 'Meditation', 
        time: '7 MINS', 
        description: 'Muscle relaxation...', 
        video: 'https://www.youtube.com/watch?v=UfcAVejslrU', 
        isCompleted: false, 
        image: '../../../public/assets/Mindful Stretching.jpg' 
    },
    { 
        id: 5, 
        title: 'Gratitude Writing', 
        category: 'Meditation', 
        time: '5 MINS', 
        description: 'Boost positivity...', 
        video: 'https://www.youtube.com/watch?v=7zVYmSxFjGI', 
        isCompleted: false, 
        image: '../../../public/assets/Relaxation.jpg' 
    }
];

const Exercises = () => {
const [exercises, setExercises] = useState(initialExercises);
    const [activeTab, setActiveTab] = useState('All');

    // useEffect(() => {
    //     const fetchExercises = async () => {
    //         try {
    //             const response = await api.get('http://localhost:5296/api/Exercises/all');
    //             setExercises(response.data);
    //         } catch (error) {
    //             console.error("Error fetching exercises:", error);
    //         }
    //     };
    //     fetchExercises();
    // }, []);

    const filteredExercises = activeTab === 'All' 
        ? exercises 
        : exercises.filter(ex => ex.category === activeTab);

    const handleComplete = async (exerciseId) => {
        const exercise = exercises.find(ex => ex.id === exerciseId);
        
        setExercises(prev => prev.map(ex => 
        ex.id === exerciseId ? { ...ex, isCompleted: true } : ex
        ));

        // try {
        // await fetch('/api/user/progress', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //     videoId: exerciseId,
        //     score: exercise.score,
        //     category: exercise.category,
        //     completedAt: new Date()
        //     })
        // });
        // console.log("Progress saved!");
        // } catch (err) {
        // console.error("Error saving progress", err);
        // }
    };

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Exercises</Typography>
        <Typography sx={{ color: "#64748B" }} mb={3}>Simple activities for your mental well-being</Typography>

        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ mb: 3, mt: 4 }}>
            <Tab label="All" value="All" />
            <Tab label="Breathing" value="Breathing" />
            <Tab label="Meditation" value="Meditation" />
            <Tab label="Movement" value="Movement" />
        </Tabs>

            <Grid container spacing={3}>
                {filteredExercises.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea onClick={() => window.open(item.video, '_blank')}>
                                {/* الجزء الخاص بالصورة والوقت */}
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        sx={{width:"400px"}}
                                        image={item.image} // تأكدي أن الـ path صحيح
                                        alt={item.title}
                                    />
                                    {/* هنا الـ Time في أعلى اليسار */}
                                    <Box sx={{ 
                                        position: 'absolute', 
                                        top: 10, 
                                        left: 10, 
                                        bgcolor: 'rgba(0, 0, 0, 0.6)', 
                                        color: 'white', 
                                        px: 1.5, 
                                        py: 0.5, 
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {item.time}
                                    </Box>
                                </Box>

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                                </CardContent>
                            </CardActionArea>

                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button 
                                    fullWidth 
                                    variant={item.isCompleted ? "outlined" : "contained"} 
                                    disabled={item.isCompleted}
                                    onClick={() => handleComplete(item.id)}
                                >
                                    {item.isCompleted ? "Completed" : "Complete"}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Exercises;