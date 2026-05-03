import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Button,
    Paper,
    Container,
    CircularProgress,
    LinearProgress
} from '@mui/material';

import { useSurvey } from '../../Context/SurveyContext';

const Survey = () => {
    // eslint-disable-next-line no-unused-vars
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const {
        finalResult,
        setFinalResult,
        isBlocked,
        setIsBlocked
    } = useSurvey();


    useEffect(() => {
        const initSession = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/start');
                setSessionId(response.data.session_id);
                setCurrentQuestion(response.data);
            } catch (error) {
                console.error("Error initializing session:", error);
            } finally {
                setLoading(false);
            }
        };

        initSession();
    }, []);

    const handleNext = async (answerValue) => {
        if (selectedAnswer === null) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/answer', {
                session_id: sessionId,
                question: currentQuestion.question,
                answer: answerValue
            });

            setAnswers(prev => ({
                ...prev,
                [currentQuestion.question]: answerValue
            }));

            if (response.data.status === 'complete') {
                setFinalResult(response.data.result);
                setIsFinished(true);

                localStorage.setItem('last_survey_date', Date.now().toString());
                localStorage.setItem('last_survey_result', JSON.stringify(response.data.result));

                return;
            } else {
                setCurrentQuestion(response.data);
                setSelectedAnswer(null);
            }

        } catch (error) {
            console.error("Error submitting answer:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const checkWeeklyEligibility = () => {
        const lastSurveyDate = localStorage.getItem('last_survey_date');

        if (!lastSurveyDate) return true;

        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        return Date.now() - parseInt(lastSurveyDate) > oneWeek;
    };

    const loadSurvey = async () => {
        if (!checkWeeklyEligibility()) {
            const saved = localStorage.getItem('last_survey_result');

            if (saved) {
                setFinalResult(JSON.parse(saved));
            }

            setIsBlocked(true);
            setIsFinished(true);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get('http://127.0.0.1:8000/start');

            setSessionId(response.data.session_id);
            setCurrentQuestion(response.data);

            setIsFinished(false);
            setFinalResult(null);
            setAnswers({});
            setSelectedAnswer(null);
            setIsBlocked(false);

        } catch (error) {
            console.error("Error loading survey:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSurvey();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>

            {/* Survey */}
            {!isBlocked && !isFinished && currentQuestion && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>

                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Weekly Survey
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 3 }}>
                        {currentQuestion?.question_text}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                        {currentQuestion.answer_options &&
                            Object.entries(currentQuestion.answer_options).map(([key, label]) => {
                                const value = parseInt(key);

                                return (
                                    <Button
                                        key={value}
                                        onClick={() => setSelectedAnswer(value)}
                                        sx={{
                                            px: 6,
                                            py: 1.5,
                                            border: "1px solid #ccc",
                                            backgroundColor: selectedAnswer === value ? '#00796b' : 'transparent',
                                            color: selectedAnswer === value ? 'white' : 'black'
                                        }}
                                    >
                                        {label}
                                    </Button>
                                );
                            })}
                    </Box>

                    <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            disabled={!selectedAnswer || isSubmitting}
                            onClick={() => handleNext(selectedAnswer)}
                        >
                            {isSubmitting ? "Waiting..." : "Next"}
                        </Button>
                    </Box>

                </Paper>
            )}

            {(isFinished || isBlocked) && finalResult && (
            <Paper
            elevation={3}
            sx={{
                p: 4,
                mt: 3,
                borderRadius: 3,
                backgroundColor: "#ffffff",
            }}
            >

            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    fontWeight: 600,
                    color: "#0F172A"
                }}
                gutterBottom
            >
                Survey Result
            </Typography>

            {/* Diagnosis */}
            <Typography
                variant="h5"
                sx={{
                    textAlign: "center",
                    mt: 4,
                    fontWeight: 600,
                    color: "#ef4444"
                }}
                gutterBottom
            >
                Diagnosis: <span style={{ color: "#0F172A" }}>
                    {finalResult.diagnosis}
                </span>
            </Typography>

            <Box sx={{ mt: 4 }}>
                {/* Depression */}
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#475569" }}>
                    Depression Level
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={finalResult.depression_score}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 3,
                        backgroundColor: "#e2e8f0",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#00796b",
                        }
                    }}
                />

                {/* Anxiety */}
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#475569" }}>
                    Anxiety Level
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={finalResult.anxiety_score}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 3,
                        backgroundColor: "#e2e8f0",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#f59e0b",
                        }
                    }}
                />

                {/* Stress */}
                <Typography sx={{ mb: 1, fontWeight: 500, color: "#475569" }}>
                    Stress Level
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={finalResult.stress_score}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 2,
                        backgroundColor: "#e2e8f0",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#ef4444",
                        }
                    }}
                />

            </Box>
            <Box fullWidth sx={{ mt: 5, bgcolor: "#e7e7e7", p: 1, borderRadius: "50px", textAlign: "center" }}> Come back after one week and try again! </Box>
        </Paper>
        )}
        </Container>
    );
};

export default Survey;