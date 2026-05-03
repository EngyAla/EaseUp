import React, { useState } from 'react';
import { 
    Box, Typography, Avatar, Paper, TextField, IconButton, 
    List, ListItem, ListItemIcon, ListItemText, Divider 
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            text: "Hello! I'm your AI assistant 👋",
            time: new Date().toLocaleTimeString()
        }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: input,
            time: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMessage]);

        const currentInput = input;
        setInput('');
        setLoading(true);

        try {
            const res = await fetch("http://127.0.0.1:8001/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: "1",
                    message: currentInput
                })
            });

            const data = await res.json();

            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                text: data.reply,
                time: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '82vh', bgcolor: '#f9f9f9', p: 0 }}>

        <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray', mb: 2 }}>Today</Typography>


        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {messages.map((msg) => (
            <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', mb: 3, px: 2 }}>
                {msg.type === 'ai' && <Avatar sx={{ bgcolor: '#00796b', mr: 1 }}><SmartToyIcon /></Avatar>}
                
                <Box>
                <Paper sx={{ p: 2, borderRadius: 3, bgcolor: msg.type === 'user' ? '#00796b' : 'white', color: msg.type === 'user' ? 'white' : 'black', maxWidth: '400px' }}>
                    <Typography variant="body1">{msg.text}</Typography>
                    {msg.list && (
                    <List dense>
                        {msg.list.map((item, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemIcon sx={{ minWidth: 30 }}><CheckCircleIcon fontSize="small" sx={{ color: '#00796b' }} /></ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItem>
                        ))}
                    </List>
                    )}
                </Paper>
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, textAlign: msg.type === 'user' ? 'right' : 'left' }}>{msg.time}</Typography>
                </Box>

                {msg.type === 'user' && <Avatar sx={{ ml: 1 }} src="/path-to-your-avatar.jpg" />}
            </Box>
            ))}
        </Box>


        <Paper sx={{ p: 1, borderRadius: 5, display: 'flex', alignItems: 'center', boxShadow: 2, }}>
            <IconButton><AttachFileIcon /></IconButton>
            <input value={input} onKeyDown={handleKeyPress}  onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..."  style={{ marginInline: 2, border: "none", outline: "none", width: "100%" }} />
            <IconButton><EmojiEmotionsIcon /></IconButton>
            <IconButton><MicIcon /></IconButton>
            <IconButton  
                onClick={sendMessage}
                disabled={loading} sx={{ bgcolor: '#00796b', color: 'white', '&:hover': { bgcolor: '#004d40' } }}><SendIcon />
            </IconButton>
        </Paper>

        {/* <Typography variant="caption" sx={{ textAlign: 'center', mt: 2, color: 'gray' }}>
            EaseUp AI may provide inaccurate info. Check important facts.
        </Typography> */}
        </Box>
    );
};

export default ChatBot;