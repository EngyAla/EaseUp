import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, ButtonGroup, Paper, Container, CircularProgress, LinearProgress } from '@mui/material';

// توليد ID للجلسة مرة واحدة عند تحميل المكون
const SESSION_ID = `session_${Date.now()}`;

const Survey = () => {
    // const [questions, setQuestions] = useState([]);
    // const [currentIdx, setCurrentIdx] = useState(0);
    const [answers, setAnswers] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [isFinished, setIsFinished] = useState(false);
    const [finalResult, setFinalResult] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null); // هنا نخزن بيانات السؤال الحالي
    // 1. إضافة state للحالة المختارة محلياً، و state للتحميل
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);


    useEffect(() => {
    const initSession = async () => {
        try {
        const response = await axios.get('http://127.0.0.1:8000/start'); 
        setSessionId(response.data.session_id); 
        setCurrentQuestion(response.data); // السيرفر يرسل السؤال الأول هنا
        setLoading(false);

        // const questionsRes = await axios.get('http://127.0.0.1:8000/questions');
        // setQuestions(questionsRes.data.questions);
        // setLoading(false);
        } catch (error) {
        console.error("Error initializing session:", error);
        }
    };
    initSession();
    }, []);

    const handleNext = async (answerValue) => {
        if (selectedAnswer === null) return;
        setIsSubmitting(true); // تفعيل حالة التحميل
        try {
            const response =await axios.post('http://127.0.0.1:8000/answer', {
                session_id: sessionId,
                question: currentQuestion.question,
                answer: answerValue
            });
            setAnswers(prev => ({
                ...prev,
                [currentQuestion.question]: answerValue
            }));
            // setAnswers(answerValue)

            if (response.data.status === 'complete') {
                setFinalResult(response.data.result); 
                setIsFinished(true);
                // هنا نحفظ تاريخ اليوم كآخر مرة تم فيها الحل
                localStorage.setItem('last_survey_date', Date.now().toString());
                localStorage.setItem('last_survey_result', JSON.stringify(response.data.result)); // حفظ النتيجة
                console.log("Assessment complete:", response.data.result);
                console.log(finalResult)
                return;
            } else {
                setCurrentQuestion(response.data);
                setSelectedAnswer(null); // مسح الاختيار للسؤال القادم
            }

            } catch (error) {
                console.error("Error submitting answer:", error);
                alert("حدث خطأ أثناء حفظ الإجابة");
            } finally {
                setIsSubmitting(false); // إيقاف حالة التحميل سواء نجح أو فشل
            }
        };

        const checkWeeklyEligibility = () => {
            const lastSurveyDate = localStorage.getItem('last_survey_date');
            if (!lastSurveyDate) return true; // إذا لم يسبق له الحل، فهو مؤهل

            const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
            const timePassed = Date.now() - parseInt(lastSurveyDate);

            return timePassed > oneWeekInMs;
        };

    const loadSurvey = async () => {
        if (!checkWeeklyEligibility()) {
            const savedResult = localStorage.getItem('last_survey_result');
            if (savedResult) {
                setFinalResult(JSON.parse(savedResult)); // استرجاع النتيجة
            }
            
            setIsBlocked(true);
            setIsFinished(true); // نجعله كأنه "منتهي" ليظهر صفحة النتائج
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/start');
            setSessionId(response.data.session_id);
            setCurrentQuestion(response.data);
            setIsFinished(false);   // إخفاء صفحة النتيجة
            setFinalResult(null);   // مسح النتائج القديمة
            setAnswers({});         // مسح الإجابات القديمة
            setSelectedAnswer(null);// مسح الاختيار الحالي
        } catch (error) {
            console.error("Error loading survey:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadSurvey();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            {/* الاستبيان (يظهر فقط إذا لم نكن في حالة الحظر ولم ننتهِ) */}
            {!isBlocked && !isFinished && currentQuestion && (
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    {/* <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}> */}
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 7}} gutterBottom>Weekly Survey</Typography>
                    
                    <Typography variant="h6" sx={{ mb: 3, color: "#0F172A" }}>
                        {currentQuestion?.question_text}
                    </Typography>

                    <Box sx={{ mb: 4, gap: 3, display: "flex", justifyContent: "center", }}>
                        {currentQuestion.answer_options && Object.entries(currentQuestion.answer_options).map(([key, label]) => {
                        const value = parseInt(key); 
                        return(
                            <Button
                                key={value}
                                onClick={() => setSelectedAnswer(value)}
                                sx={{
                                    px: 7,
                                    py: 1.5,
                                    borderRadius: "5px",
                                    border: "1px solid #dfdfdf",
                                    backgroundColor: selectedAnswer === value ? '#00796b' : 'transparent',
                                    color: selectedAnswer === value ? 'white' : '#475569',
                                }}
                            >
                                {label}
                            </Button>
                        )
                    })}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                        <Button 
                            variant="contained"
                            onClick={() => handleNext(selectedAnswer)}
                            disabled={selectedAnswer === null || isSubmitting}
                            sx={{ mt: 2, backgroundColor: '#00796b', textAlign: "end" }}
                        >
                            {isSubmitting ? "Waiting..." : "Next"}
                        </Button>
                    </Box>
                </Paper>
                // </Paper>
            )}

            {/* صفحة النتائج (تظهر فقط إذا انتهينا ولم نكن في حالة الحظر) */}
            {(isFinished || isBlocked) && finalResult && (
                <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }} color="primary" gutterBottom>Survey Result</Typography>
                    <Typography variant="h5" sx={{ textAlign: "center", mt: 5 }} color="error" gutterBottom>
                        Diagnosis: <strong>{finalResult.diagnosis}</strong>
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                    <Typography variant="body1">Depression Level</Typography>
                    <LinearProgress variant="determinate" value={finalResult.depression_score} sx={{ mb: 3, height: 10, borderRadius: 5 }} />
                    
                    <Typography variant="body1">Anxiety Level</Typography>
                    <LinearProgress variant="determinate" value={finalResult.anxiety_score} sx={{ mb: 3, height: 10, borderRadius: 5 }} />
                    
                    <Typography variant="body1">Stress Level</Typography>
                    <LinearProgress variant="determinate" value={finalResult.stress_score} sx={{ mb: 4, height: 10, borderRadius: 5 }} />
                    </Box>
                    <Box fullWidth sx={{ mt: 3, bgcolor: "#f3f3f3", p: 1, borderRadius: "50px", textAlign: "center" }}>
                        Come back after one week and try again!
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default Survey;