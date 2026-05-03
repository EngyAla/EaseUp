import React, { useEffect, useState } from 'react';
import { 
    Container, Grid, Paper, TextField, Button, Typography, 
    Box, LinearProgress, Stack, Divider, 
    FormControl,
    Select,
    MenuItem,
    InputLabel
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import api from '../../api/axiosInstance';

const Goals = () => {
    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem('my_app_goals');
        try {
            return savedGoals ? JSON.parse(savedGoals) : [];
        } catch {
            return [];
        }
    });
    // 2. حفظ البيانات في الـ LocalStorage كلما تغيرت قائمة الـ goals
    useEffect(() => {
        localStorage.setItem('my_app_goals', JSON.stringify(goals));
    }, [goals]);


    

    const [formData, setFormData] = useState({ 
        title: '', 
        goalDescription: '', 
        deadLine: '', 
        priority: 1, 
        items: '' // سنستخدمها كـ comma-separated string
    });
    const itemsArray = formData.items.split(',').map(item => item.trim()).filter(i => i !== "");

    const saveToBackend = async (goalData) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await api.post(
                'http://localhost:5296/api/Goals/add-new-goal', 
                goalData,
                { headers: { 'Authorization': `Bearer ${token}` } } 
            );
            console.log("Success:", response.data);
            
            return true;
        } catch (error) {
            console.error("Error saving goal", error);
            alert("فشل الحفظ: " + (error.response?.data?.message || "خطأ غير معروف"));
            return false;
        }
    };

    const handleCreateGoal = async () => {
    if (!formData.title) return;

    // 2. تجهيز التاريخ
    // إذا كان التاريخ فارغاً، نرسل null بدل ""
    const formattedDate = formData.deadLine ? formData.deadLine : null;

    const newGoal = {
        title: formData.title,
        goalDescription: formData.goalDescription,
        deadLine: formattedDate, // سيرسل "yyyy-MM-dd" أو null
        priority: parseInt(formData.priority),
        items: formData.items.split(',').map(item => item.trim()).filter(i => i !== "")
    };

        const success = await saveToBackend(newGoal);
        
        if (success) {
            // تحديث الواجهة باستخدام طول المصفوفة الفعلي
        setGoals([...goals, { 
            ...newGoal, 
            id: Date.now(), 
            completedSubtasks: 0, 
            totalSubtasks: itemsArray.length // الحساب هنا
        }]);
        
        setFormData({ title: '', goalDescription: '', deadLine: '', priority: 1, items: '' });
        }
    };

    const handleTaskClick = (id) => {
        setGoals(prev => prev.map(goal => {
        if (goal.id === id && goal.completedSubtasks < goal.totalSubtasks) {
            return { ...goal, completedSubtasks: goal.completedSubtasks + 1 };
        }
        return goal;
        }));
    };

    const activeGoals = goals.filter(g => g.completedSubtasks < g.totalSubtasks);
    const completedGoals = goals.filter(g => g.completedSubtasks >= g.totalSubtasks);

    return (
        <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
            {/* الجزء الخاص بإضافة هدف جديد */}
            <Grid item xs={12} md={6} sx={{ width: "30%"}}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>Add New Goal</Typography>
                <Stack spacing={2}>
                <TextField placeholder="Goal Title" fullWidth value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                {/* <TextField placeholder="Number of Subtasks" type="number" fullWidth value={formData.subtasks} onChange={(e) => setFormData({...formData, subtasks: e.target.value})} /> */}
                    <TextField placeholder="Description" fullWidth multiline rows={2} value={formData.goalDescription} onChange={(e) => setFormData({...formData, goalDescription: e.target.value})} />
                    <FormControl fullWidth>
                        <Select value={formData.priority} placeholder="Priority" onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                            <MenuItem value={1}>Low</MenuItem>
                            <MenuItem value={2}>Medium</MenuItem>
                            <MenuItem value={3}>High</MenuItem>
                        </Select>
                    </FormControl>
                <TextField placeholder="Subtasks (comma separated)" fullWidth value={formData.items} onChange={(e) => setFormData({...formData, items: e.target.value})} />
                <TextField type="date" fullWidth InputLabelProps={{ shrink: true }} value={formData.deadLine} onChange={(e) => setFormData({...formData, deadLine: e.target.value})} />
                <Button variant="contained" fullWidth onClick={handleCreateGoal} sx={{ bgcolor: '#00796b' }}>+ Create Goal</Button>
                </Stack>
            </Paper>
            </Grid>

            <Grid item xs={12} md={12} sx={{ width: "65%"}}>
            <Typography variant="h5" sx={{ fontWeight: "600"}}>Active Goals</Typography>
            <Divider sx={{ mt: 1, mb: 4 }} />
            
            {
            activeGoals.length === 0 ? (
            <Typography variant="body1" sx={{ fontWeight: "400", color: "#94A3B8", mb: 5}}>No active goals until now!</Typography>
            ) :
            activeGoals.map(goal => (
                <Paper key={goal.id} sx={{ p: 3, mb: 2, mt: 4, cursor: 'pointer', '&:hover': { bgcolor: '#fafafa' } }} onClick={() => handleTaskClick(goal.id)}>
                <Box sx={{ display: "flex", justifyContent:"space-between", alignItems: "center", color: "#94A3B8"}}>
                    <Typography variant="h6" sx={{ color: "#0F172A" }}>{goal.title}</Typography>
                    <Typography variant="caption" sx={{ display: "flex", alignItems: "center", gap: 1,}}><CalendarMonthIcon sx={{ fontSize: "14px"}}/> {goal.deadline}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ display: "flex", justifyContent:"space-between", mt: 3}}>
                    Subtasks: <Typography sx={{color: "#00796b", fontWeight: "500"}}>{goal.completedSubtasks} / {goal.totalSubtasks}</Typography>
                </Typography>
                <LinearProgress variant="determinate" value={(goal.completedSubtasks / goal.totalSubtasks) * 100} sx={{ mt: 1, height: 8, borderRadius: 4 }} />
                </Paper>
            ))}

            {completedGoals.length !== 0 &&(
            <>
                <Typography variant="h5" sx={{ fontWeight: "600", mt: 5}}>Completed</Typography>
                <Divider sx={{ mt: 1, mb: 4 }} />
            </>
            )}
            
            {/* Completed List */}
            {completedGoals.map(goal => (
                <Paper key={goal.id} sx={{ p: 3, mb: 2, opacity: 0.6, bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" style={{ textDecoration: 'line-through' }}>{goal.title}</Typography>
                <Typography variant="body2">Completed</Typography>
                </Paper>
            ))}
            </Grid>
        </Grid>
        </Container>
    );
};

export default Goals;