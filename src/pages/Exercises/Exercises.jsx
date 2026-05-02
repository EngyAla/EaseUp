import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardContent, CardActions, Button, Chip, Stack, CardActionArea, CardMedia } from '@mui/material';
import exercisesImage from '../../assets/exercise.jpg'

const initialExercises = [
    { id: 1, title: 'Deep Breathing', category: 'Breathing', duration: '5 MINS', description: 'Focus on your breath...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    { id: 2, title: 'Morning Meditation', category: 'Meditation', duration: '10 MINS', description: 'Start your day...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    { id: 2, title: 'Morning Meditation', category: 'Meditation', duration: '10 MINS', description: 'Start your day...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    { id: 2, title: 'Morning Meditation', category: 'Meditation', duration: '10 MINS', description: 'Start your day...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    { id: 2, title: 'Morning Meditation', category: 'Meditation', duration: '10 MINS', description: 'Start your day...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    { id: 2, title: 'Morning Meditation', category: 'Meditation', duration: '10 MINS', description: 'Start your day...', link: 'https://youtube.com/...', completed: false, score: 5, img: exercisesImage },
    // ... باقي البيانات
];

const Exercises = () => {
    const [exercises, setExercises] = useState(initialExercises);
    const [activeTab, setActiveTab] = useState('All');

    // فلترة البيانات بناءً على التاب
    const filteredExercises = activeTab === 'All' 
        ? exercises 
        : exercises.filter(ex => ex.category === activeTab);

    // دالة التعامل مع ضغطة Complete
    const handleComplete = async (exerciseId) => {
        const exercise = exercises.find(ex => ex.id === exerciseId);
        
        // 1. تحديث الـ State محلياً
        setExercises(prev => prev.map(ex => 
        ex.id === exerciseId ? { ...ex, completed: true } : ex
        ));

        try {
        await fetch('/api/user/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            videoId: exerciseId,
            score: exercise.score,
            category: exercise.category,
            completedAt: new Date()
            })
        });
        console.log("Progress saved!");
        } catch (err) {
        console.error("Error saving progress", err);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Exercises</Typography>
        <Typography color="text.secondary" mb={3}>Simple activities for your mental well-being</Typography>

        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ mb: 3 }}>
            <Tab label="All" value="All" />
            <Tab label="Breathing" value="Breathing" />
            <Tab label="Meditation" value="Meditation" />
            <Tab label="Movement" value="Movement" />
        </Tabs>

            <Grid container spacing={3} >
            {filteredExercises.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ width: 300}}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardActionArea onClick={() => window.open(item.link, '_blank')}>
                    <CardMedia
                        component="img"
                        height="160"
                        image={item.img}
                        alt={item.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        {/* <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Chip label={item.category} size="small" color="primary" variant="outlined" />
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{item.duration}</Typography>
                        </Stack> */}
                        <Typography variant="h6" gutterBottom>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.description}</Typography>
                    </CardContent>
                    </CardActionArea>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                        fullWidth 
                        variant={item.completed ? "outlined" : "contained"} 
                        disabled={item.completed}
                        onClick={() => handleComplete(item.id)}
                    >
                        {item.completed ? "Completed" : "Complete"}
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