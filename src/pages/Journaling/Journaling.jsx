/* eslint-disable no-unused-vars */
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import api from '../../api/axiosInstance';

const Journaling = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState(() => {
        const saved = localStorage.getItem("journals");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false); // لإضافة حالة تحميل

    const handleSave = async () => {
    if (entry.trim() === '') return;

    const token = localStorage.getItem('token');
    setLoading(true);

    try {
        // ==============================
        // 1. Sentiment API (FastAPI)
        // ==============================
        const sentimentResponse = await fetch("http://127.0.0.1:8002/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: entry
            })
        });

        const sentimentData = await sentimentResponse.json();

        console.log("Sentiment:", sentimentData);

        // ==============================
        // 2. Backend API (C# / your API)
        // ==============================
        const response = await api.post(
            'http://localhost:5296/api/Students/add-mood-journal',
            {
                Mood: entry,
                Sentiment: sentimentData.sentiment,
                Score: sentimentData.score
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // ==============================
        // 3. Update UI
        // ==============================
        const newEntry = {
            text: entry,
            date: new Date().toLocaleString(),
            sentiment: sentimentData.sentiment,
            score: sentimentData.score
        };

        setEntries((prev) => [newEntry, ...prev]);
        setEntry('');

        console.log(response.data.message);

    } catch (error) {
        console.error("Error:", error);
        alert("Error saving entry");
    } finally {
        setLoading(false);
    }
    };

useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(entries));
}, [entries]);

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: "600" }} gutterBottom>
            Mood Journaling
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
            Take a moment to check in with yourself. How are you feeling today?
        </Typography>

        {/* حقل الإدخال */}
        <Box sx={{ width: '100%', mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Notes Box <span style={{ fontSize: '0.8rem', color: '#999' }}>(Optional)</span>
            </Typography>
            <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            placeholder="What's on your mind? Writing it down helps to process your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            sx={{ mb: 2, backgroundColor: '#f9f9f9' }}
            />
            
            {/* زر الحفظ */}
            <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
            sx={{
                width: '100%',
                backgroundColor: '#00796b',
                '&:hover': { backgroundColor: '#004d40' },
                padding: '12px'
            }}
            >
                {loading ? "Analyzing..." : "Save Entry"}
            </Button>
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', textAlign: "center",  width: "100%" }}>
                Your journal entries are encrypted and private to you.
            </Typography>
        </Box>

        <Box sx={{ width: '100%', mt: 4 }}>
            {/* <Typography variant="h6">Your Entries:</Typography>
            <Divider sx={{ my: 1 }} /> */}
            {entries.map((item, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5',  }}>
                <Typography variant="caption" color="primary" sx={{ fontWeight: "500"}}>
                {item.date}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, wordBreak: "break-word" }}>
                {item.text}
                </Typography>
                <Typography variant="body1" sx={{ color: "#393939", mt: 2, fontWeight: 600}}>
                    Sentiment: {item.sentiment} ({item.score})
                </Typography>
            </Paper>
            ))}
        </Box>
        </Box>
    );
};

export default Journaling;